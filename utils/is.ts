export function isFunction(val: unknown) {
  return Object.prototype.toString.call(val) === `[object Function]`;
}
