/*
 * @Description: create selecton by selector
 * @Date: 2022-02-28 14:45:16
 * @FilePath: /easy-skeleton/src/createSkeleton.ts
 * @LastEditTime: 2022-03-14 19:03:41
 */
import { Page, Browser } from 'puppeteer';
import fs from 'fs';
import colors from 'colors';
import { OptionsType, AstType } from './types/index';
import { sleep, mapDomIgnoreLabels, isNeedToSkipRendering } from './util';

/**
 * @description: 生成骨架屏 html
 * @param {AstType} params dom json树 包含节点的width、height等
 * @param {OptionsType} options 配置文件配置
 * @Date: 2022-03-04 13:37:36
 */
const createHtml = (params: AstType, options: OptionsType): void => {
  const { skeletonBackgroundColor, skeletonColor } = options;
  const { rect, currentStyle } = params;
  const color = skeletonColor || '#f7f8fb';
  const className = params.children?.length ? '' : 'skeleton-common';
  const str = `<div id="skeleton-container" class="${className}" style="position:absolute;top:0;left:0;z-index:1;width:${
    rect.width
  }px;height:${
    rect.height
  }px;background-color:${skeletonBackgroundColor}" data-tag="${
    params.tagName
  }">\n\t<style>
    .skeleton-common {
      position:absolute;
      background-color: ${color};
      background-image: linear-gradient(50deg, ${color}, ${color} 52%, #ffffff 55%, ${color} 58%, ${color});
      background-size: 400% 100%;
    }
    </style>\n${ergodicAst(params, rect, currentStyle)}</div>`;

  if (!fs.existsSync('./skeletonFile')) {
    fs.mkdirSync('./skeletonFile');
  }

  fs.writeFileSync('./skeletonFile/skeleton.html', str);
};

/**
 * @description:
 * @param {string} selector 目标元素
 * @param {string} domString 替换的文件
 * @return {*}
 * @Date: 2022-03-04 13:46:12
 */
const replacePageElements = async (
  page: Page,
  selector: string | undefined
) => {
  if (!selector) {
    return;
  }
  let domString = '';
  try {
    domString = fs.readFileSync('./skeletonFile/skeleton.html', {
      encoding: 'utf-8',
    });
  } catch (error) {
    console.log(colors.red('create skeleton html fail; ' + error));
  }
  if (!domString) return;
  //在客户端 window注册函数
  await page.exposeFunction('getDomString', () => domString);

  await page.evaluate(`(async () => {
    const selector = await getSelector()
    const domString = await getDomString()
    const parser = new DOMParser()
    //string转dom
    const dom = document.createRange().createContextualFragment(domString)
    const selectorDom = document.querySelector(selector)
    // selectorDom.replaceWith(dom)
    const style = selectorDom.getAttribute('style') || ''
    //方便截图 不被其他遮挡
    selectorDom.setAttribute('style', style + ';position:relative;z-index:99999')
    console.log('selectorDom',selectorDom)
    selectorDom.appendChild(dom)
    //复原位置
    setTimeout(() => {
      selectorDom.setAttribute('style', style + ';position:relative;z-index:1')
    }, 1500)
  })()`);
};

const createSkeletonPicture = async (page: Page) => {
  const content = await page.$('#skeleton-container');
  await content?.screenshot({
    path: './skeletonFile/skeleton.png',
  });
};

/**
 * @description: 遍历dom json树
 * @param {AstType} params  dom json树
 * @param {string} t 空格 用于规范输出格式
 * @param {string} containerRect 最外层父节点位置信息
 * @return {*} 子节点dom
 * @Date: 2022-03-04 13:41:14
 */
const ergodicAst = (
  params: AstType,
  containerRect: any,
  currentStyle: any
): string => {
  if (!params?.children?.length || isNeedToSkipRendering(params)) {
    return '';
  }
  let res = '';
  for (const element of params.children) {
    const rect = element.rect;
    const className = element.children?.length ? '' : `class="skeleton-common"`;
    if (currentStyle) {
    }
    if (className) {
      res =
        res +
        `\t<div ${className} style="width:${rect.width}px;height:${
          rect.height
        }px;left:${rect.left - containerRect.left}px;top:${rect.top -
          containerRect.top}px;" data-tag="${element.tagName}"></div>\n`;
      continue;
    }

    res = res + ergodicAst(element, containerRect, currentStyle);
  }
  return res;
};

const createSkeleton = async (
  page: Page,
  browser: Browser,
  options: OptionsType
) => {
  const selector = options.selector || 'body';
  await page.waitForSelector(selector);
  //在客户端 window注册函数
  await page.exposeFunction('getSelector', () => selector);
  await page.exposeFunction('getMapDomIgnoreLabels', () => mapDomIgnoreLabels);
  const res: any = await page.evaluate(`(async () => {
   // @ts-ignore
   const selector = await getSelector()
   const mapDomIgnoreLabels = await getMapDomIgnoreLabels()
   const dom = document.querySelector(selector);
   if (!dom) {
      return
   }
   const fn = (dom) => {
      if (!dom.children || !dom.children.length) {
         return []
      }
      let arr = []
      for (const ele of dom.children) {
         if (mapDomIgnoreLabels.includes(ele.tagName)) {
            continue;
         }
         const rect = ele.getBoundingClientRect()
         const obj = {
            tagName: ele.tagName,
            rect: JSON.parse(JSON.stringify(rect)),
            innerText: ele.innerText,
            children: fn(ele),
            currentStyle: JSON.parse(JSON.stringify(window.getComputedStyle(ele))),
         }
         arr.push(obj)
      }
      return arr
   }
   const res = {
      tagName: dom.tagName,
      rect: JSON.parse(JSON.stringify(dom.getBoundingClientRect())),
      innerText: dom.innerText,
      children: fn(dom),
      currentStyle: JSON.parse(JSON.stringify(window.getComputedStyle(dom))),
   }
   return res
  })()`);
  console.log('browser', browser);
  createHtml(res, options);
  replacePageElements(page, options.selector);
  await sleep(500);
  createSkeletonPicture(page);
};

export default createSkeleton;
