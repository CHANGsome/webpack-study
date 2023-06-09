/* 处理ES6内置API的兼容 */
import '@babel/polyfill';

/* 项目中需要用到的CSS，我们在入口中基于模块规范导入进来 */
import './assets/css/reset.min.css';
import './index.less';

import add from './add';
import average from './average';

const arr = [1, 2, 4, 6, 7, 8];
console.log('add:', add(...arr));
console.log('average:', average(...arr));

fetch('/jian/subscriptions/recommended_collections')
  .then((response) => response.json())
  .then((result) => console.log('简书：', result));

fetch('/zhi/news/latest')
  .then((response) => response.json())
  .then((result) => console.log('知乎：', result));
