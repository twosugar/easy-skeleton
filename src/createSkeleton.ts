/*
 * @Description: create selecton by selector
 * @Date: 2022-02-28 14:45:16
 * @FilePath: /easy-skeleton/src/createSkeleton.ts
 * @LastEditTime: 2022-03-08 18:04:26
 */
import { Page, Browser } from 'puppeteer';
import fs from 'fs';
import colors from 'colors';
import { OptionsType, AstType } from './types/index';
import { sleep, renderSkeletonIgnoreLabels, mapDomIgnoreLabels } from './util';

/**
 * @description: 生成骨架屏 html
 * @param {AstType} params dom json树 包含节点的width、height等
 * @param {OptionsType} options 配置文件配置
 * @Date: 2022-03-04 13:37:36
 */
const createHtml = (params: AstType, options: OptionsType): void => {
  const rect = params.rect;
  const color = options.skeletonColor || '#f7f8fb';
  const className = params.children?.length ? '' : 'skeleton-common';

  const str = `<div id="skeleton-container" class="${className}" style="position:relative;z-index:9999;width:${
    rect.width
  }px;height:${rect.height}px" data-tag="${params.tagName}">\n\t<style>
    .skeleton-common {
      background-color: ${color};
      animation: loading 8s linear infinite;
      background-image: linear-gradient(50deg, ${color}, ${color} 52%, #ffffff 55%, ${color} 58%, ${color});
      background-size: 400% 100%;
      transform: translate3d(0, 0, 0);
      border-radius: 4px;
    }
    @keyframes loading {
      0% {
          background-position: 400% 50%
      }
      to {
          background-position: 0% 50%
      }
    }
    </style>\n${ergodicAst(params, '')}</div>`;

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
    selectorDom.replaceWith(dom)
  })()`);
};

const createSkeletonPicture = async (page: Page) => {
  const content = await page.$("#skeleton-container")
  await content?.screenshot({
    path: './skeletonFile/skeleton.png'
  })
}

/**
 * @description: 遍历dom json树
 * @param {AstType} params  dom json树
 * @param {string} t 空格 用于规范输出格式
 * @return {*} 子节点dom
 * @Date: 2022-03-04 13:41:14
 */
const ergodicAst = (params: AstType, t: string): string => {
  if (!params?.children?.length) {
    return '';
  }
  const _t = t + '\t';
  let res = '';
  for (const element of params.children) {
    const rect = element.rect;
    const className = element.children?.length ? '' : 'skeleton-common';
    let child = ''
    // 没有显示内容的标签，就算有width、height也不显示
    const ignoreCondition = renderSkeletonIgnoreLabels.includes(element.tagName) && !element.children?.length && !element.innerText
    if (ignoreCondition) {
      child = ''
    } else {
      child = `${_t}<div class="${className}" style="position:absolute;width:${
        rect.width
      }px;height:${rect.height}px;left:${rect.left -
        params.rect.left}px;top:${rect.top - params.rect.top}px;" data-tag="${
        element.tagName
      }">\n${ergodicAst(element, _t)}${_t}</div>\n`;
    }

    res = res + child;
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
  await page.exposeFunction('getMapDomIgnoreLabels', () => mapDomIgnoreLabels)
  const res = await page.evaluate(`(async () => {
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
            children: fn(ele)
         }
         arr.push(obj)
      }
      return arr
   }
   const res = {
      tagName: dom.tagName,
      rect: JSON.parse(JSON.stringify(dom.getBoundingClientRect())),
      innerText: dom.innerText,
      children: fn(dom)
   }
   return res
  })()`);
  console.log('browser', browser);
  createHtml(res, options);
  replacePageElements(page, options.selector);
  await sleep(500)
  createSkeletonPicture(page)
};

export default createSkeleton;
