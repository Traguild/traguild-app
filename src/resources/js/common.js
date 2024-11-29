// 문자열 길이 제한 (Limit)
export const getTitle = (title, limit) =>
  title.length > limit ? title.slice(0, limit) + "..." : title;

export const getContents = (contents, limit) => {
  contents =
    contents.length > limit ? contents.slice(0, limit) + "..." : contents;

  if (contents.split("\n").length - 1 < 2) return contents;
  else return contents.split("\n")[0] + "...";
};
export const getCost = (cost) =>
  cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const getEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
