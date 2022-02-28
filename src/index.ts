import { OptionsType } from './types/index';
import openBrowser from './openBrowser';
import createSkeleton from './createSkeleton';

export const getSkeleton = async (options: OptionsType) => {
  const { page, browser } = await openBrowser(options);
  createSkeleton(page, browser, options);
};
