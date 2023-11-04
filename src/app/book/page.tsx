"use client";
import { getBook, getBooks } from "@/apis/book";

import {
  useRouter,
  usePathname,
  useSearchParams,
  useParams,
} from "next/navigation";
import { log } from "console";
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import { book } from "@/types/book";
import BookItem from "@/components/bookItem";
// import {
//   createSearchParams,
//   useLocation,
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";

function Book() {
  const param = usePathname();
  const router = useRouter();
  const params: any = useSearchParams();

  const [books, setBooks] = useState<any>({});
  const [category, setCategory] = useState("");
  const [searchs, setSearch] = useState("");

  // const param = useLocation();
  // const navigate = useNavigate();
  // const [params] = useSearchParams();

  const fetch = async (query: any) => {
    const rs = await getBooks({ ...query });
    if (rs?.data.err === 0) {
      setBooks(rs?.data);
    }
  };
  useEffect(() => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queris: any = {};
    for (let i of params) queris[i[0]] = i[1];

    const q = { ...queris };
    fetch(q);
    window.scrollTo(0, 0);
  }, [params, searchs]);
  useEffect(() => {
    const paramss = new URLSearchParams();
    paramss.append("page", "1");
    const search = paramss.toString();
    const url = `${param}?${search}`;

    router.push(url);
  }, []);
  useEffect(() => {
    if (category !== "all" && category !== "") {
      const paramss = new URLSearchParams();
      paramss.append("category", category);
      const search = paramss.toString();
      const url = `${param}?${search}`;
      router.push(url);
    } else {
      const paramss = new URLSearchParams();
      paramss.append("page", "1");
      const search = paramss.toString();
      const url = `${param}?${search}`;
      router.push(url);
    }
  }, [category]);
  const handle = () => {
    if (searchs === "") {
      const paramss = new URLSearchParams();
      paramss.append("page", "1");
      const search = paramss.toString();
      const url = `${param}?${search}`;
      router.push(url);
    } else {
      const paramss = new URLSearchParams();
      paramss.append("q", searchs);
      const search = paramss.toString();
      const url = `${param}?${search}`;
      router.push(url);
    }
  };
  const handleDetail = async (id: any) => {
    router.push(`/book/${id}`);
  };
  return (
    <div className="flex flex-col p-36 gap-20 bg-[#212121] text-white ">
      <div className="w-full">
        <div className=" mb-28 mt-0 flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <h2>Filter</h2>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className=" text-black p-2 rounded-md"
            >
              <option className=" text-lg" value="all">
                Tất Cả
              </option>

              <option className=" text-lg" value="Lập">
                Lập Trình
              </option>
              <option className=" text-lg" value="Tiếng">
                Tiếng Anh
              </option>
              <option className=" text-lg" value="Tiểu">
                Tiểu Thuyết
              </option>
              <option className=" text-lg" value="Khoa">
                Khoa Học Viễn Tưởng
              </option>
              <option className=" text-lg" value="Kinh">
                Kinh Dị
              </option>
              <option className=" text-lg" value="Lãng">
                Lãng Mạng
              </option>
            </select>
          </div>
          <div className=" flex flex-col gap-2">
            <h2>Search</h2>
            <div className=" border border-white rounded-md flex">
              <input
                className=" p-[6px] outline-none border-none text-black"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={handle}
                className=" text-white bg-blue-600 py-1 rounded-md px-3 outline-none border-none"
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-5 flex-wrap">
          {books?.data?.map((item: book) => (
            <div
              onClick={() => handleDetail(item.id)}
              key={item.id}
              className="w-[30%] "
            >
              <BookItem
                user={item.user}
                id={item.id}
                quantity={item.quantity}
                title={item.title}
                author={item.author}
                category={item.category}
                description={item.description}
                images={item.images}
                price={item.price}
                publicationYear={item.publicationYear}
              />
            </div>
          ))}
        </div>
        <div className="my-16">
          <Pagination totalCount={books?.totalCount} pageSize={books?.limit} />
        </div>
      </div>
    </div>
  );
}

export default Book;
