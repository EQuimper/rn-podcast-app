export const truncate = (
  str: string,
  max: number,
  suffix: string = '...',
): string => {
  if (str.length <= max) {
    return str;
  }

  return `${str.substring(0, max)}${suffix}`;
};
