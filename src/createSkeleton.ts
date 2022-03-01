/*
 * @Description: create selecton by selector
 * @Date: 2022-02-28 14:45:16
 * @FilePath: /easy-skeleton/src/createSkeleton.ts
 * @LastEditTime: 2022-03-01 19:44:00
 */
import { Page, Browser } from 'puppeteer';
import { OptionsType } from './types/index';

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
         console.log('eleele', ele)
         const obj = {
            tagName: ele.tagName,
            rect: ele.getBoundingClientRect(),
            children: fn(ele)
         }
         arr.push(obj)
      }
      return arr
   }
   const res = {
      tagName: dom.tagName,
      rect: dom.getBoundingClientRect(),
      children: fn(dom)
   }
   console.log(333333, res)
   return res
 })()`);
  console.log('11res', res);
  console.log('browser', browser);
};

export default createSkeleton;
