"use client";
import { finalresgister } from "@/apis/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";

function Modal({ setIsFinal }: any) {
  const [payload, setPayload] = useState<any>({
    token: "",
  });
  const route = useRouter();
  const handle = async () => {
    const rs = await finalresgister(payload);
    if (rs.data.success === true) {
      setIsFinal(false);

      Swal.fire({
        title: "Chúc mừng",
        text: "Đăng ký thành công, vui lòng đăng nhập!",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: "No",
        customClass: {
          actions: "my-actions",
          cancelButton: "order-1 right-gap",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          route.push("/login");
        }
      });
    }
  };
  return (
    <div className="bg-black animate-slide-bottom text-black w-full bg-opacity-30 absolute top-0 left-0 bottom-0 right-0 flex flex-col justify-center items-center">
      <div className="w-2/5 flex flex-col gap-3 p-7 bg-white ">
        <h2 className=" text-xl font-medium text-center">
          Nhập mã để xác thực
        </h2>
        <input
          type="text"
          name=""
          id=""
          className="p-2 w-full border border-gray-500 rounded-md"
          value={payload.token}
          onChange={(e) =>
            setPayload((pre: any) => ({ ...pre, token: e.target.value }))
          }
        />
        <div className=" flex justify-end gap-4">
          <button
            onClick={() => setIsFinal(false)}
            className=" bg-black text-white py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handle}
            className=" bg-black text-white py-2 px-4 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
