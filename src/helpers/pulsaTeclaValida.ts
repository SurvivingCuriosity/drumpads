export const pulsaTeclaValida = (key: string) => {
  if (
    key === "q" ||
    key === "w" ||
    key === "e" ||
    key === "a" ||
    key === "s" ||
    key === "d" ||
    key === "z" ||
    key === "x" ||
    key === "c"
  ) {
    return true;
  }
  return false;
};
