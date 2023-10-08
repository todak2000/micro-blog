// Gets the first 150 characters of a string.
// If the string is shorter than 150 characters, the entire string is returned.
// Otherwise, the first 150 characters are returned, followed by an ellipsis.
export const getFirst150Chars = (
  text: string,
  length: number = 150
): string => {
  if (text.length <= length) {
    return text;
  } else {
    return text.substring(0, length) + "...";
  }
};

// Formats a date string to the US English format.
// The returned string will include the month, day, year, hour, and minute.
export const dateFormaterString = (dateString: string) => {
  const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formattedDate;
};

// Generates a random string of characters.
// The length of the string is specified by the `length` parameter.
// If the `length` parameter is not specified, the string will be 24 characters long.
export const generateRandomCharacters = (length = 24) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomCharacters = [];
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const randomCharacter = characters[randomIndex];
    randomCharacters.push(randomCharacter);
  }
  return randomCharacters.join("");
};