import axios from "./configAxios";
export const createBlog = (data: any) =>
  axios({
    url: "/api/v1/blog/create",
    method: "post",
    data,
  });
