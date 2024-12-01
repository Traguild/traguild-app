// 문자열 길이 제한 (Limit)
export const getTitle = (title, limit) =>
  title.length > limit ? title.slice(0, limit) + "..." : title;

export const getContents = (contents, limit) => {
  contents = contents.split("\n")[0];
  return contents.length > limit ? contents.slice(0, limit) + "..." : contents;
};

export const getCost = (cost) =>
  cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const isEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const getKorDate = (date) => {
  return new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
