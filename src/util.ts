/*
 * @Description: 工具集
 * @Author: ytang5
 * @Date: 2022-02-28 18:46:43
 * @LastEditors: ytang5
 * @FilePath: /easy-skeleton/src/util.ts
 * @LastEditTime: 2022-03-08 17:53:10
 */

export const sleep = (time: number) => {
  return new Promise(resovle => {
    setTimeout(resovle, time);
  });
};

/**
 * @description: 渲染骨架屏时，可选择性忽略的标签忽略标签
 */
export const renderSkeletonIgnoreLabels = [
  'SPAN',
  'P'
]

/**
 * @description: 遍历页面dom时可忽略的标签
 */
export const mapDomIgnoreLabels = [
  'SCRIPT',
  'LINK',
  'STYLE'
]