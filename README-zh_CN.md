[![NPM version][npm-image]][npm-url]

简体中文 | [English](./README.md)
# 介绍
自动生成骨架屏幕
## Effect comparison
![skeleton](./img/demo.png)
## 安装

### 全局安装

```
$ npm i easy-skeleton -g
```

### 项目安装
```
$ npm i easy-skeleton -D
```

## 说明

### 添加一个配置文件

es.config.json:

```json
{
    "isDebug": false,
    "pageUrl": "https://juejin.cn/",
    "selector": ".entry-list-wrap .item",
    "device": "iPhone 12 Pro"
}
```

### 根据配置生成骨架屏幕
```
es --config ./es.config.json
```
### 生成的文件目录
    |-- skeletonFile
        |-- skeleton.html
        |-- skeleton.png
        |-- skeleton.base64


## es.config.json
| 参数 | 是否必须 | 默认值 | 类型 | 描述 | 例子 |
| --- | --- | --- | --- | --- | --- |
| pageUrl | 是 | - | boolean | 需要生成骨架屏幕的页面 | ```"pageUrl": "http://www.baidu.com"``` |
| selector | 否 | "body" | string | 需要生成骨架屏的具体元素, 用 ```document.querySelector``` 获取元素, 该元素必须有高度 | ```"selector": ".list-item"``` |
| isDebug | 否 | false | boolean | 是否启用debug模式, 启用将打开Chromium |  |
| skeletonBackgroundColor | 否 | "transparent" | string | 骨架屏的整体背景色 | ```"skeletonBackgroundColor": "red"```  |
| skeletonColor | 否 | "#f7f8fb" | string | 骨架屏内容区域的的背景色 | ```"skeletonColor": "#ccc"```  |
| waitTime | 否 | 60000 | number | 等待页面打开的时间，单位: ms | ```"waitTime": 10 * 1000```  |
| device | 否 | - | string | 打开目的页选用的浏览器模式 | ```"device": "iPhone 12 Pro"```  |

### `device` 枚举值
```
"Blackberry PlayBook"、"Blackberry PlayBook landscape"、"BlackBerry Z30"、"BlackBerry Z30 landscape"、"Galaxy Note 3"、"Galaxy Note 3 landscape"、"Galaxy Note II"、"Galaxy Note II landscape"、"Galaxy S III"、"Galaxy S III landscape"、"Galaxy S5"、"Galaxy S5 landscape"、"Galaxy S8"、"Galaxy S8 landscape"、"Galaxy S9+"、"Galaxy S9+ landscape"、"Galaxy Tab S4"、"Galaxy Tab S4 landscape"、"iPad"、"iPad landscape"、"iPad (gen 6)"、"iPad (gen 6) landscape"、"iPad (gen 7)"、"iPad (gen 7) landscape"、"iPad Mini"、"iPad Mini landscape"、"iPad Pro"、"iPad Pro landscape"、"iPad Pro 11"、"iPad Pro 11 landscape"、"iPhone 4"、"iPhone 4 landscape"、"iPhone 5"、"iPhone 5 landscape"、"iPhone 6"、"iPhone 6 landscape"、"iPhone 6 Plus"、"iPhone 6 Plus landscape"、"iPhone 7"、"iPhone 7 landscape"、"iPhone 7 Plus"、"iPhone 7 Plus landscape"、"iPhone 8"、"iPhone 8 landscape"、"iPhone 8 Plus"、"iPhone 8 Plus landscape"、"iPhone SE"、"iPhone SE landscape"、"iPhone X"、"iPhone X landscape"、"iPhone XR"、"iPhone XR landscape"、"iPhone 11"、"iPhone 11 landscape"、"iPhone 11 Pro"、"iPhone 11 Pro landscape"、"iPhone 11 Pro Max"、"iPhone 11 Pro Max landscape"、"iPhone 12"、"iPhone 12 landscape"、"iPhone 12 Pro"、"iPhone 12 Pro landscape"、"iPhone 12 Pro Max"、"iPhone 12 Pro Max landscape"、"iPhone 12 Mini"、"iPhone 12 Mini landscape"、"iPhone 13"、"iPhone 13 landscape"、"iPhone 13 Pro"、"iPhone 13 Pro landscape"、"iPhone 13 Pro Max"、"iPhone 13 Pro Max landscape"、"iPhone 13 Mini"、"iPhone 13 Mini landscape"、"JioPhone 2"、"JioPhone 2 landscape"、"Kindle Fire HDX"、"Kindle Fire HDX landscape"、"LG Optimus L70"、"LG Optimus L70 landscape"、"Microsoft Lumia 550"、"Microsoft Lumia 950"、"Microsoft Lumia 950 landscape"、"Nexus 10"、"Nexus 10 landscape"、"Nexus 4"、"Nexus 4 landscape"、"Nexus 5"、"Nexus 5 landscape"、"Nexus 5X"、"Nexus 5X landscape"、"Nexus 6"、"Nexus 6 landscape"、"Nexus 6P"、"Nexus 6P landscape"、"Nexus 7"、"Nexus 7 landscape"、"Nokia Lumia 520"、"Nokia Lumia 520 landscape"、"Nokia N9"、"Nokia N9 landscape"、"Pixel 2"、"Pixel 2 landscape"、"Pixel 2 XL"、"Pixel 2 XL landscape"、"Pixel 3"、"Pixel 3 landscape"、"Pixel 4"、"Pixel 4 landscape"、"Pixel 4a (5G)"、"Pixel 4a (5G) landscape"、"Pixel 5"、"Pixel 5 landscape"、"Moto G4"、"Moto G4 landscape"
```

# 感谢

- [puppeteer](https://github.com/GoogleChrome/puppeteer)
- [awesome-skeleton](https://github.com/kaola-fed/awesome-skeleton)

[npm-image]: https://img.shields.io/npm/v/easy-skeleton.svg?style=flat-square&logo=npm
[npm-url]: https://www.npmjs.com/package/easy-skeleton