/*
 * @Description:
 * @Date: 2022-02-24 16:44:16
 * @FilePath: /easy-skeleton/src/types/index.d.ts
 * @LastEditTime: 2022-03-14 18:45:19
 */
export interface OptionsType {
  pageUrl: string;
  headless?: boolean;
  selector?: string;
  device?: string;
  cookie?: Array<object>;
  path?: string;
  waitTime?: number;
  skeletonColor?: string;
  skeletonBackgroundColor?: string;
}

interface rectType {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

export interface AstType {
  tagName: string;
  rect: rectType;
  innerText: string;
  children: Array<AstType>;
  currentStyle: object;
}
