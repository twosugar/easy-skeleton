/*
 * @Description: create selecton by selector
 * @Date: 2022-02-28 14:45:16
 * @FilePath: /easy-skeleton/src/createSkeleton.ts
 * @LastEditTime: 2022-03-02 20:47:13
 */
import { Page, Browser } from 'puppeteer';
import fs from 'fs';
import { OptionsType, AstType } from './types/index';

const createHtml = (params: AstType): any => {
  console.log('params', params);

  const str = `<div style="position:relative;z-index:9999" data-tag="${
    params.tagName
  }">\n${ergodicAst(params, '\t')}</div>`;
  fs.writeFileSync('./as.html', str);
};

const ergodicAst = (params: AstType, t: string): string => {
  if (!params?.children?.length) {
    return '';
  }
  const _t = t + '\t';
  let res = '';
  for (const element of params.children) {
    const rect = element.rect;
    res =
      res +
      `\t${_t}<div style="position:absolute;width:${rect.width}px;height:${
        rect.height
      }px;left:${rect.left - params.rect.left}px;top:${rect.top -
        params.rect.top}px;background:${
        element.children?.length ? 'transparent' : 'red'
      };" data-tag="${element.tagName}">\n${ergodicAst(
        element,
        _t
      )}\n\t${_t}</div>\n`;
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

  const res = await page.evaluate(`(async () => {
   // @ts-ignore
   const selector = await getSelector()
   const dom = document.querySelector(selector);
   console.log('dom',dom)
   if (!dom) {
      return
   }
   const fn = (dom) => {
      if (!dom.children || !dom.children.length) {
         return []
      }
      let arr = []
      for (const ele of dom.children) {
         const rect = ele.getBoundingClientRect()
         const obj = {
            tagName: ele.tagName,
            rect: JSON.parse(JSON.stringify(rect)),
            children: fn(ele)
         }
         arr.push(obj)
      }
      return arr
   }
   const res = {
      tagName: dom.tagName,
      rect: JSON.parse(JSON.stringify(dom.getBoundingClientRect())),
      children: fn(dom)
   }
   return res
  })()`);
  createHtml(res);
  console.log('browser', browser);
};

export default createSkeleton;
