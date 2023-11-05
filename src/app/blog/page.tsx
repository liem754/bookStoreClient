"use client";

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
    const queris: any = {};
    for (let i of param) queris[i[0]] = i[1];

    const q = { ...queris };
    fetch(q);
  }, []);
  console.log(blog);

  return (
    <div className="p-4 flex gap-4">
      {blog?.map((item: any) => (
        <div key={item?.id} className="w-[30%]">
          <img src={item?.images} alt="" className="w-full" />
          <div className="p-2">
            <h2 className="text-center font-semibold line-clamp-2 overflow-ellipsis">
              {item?.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Blog;
