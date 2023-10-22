"use client";
import { deleteBook, getBooks } from "@/apis/book";

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
import { formatCurrencyVND } from "@/ultils/custom";
import Swal from "sweetalert2";
import Edit from "@/components/edit";
function Manager() {
  const [books, setBooks] = useState<any>([]);
  const param = usePathname();
  const router = useRouter();
  const params: any = useSearchParams();
  const [edit, setEdit] = useState<any>();
  const [ca, setCa] = useState(false);

  const [searchs, setSearch] = useState("");
  const fetch = async (query: any) => {
    const rs = await getBooks({ ...query, limit: 9 });
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
    setCa(false);
  }, [params, searchs, ca, edit]);
  useEffect(() => {
    const paramss = new URLSearchParams();
    paramss.append("page", "1");
    const search = paramss.toString();
    const url = `${param}?${search}`;
    router.push(url);
  }, []);
  const handle = async (id: any) => {
    const rs = await deleteBook({
      bid: id,
    });
    if (rs.data.err === 0) {
      Swal.fire("Chúc mừng", "Xóa thành công", "success").then(() => {
        setCa(true);
      });
    }
  };
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="w-full flex flex-col gap-6 my-16 mx-4">
        <table className="w-full divide-y divide-gray-200  border shadow-md">
          <thead className="bg-black text-white">
            <tr className="bg-black text-white  border border-black">
              <th className="px-3 py-2  text-left text-xs font-medium uppercase tracking-wider">
                Stt
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Thumb
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Title
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Author
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Category
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-3 py-2 text-left text-xs font-medium uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books &&
              books?.data?.map((item: any, index: any) => (
                <tr key={index}>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {item?.id}
                    </span>
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      <img src={item?.images} alt="" className="w-[30px]" />
                    </span>
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {item?.title}
                    </span>
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {item?.author}
                    </span>
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {item?.category}
                    </span>
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrencyVND(item?.price)}
                    </span>
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      {item?.quantity}
                    </span>
                  </td>
                  <td className="px-3 py-2 border whitespace-nowrap">
                    <button
                      onClick={() => setEdit(item?.id)}
                      className=" py-1 px-2 mr-2 rounded-md outline-none bg-blue-600 text-white text-sm"
                    >
                      Sữa
                    </button>
                    <button
                      onClick={() => handle(item?.id)}
                      className=" py-1 px-2 rounded-md outline-none bg-red-600 text-white text-sm"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="my-16">
          <Pagination totalCount={books?.totalCount} pageSize={books?.limit} />
        </div>
      </div>
      {+edit !== 0 && edit !== undefined && (
        <div className="">
          <Edit edit={edit} setEdit={setEdit} />
        </div>
      )}
    </div>
  );
}

export default Manager;
