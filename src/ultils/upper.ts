export const upper = (value: string) => {
  const newArr = value?.split(" ");
  const custom = newArr?.map((item) => {
    let d = item.charAt(0).toUpperCase();
    let c = item.slice(1).toLowerCase();
    return (item = d + c);
  });
  return custom?.join(" ");
};
