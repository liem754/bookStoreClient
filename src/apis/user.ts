import axios from "@/apis/configAxios";
export const getOne = () =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/user/",
        method: "get",
      });
      resolve(rs);
      console.log(rs);
    } catch (error) {
      reject(error);
    }
  });
export const updateCart = (data: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/user/update",
        method: "post",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
export const getCarts = () =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/user/carts",
        method: "get",
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
export const deleteCart = (data: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/user/",
        method: "put",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
export const contact = (data: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/user/mail",
        method: "post",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
export const updateUser = (data: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/user/update",
        method: "put",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
