import { Icons } from "./icons";
import { IconType } from "react-icons";
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
const { AiOutlineStar, AiFillStar } = Icons;
export const formatStar = (number: number): JSX.Element[] => {
  const stars: JSX.Element[] = [];

  number = Math.round(number);
  for (let i = 0; i < +number; i++) stars.push(AiFillStar);
  for (let i = 5; i > +number; i--) stars.push(AiOutlineStar);
  return stars;
};
