export const validateFunctionArray = (arr: Array<any>) => {
  if (arr.length !== 41) {
    return false;
  }
  for (let item of arr) {
    if (!item) {
      return false;
    }
  }
  return true;
};
