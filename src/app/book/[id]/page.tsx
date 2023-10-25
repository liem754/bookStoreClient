"use client";
import { getBook } from "@/apis/book";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { book } from "@/types/book";
import { formatCurrencyVND } from "@/ultils/custom";
import { updateCart } from "@/apis/user";
function View() {
  const param: any = useParams();
  const [quantity, setQuantity] = useState(0);
  const [book, setBook] = useState<book>();
  const fetch = async (id: any) => {
    const rs = await getBook(id);
    if (rs.data.err === 0) {
      setBook(rs.data.book);
    }
  };
  useEffect(() => {
    param.id && fetch(param.id);
  }, [param.id]);
  const handleCart = async () => {
    const rs = await updateCart({
      pid: book?.id,
      price: book ? quantity * book?.price : 0,
      quantity: quantity,
    });
    if (rs.data.success) {
      alert(`${rs.data.mes}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#212121] text-white">
      <div className="w-4/5 my-16 p-2 px-0 border-x shadow-2xl">
        <div className=" flex flex-col gap-6 justify-center items-center">
          <h2 className=" text-3xl font-bold text-center">{book?.title}</h2>
          <img src={book?.images} alt="" className=" w-[90%]" />
        </div>
        <div className="flex flex-col gap-3 mt-6 p-5">
          <div className="flex justify-between">
            <h2 className=" text-lg font-medium">{`Tác giả: ${book?.author}`}</h2>
            <h2 className=" text-lg font-medium">{`Năm phát hành: ${book?.publicationYear}`}</h2>
          </div>
          <h2 className=" text-lg font-medium">{`Thể loại: ${book?.category}`}</h2>
          <h2 className=" text-lg font-medium">{`Giá: ${formatCurrencyVND(
            book?.price
          )}`}</h2>
          <h2 className=" text-lg font-medium">{`Số lượng: ${book?.quantity}`}</h2>
          <h2 className=" text-lg font-medium">{`Mô tả:`}</h2>

          <span className="h-auto">{book?.description}</span>
          <div className="">
            <h2 className=" text-lg font-medium">{`Người đăng sách:`}</h2>
            <div className=" mt-1">
              <h2 className=" text-md">{`Tên: ${book?.user?.name}`}</h2>
              <h2 className=" text-md">{`Email: ${book?.user?.email}`}</h2>
            </div>
          </div>

          <div className=" flex flex-col justify-between items-center mt-4 gap-5">
            <h2 className=" text-xl font-semibold">
              Thêm vào giỏ hàng ngay thôi nào
            </h2>
            <div className=" flex flex-col items-center gap-1 ">
              <h2>Số lượng</h2>
              <input
                type="text"
                value={quantity}
                className="text-black p-2"
                onChange={(e: any) => setQuantity(e.target.value)}
              />
            </div>
            <button
              onClick={handleCart}
              className=" outline-none w-full bg-blue-600 px-4 py-1 h-auto rounded-md"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
