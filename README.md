- 安装组件库
```js
npm install yxt-ui -D
```

- 全局导入

```js
import YXTUI from 'yxt-ui/lib/yxt-ui.common.js';

import "yxt-ui/lib/yxt-ui.css";
   
Vue.use(YXTUI)
```

## 全量引用

`npm run lib`

## 按需引用

`npm run build`

使用方式，如：
```ts
1. 引入需要使用的单个组件
import YxtCard from '../lib/yxt-card'

2. 引入css样式文件
import '../lib/index/index.css';

3. 应用组件 
Vue.use(YxtCard)

```