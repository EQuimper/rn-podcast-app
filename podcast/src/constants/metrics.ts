function makeHitSlop(size: number) {
  return {
    top: size,
    right: size,
    bottom: size,
    left: size,
  };
}

export const metrics = {
  tabIconSize: 24,
  makeHitSlop,
};
