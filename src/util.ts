/*
 * @Description: 工具集
 * @Author: ytang5
 * @Date: 2022-02-28 18:46:43
 * @LastEditors: ytang5
 * @FilePath: /easy-skeleton/src/util.ts
 * @LastEditTime: 2022-03-04 11:55:32
 */

export const sleep = (time: number) => {
  return new Promise(resovle => {
    setTimeout(resovle, time);
  });
};
