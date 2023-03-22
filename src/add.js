const add = (...params) => {
  let len = params.length;
  if (len === 0) {
    return 0;
  } else if (len === 1) {
    return params[0];
  }
  // len > 1
  return params.reduce((total, current) => total + current, 0);
};
export default add;
