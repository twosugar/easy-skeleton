[![NPM version][npm-image]][npm-url]

English | [简体中文](./README-zh_CN.md)
# introduce
Automatically generate skeleton screen
## Effect comparison
![skeleton](./img/demo.png)
## Installation

### Global installation

```
$ npm i easy-skeleton -g
```

### Installation in the project
```
$ npm i easy-skeleton -D
```

## Instructions

### Adding a configuration file

es.config.json:

```json
{
    "isDebug": false,
    "pageUrl": "https://juejin.cn/",
    "selector": ".entry-list-wrap .item",
    "device": "iPhone 12 Pro"
}
```

### Generate skeleton screen according to configuration
```
es --config ./es.config.json
```
### Generate file
    |-- skeletonFile
        |-- skeleton.html
        |-- skeleton.png
        |-- skeleton.base64


## es.config.json
| ParameterName | Required | Default | Type | Describe | Example |
| --- | --- | --- | --- | --- | --- |
| pageUrl | true | - | boolean | The page that needs to generate the skeleton screen | ```"pageUrl": "http://www.baidu.com"``` |
| selector | false | "body" | string | specific elements, use ```document.querySelector``` get dom, dom must have height | ```"selector": ".list-item"``` |
| isDebug | false | false | boolean | enable the debug mode, which will open Chromium |  |
| skeletonBackgroundColor | false | "transparent" | string | skeleton screen background color | ```"skeletonBackgroundColor": "red"```  |
| skeletonColor | false | "#f7f8fb" | string | background color of the content area of the skeleton screen | ```"skeletonColor": "#ccc"```  |
| waitTime | false | 60000 | number | Timeout for opening a page，Unit: ms | ```"waitTime": 10 * 1000```  |
| device | false | - | string | browser access mode for destination address | ```"device": "iPhone 12 Pro"```  |

### `device` enumeration
```
"Blackberry PlayBook"、"Blackberry PlayBook landscape"、"BlackBerry Z30"、"BlackBerry Z30 landscape"、"Galaxy Note 3"、"Galaxy Note 3 landscape"、"Galaxy Note II"、"Galaxy Note II landscape"、"Galaxy S III"、"Galaxy S III landscape"、"Galaxy S5"、"Galaxy S5 landscape"、"Galaxy S8"、"Galaxy S8 landscape"、"Galaxy S9+"、"Galaxy S9+ landscape"、"Galaxy Tab S4"、"Galaxy Tab S4 landscape"、"iPad"、"iPad landscape"、"iPad (gen 6)"、"iPad (gen 6) landscape"、"iPad (gen 7)"、"iPad (gen 7) landscape"、"iPad Mini"、"iPad Mini landscape"、"iPad Pro"、"iPad Pro landscape"、"iPad Pro 11"、"iPad Pro 11 landscape"、"iPhone 4"、"iPhone 4 landscape"、"iPhone 5"、"iPhone 5 landscape"、"iPhone 6"、"iPhone 6 landscape"、"iPhone 6 Plus"、"iPhone 6 Plus landscape"、"iPhone 7"、"iPhone 7 landscape"、"iPhone 7 Plus"、"iPhone 7 Plus landscape"、"iPhone 8"、"iPhone 8 landscape"、"iPhone 8 Plus"、"iPhone 8 Plus landscape"、"iPhone SE"、"iPhone SE landscape"、"iPhone X"、"iPhone X landscape"、"iPhone XR"、"iPhone XR landscape"、"iPhone 11"、"iPhone 11 landscape"、"iPhone 11 Pro"、"iPhone 11 Pro landscape"、"iPhone 11 Pro Max"、"iPhone 11 Pro Max landscape"、"iPhone 12"、"iPhone 12 landscape"、"iPhone 12 Pro"、"iPhone 12 Pro landscape"、"iPhone 12 Pro Max"、"iPhone 12 Pro Max landscape"、"iPhone 12 Mini"、"iPhone 12 Mini landscape"、"iPhone 13"、"iPhone 13 landscape"、"iPhone 13 Pro"、"iPhone 13 Pro landscape"、"iPhone 13 Pro Max"、"iPhone 13 Pro Max landscape"、"iPhone 13 Mini"、"iPhone 13 Mini landscape"、"JioPhone 2"、"JioPhone 2 landscape"、"Kindle Fire HDX"、"Kindle Fire HDX landscape"、"LG Optimus L70"、"LG Optimus L70 landscape"、"Microsoft Lumia 550"、"Microsoft Lumia 950"、"Microsoft Lumia 950 landscape"、"Nexus 10"、"Nexus 10 landscape"、"Nexus 4"、"Nexus 4 landscape"、"Nexus 5"、"Nexus 5 landscape"、"Nexus 5X"、"Nexus 5X landscape"、"Nexus 6"、"Nexus 6 landscape"、"Nexus 6P"、"Nexus 6P landscape"、"Nexus 7"、"Nexus 7 landscape"、"Nokia Lumia 520"、"Nokia Lumia 520 landscape"、"Nokia N9"、"Nokia N9 landscape"、"Pixel 2"、"Pixel 2 landscape"、"Pixel 2 XL"、"Pixel 2 XL landscape"、"Pixel 3"、"Pixel 3 landscape"、"Pixel 4"、"Pixel 4 landscape"、"Pixel 4a (5G)"、"Pixel 4a (5G) landscape"、"Pixel 5"、"Pixel 5 landscape"、"Moto G4"、"Moto G4 landscape"
```

# Thanks

- [puppeteer](https://github.com/GoogleChrome/puppeteer)
- [awesome-skeleton](https://github.com/kaola-fed/awesome-skeleton)

[npm-image]: https://img.shields.io/npm/v/easy-skeleton.svg?style=flat-square&logo=npm
[npm-url]: https://www.npmjs.com/package/easy-skeleton