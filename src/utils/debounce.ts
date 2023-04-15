export const debounce = (func: unknown, timeOut = 500) => {
  let timer: null | ReturnType<typeof setTimeout> = null;

  return (...args: unknown[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      if (typeof func === 'function') {
        func.apply(this, args);
      };
    }, timeOut);
  }
}