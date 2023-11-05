import { getBlogs } from "@/apis/blog";
import { useSearchParams } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";

function Blog() {
  const param: any = useSearchParams();
  const [blog, setBlog] = useState<any>([]);
  const fetch = async (params: any) => {
    const rs = await getBlogs(params);
    if (rs.data.err === 0) {
      setBlog(rs.data.data);
    }
  };
  useEffect(() => {
    const query = { ...param };
    fetch(query);
  }, []);
  console.log(blog);

  return <div className="">blog</div>;
}

export default Blog;
