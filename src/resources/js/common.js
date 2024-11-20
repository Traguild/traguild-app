// 문자열 길이 제한 (Limit)
export const getTitle = (title, limit) =>
  title.length > limit ? title.slice(0, limit) + "..." : title;

export const getCost = (cost) =>
  cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
