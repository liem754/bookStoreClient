export const generateRange = (start: number, end: number) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};
export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader?.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
