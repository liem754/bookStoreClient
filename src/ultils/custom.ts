export const formatCurrencyVND = (price: any) => {
  // Chuyển đổi giá tiền thành số và làm tròn đến 2 chữ số thập phân
  const roundedPrice = Math.round(parseFloat(price) * 100) / 100;

  // Sử dụng hàm toLocaleString() để định dạng số sang chuỗi có dấu phân cách hàng nghìn
  const formattedPrice = roundedPrice.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  // Trả về giá tiền đã được định dạng
  return formattedPrice;
};
export const voteOption = [
  {
    id: 1,
    title: "Terrible",
  },
  {
    id: 2,
    title: "Bad",
  },

  {
    id: 3,
    title: "Neutral",
  },

  {
    id: 4,
    title: "Good",
  },
  {
    id: 5,
    title: "Perfect",
  },
];
