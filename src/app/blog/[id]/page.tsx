"use client";
import { getBlog } from "@/apis/blog";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
function BlogItem() {
  const param: any = useParams();
  const [blog, setBlog] = useState<any>({});
  const fetch = async (params: any) => {
    const rs = await getBlog(params);
    if (rs.data.err === 0) {
      setBlog(rs.data.data);
    }
  };
  useEffect(() => {
    fetch(param?.id);
  }, [param?.id]);
  return (
    <div className="p-4">
      <h2 className="text-2xl font-medium text-center">{blog?.title}</h2>
      <div className="flex justify-center items-center">
        <img src={blog?.images} alt="" className="w-[70%]" />
      </div>
      <div className="p-4">{blog?.description}</div>
    </div>
  );
}

export default BlogItem;
