const FACING_ORDER = ["N", "E", "S", "W"];

export const rotateClockwise = (facing) => {
  const idx = FACING_ORDER.indexOf(facing);
  return FACING_ORDER[(idx + 1) % 4];
};
