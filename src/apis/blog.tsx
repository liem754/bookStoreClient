import axios from "../apis/configAxios";
export const createBlog = (data: any) =>
  axios({
    url: "/api/v1/blog/",
    method: "post",
    data,
  });
