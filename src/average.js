import add from './add';
const average = (...params) => {
  let len = params.length;
  if (len === 0) {
    return 0;
  } else if (len === 1) {
    return params[0];
  }
  return add(...params) / len;
};
export default average;
