/*
 * @Description:
 * @Date: 2022-02-24 16:44:16
 * @FilePath: /easy-skeleton/src/types/index.d.ts
 * @LastEditTime: 2022-05-05 14:16:31
 */
export interface OptionsType {
  pageUrl: string;
  isDebug?: boolean;
  selector?: string;
  device?: string;
  cookies?: Array<any>;
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
