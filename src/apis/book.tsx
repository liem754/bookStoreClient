import axios from "../apis/configAxios";

export const getBooks = (params: any) =>
  axios({
    url: "/api/v1/book",
    method: "get",
    params,
  });
export const getRatings = (pid: any) =>
  axios({
    url: "/api/v1/book/getrating/" + pid,
    method: "get",
  });
export const Ratings = (data: any) =>
  axios({
    url: "/api/v1/book/rating",
    method: "post",
    data,
  });
export const getBook = (bid: any) =>
  axios({
    url: "/api/v1/book/one/" + bid,
    method: "get",
  });
export const createBook = (data: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/book/",
        method: "post",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
export const deleteBook = (data: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/book/",
        method: "delete",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
export const updateBook = (data: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/book/",
        method: "put",
        data,
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
export const getBookbycategory = (category: any) =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/book/cate/" + category,
        method: "get",
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
export const getcategory = () =>
  new Promise<any>(async (resolve, reject) => {
    try {
      const rs = await axios({
        url: "/api/v1/book/all",
        method: "get",
      });
      resolve(rs);
    } catch (error) {
      reject(error);
    }
  });
