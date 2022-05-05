import { OptionsType } from './types/index';
import openBrowser from './openBrowser';
import createSkeleton from './createSkeleton';
// import { sleep } from './util';

export const getSkeleton = async (options: OptionsType) => {
  const { page, browser } = await openBrowser(options);
  await createSkeleton({ page, browser, options });
  if (!options.isDebug) {
    await browser.close();
  }
};
