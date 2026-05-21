import { Unit } from "./Unit";

const SIZE = 10;

const row0 = [
  "swordsman",
  "swordsman",
  "swordsman",
  "swordsman",
  "spearman",
  "spearman",
  "spearman",
  "spearman",
];

const row1 = [
  "cavalry",
  "cavalry",
  "archer",
  "archer",
  "archer",
  "archer",
  "cavalry",
  "cavalry",
];

export const createUnits = () => {
  const units = [];
  let id = 0;

  const grid = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => null)
  );

  const placeRow = (row, y, owner, facing) => {
    const startX = 1;
    row.forEach((type, i) => {
      const x = startX + i;
      grid[y][x] = new Unit({ id: id++, owner, type, x, y, facing });
      units.push(grid[y][x]);
    });
  };

  placeRow(row0, 8, 0, "N");
  placeRow(row1, 9, 0, "N");
  placeRow(row1, 0, 1, "S");
  placeRow(row0, 1, 1, "S");

  return units;
};
