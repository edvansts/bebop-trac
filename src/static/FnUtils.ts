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
