/*
 * @Description: puppeteer open brower
 * @Date: 2022-02-24 14:53:22
 * @FilePath: /easy-skeleton/src/openBrowser.ts
 * @LastEditTime: 2022-03-14 17:57:28
 */
import puppeteer, { Page, Browser } from 'puppeteer';
// import fs from 'fs';
import { OptionsType } from './types/index';

const openBrowser = async (
  options: OptionsType
): Promise<{ page: Page; browser: Browser }> => {
  const browser: Browser = await puppeteer.launch({
    headless: options.headless === false ? false : true,
    defaultViewport: { width: 1440, height: 780 },
    ignoreHTTPSErrors: false, //忽略 https 报错
    args: [
      '--no-sandbox', //解决Running as root without --no-sandbox is not supported
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '-–no-first-run',
      '–-single-process',
      '--start-fullscreen',
    ],
  });
  const page: Page = await browser.newPage();
  //There are more than 100 values ​​for device
  const device = puppeteer.devices[options.device || ''];

  if (device) {
    await page.emulate(device);
  }

  await page.goto(options.pageUrl, {
    waitUntil: 'networkidle0',
    timeout: options.waitTime || 60 * 1000,
  });
  return { page, browser };
};

export default openBrowser;
