// Capitalizes the first character of a string. Returns empty string for falsy input.
export const capitalizeFirstLetter = (value: string): string => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
};
