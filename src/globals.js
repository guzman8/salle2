// Enum
export const SortType = { ASC: 0, DESC: 1 };
// The enum-like types in JS has no length property, so: Object.keys(SortType).length
SortType.length = Object.keys(SortType).length;

export const URL = "https://todos-mpwar.herokuapp.com";
