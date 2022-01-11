import { identity, isObject, pickBy } from "lodash";

export const removeProperty = (propKey: string, object: any) => {
  const { [propKey]: propValue, ...rest } = object;
  return rest;
};

export const removeProperties = (object: any, keys: string[]): any => {
  if (keys.length > 0) {
    return removeProperties(removeProperty(keys.pop()!, object), [...keys]);
  }

  return object;
};

export const percentage = (value: number, total: number) => {
  if (total <= 0 || value <= 0) return 0;

  const percentageValue = ((value / total) * 100).toFixed(2);

  return Number(percentageValue);
};

export function removeUndefinedFromObj<T = any>(value: any) {
  if (!isObject(value)) {
    return null;
  }

  return pickBy(value, identity) as unknown as T;
}
