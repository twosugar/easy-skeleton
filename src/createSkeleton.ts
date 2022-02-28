/*
 * @Description: create selecton by selector
 * @Date: 2022-02-28 14:45:16
 * @FilePath: /easy-skeleton/src/createSkeleton.ts
 * @LastEditTime: 2022-02-28 19:53:40
 */
import { Page, Browser } from 'puppeteer';
import { OptionsType } from './types/index';

const getAllBySelector = (dom: any) => {
  console.log(2222, dom);
  return new Promise(resolve => {
    resolve(222333);
  });
};

const createSkeleton = async (
  page: Page,
  browser: Browser,
  options: OptionsType
) => {
  const selector = options.selector || 'body';
  await page.waitForSelector(selector);
  await page.exposeFunction('getAllBySelector', getAllBySelector);

  const res = await page.evaluate(selector => {
    const dom = document.querySelector(selector);
    const rect = dom.getBoundingClientRect();
    //  getAllBySelector(dom)
    //  console.log(aaa)
    return JSON.parse(JSON.stringify(rect));
  }, selector);
  console.log('browser', browser);
  console.log('resres', res);
};

export default createSkeleton;
