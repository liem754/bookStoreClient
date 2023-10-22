"use client";
import { useDispatch } from "react-redux";
import { login, resgister } from "@/apis/auth";
import { useRouter } from "next/navigation";
import { logintoken } from "@/store/actions/auth";
import React from "react";
import Swal from "sweetalert2";
import Modal from "@/components/modal";
function Resgister() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [isFinal, setIsFinal] = React.useState(false);
  const [isLoad, setIsLoad] = React.useState(false);

  const [isRegister, setIsRegister] = React.useState(false);
  const [payload, setPayload] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const handle = async () => {
    setIsLoad(true);
    const rss = await resgister(payload);
    if (rss.data.err === 0) {
      setIsLoad(false);
      Swal.fire("Chúc mừng!", `${rss.data.mes}`, "success").then(() => {
        setIsFinal(true);
      });

      //   route.push("/");
    } else {
      Swal.fire("Oops!", `${rss.data.mes}`, "warning");
    }
  };

  return (
    <div className=" flex flex-col items-center  p-16 gap-20 text-white bg-[#212121] h-screen">
      <div className=" flex flex-col gap-10 w-3/5">
        <label htmlFor="" className=" text-center text-4xl font-medium">
          Đăng ký
        </label>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">Name</label>
          <input
            type="text"
            className=" p-2 text-black"
            placeholder="name..."
            value={payload.name}
            onChange={(e) =>
              setPayload((pre) => ({ ...pre, name: e.target.value }))
            }
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">Email</label>
          <input
            type="text"
            className=" p-2 text-black"
            placeholder="email..."
            value={payload.email}
            onChange={(e) =>
              setPayload((pre) => ({ ...pre, email: e.target.value }))
            }
          />
        </div>
        <div className=" flex flex-col gap-2">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className=" p-2 text-black"
            placeholder="password..."
            value={payload.password}
            onChange={(e) =>
              setPayload((pre) => ({ ...pre, password: e.target.value }))
            }
          />
        </div>

        <button
          onClick={handle}
          className=" mt-7 flex justify-center outline-none border-none text-white bg-blue-600 hover:bg-blue-400 py-2"
        >
          {isLoad ? (
            <div className="flex flex-row gap-2 py-2 px-4 ">
              <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
              <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
              <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
            </div>
          ) : (
            <p> Resgister</p>
          )}
        </button>
        <h2
          className="cursor-pointer hover:text-yellow-600 text-ellipsis"
          onClick={() => route.push("/login")}
        >
          Đăng nhập ngay !
        </h2>
      </div>
      {isFinal && <Modal setIsFinal={setIsFinal} />}
    </div>
  );
}

export default Resgister;
