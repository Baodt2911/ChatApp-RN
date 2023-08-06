export const randomRoomCode = () => {
  let character = "abcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * character.length);
    const char = character.charAt(index);
    result += char.toUpperCase();
    character = character.replace(char, "");
  }
  return result;
};
