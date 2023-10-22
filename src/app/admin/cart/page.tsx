"use client";
import { deleteCart, getCarts } from "@/apis/user";
import { formatCurrencyVND } from "@/ultils/custom";
import { title } from "process";
import React, { useEffect, useState } from "react";

function Cart() {
  const [carts, setCarts] = useState<any>();
  const [update, setUpdate] = useState<any>(false);

  const fetch = async () => {
    const rs = await getCarts();
    if (rs.data.err === 0) {
      setCarts(rs.data.carts);
    }
  };
  const handleDelete = async (id: any) => {
    const rs = await deleteCart({
      id: id,
    });
    if (rs.data.err === 0) {
      alert("Xóa thành công!");
      fetch();
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="bg-[#212121] flex justify-center items-center h-screen">
      <div className="w-4/5 flex flex-col gap-6 my-16">
        <h2 className="text-white text-3xl font-bold text-center">
          Giỏ Hàng Của Bạn
        </h2>
        {carts?.map((item: any) => (
          <div
            key={item.id}
            className="flex justify-between  bg-white text-black p-2 "
          >
            <div className=" flex w-full ">
              <img
                src={item?.book?.images}
                alt=""
                className="w-[30%] h-[230px]"
              />
              <div className="flex w-[70%] flex-col justify-between gap-2">
                <div className=" p-2 flex justify-between gap-2">
                  <div className="flex flex-col gap-3">
                    <h2 className=" text-lg font-medium">{`Title: ${item?.book?.title}`}</h2>
                    <h2 className="text-lg font-medium">{`Author: ${item?.book?.author}`}</h2>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h2 className=" text-lg font-medium">{`Quantity: ${item?.quantity}`}</h2>
                    <h2 className="text-lg font-medium">{`Price: ${formatCurrencyVND(
                      item?.price
                    )}`}</h2>
                  </div>
                </div>
                <div className="w-full pl-2 text-white">
                  <button
                    onClick={() => handleDelete(item?.id)}
                    className=" outline-none mt-3 w-full border-none py-2 px-4 bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col items-end gap-3 text-white">
          <div className="flex items-center gap-2 font-medium">
            <h2>Tổng Tiền: </h2>
            <h2>
              {formatCurrencyVND(
                carts?.reduce((sum: any, el: any) => +el?.price + sum, 0)
              )}
            </h2>
          </div>
          <div className="">
            <button className=" outline-none border-none py-3 px-11 rounded-md hover:bg-blue-400 bg-blue-500">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Cart);
