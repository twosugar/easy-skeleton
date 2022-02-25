import { OptionsType } from './types/index';
import openBrowser from './openBrowser';
export const getSkeleton = (options: OptionsType) => {
  openBrowser(options);
};
