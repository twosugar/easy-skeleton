/*
 * @Description: 工具集
 * @Date: 2022-02-28 18:46:43
 * @FilePath: /easy-skeleton/src/util.ts
 * @LastEditTime: 2022-03-14 19:05:20
 */

export const sleep = (time: number) => {
  return new Promise(resovle => {
    setTimeout(resovle, time);
  });
};

/**
 * @description: 渲染骨架屏时，可选择性忽略的标签忽略标签
 */
export const renderSkeletonIgnoreLabels = ['SPAN', 'P'];

/**
 * @description: 遍历页面dom时可忽略的标签
 */
export const mapDomIgnoreLabels = ['SCRIPT', 'LINK', 'STYLE'];

/**
 * @description: 是否需要跳过渲染
 */
export const isNeedToSkipRendering = (params: any = {}): boolean => {
  const { currentStyle, tagName, innerText } = params;
  if (!currentStyle) {
    return true;
  }
  // 层级低 相当于隐藏
  if (currentStyle['position'] && currentStyle['zIndex'] < 1) {
    return true;
  }
  // 隐藏
  if (
    currentStyle['display']?.includes('none') ||
    currentStyle['visibility']?.includes('hidden')
  ) {
    return true;
  }

  // 没有显示内容的标签，就算有width、height也不显示
  if (renderSkeletonIgnoreLabels.includes(tagName) && !innerText) {
    return true;
  }

  return false;
};

export const checkHaveNecessaryAttribute = () => {};

export const getNecessaryAttributes = (params: any = {}) => {
  const { currentStyle } = params;
  console.log('currentStyle', currentStyle);
};
