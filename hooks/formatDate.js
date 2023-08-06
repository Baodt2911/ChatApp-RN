export const formatDate = (seconds) => {
  let date = new Date(seconds * 1000);
  let minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  let data = `${date.getHours()}:${minutes}`;
  return data;
};
