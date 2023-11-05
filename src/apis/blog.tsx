import axios from "./configAxios";
export const createBlog = (data: any) =>
  axios({
    url: "/api/v1/blog/create",
    method: "post",
    data,
  });
export const getBlogs = (params: any) =>
  axios({
    url: "/api/v1/blog/",
    method: "get",
    params,
  });
export const getBlog = (params: any) =>
  axios({
    url: "/api/v1/blog/" + params,
    method: "get",
  });
