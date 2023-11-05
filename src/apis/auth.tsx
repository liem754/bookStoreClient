import axios from "axios";
export interface data {
  name: string;
  email: string;
  password: string;
}
export interface ReqLogin {
  email: string;
  password: string;
}
export const resgister = (data: data) =>
  axios({
    url: "https://api-bookstore-g9ae.onrender.com/api/v1/auth/register",
    method: "post",
    data,
  });
export const finalresgister = (data: data) =>
  axios({
    url: "https://api-bookstore-g9ae.onrender.com/api/v1/auth/final",
    method: "put",
    data,
  });
export const login = (data: ReqLogin) =>
  axios({
    url: "https://api-bookstore-g9ae.onrender.com/api/v1/auth/login",
    method: "post",
    data,
  });
