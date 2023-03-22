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
