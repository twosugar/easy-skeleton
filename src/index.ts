import { OptionsType } from './types/index';
import openBrowser from './openBrowser';
import createSkeleton from './createSkeleton';
import { sleep } from './util';

export const getSkeleton = async (options: OptionsType) => {
  const { page, browser } = await openBrowser(options);
  await sleep(options.waitTime || 1 * 1000); //等待第一屏元素加载出来
  createSkeleton(page, browser, options);
};
