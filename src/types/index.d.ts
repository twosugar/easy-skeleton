/*
 * @Description:
 * @Date: 2022-02-24 16:44:16
 * @FilePath: /easy-skeleton/src/types/index.d.ts
 * @LastEditTime: 2022-02-28 17:08:43
 */
export interface OptionsType {
  pageUrl: string;
  headless?: boolean;
  selector?: string;
  device?: string;
  cookie?: Array<object>;
  path?: string;
}
