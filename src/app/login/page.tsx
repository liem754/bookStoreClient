"use client";
import { useDispatch } from "react-redux";
import { login, resgister } from "@/apis/auth";
import { useRouter } from "next/navigation";
import { logintoken } from "@/store/actions/auth";
import React from "react";
import Swal from "sweetalert2";
function Login() {
  const dispatch = useDispatch();
  const route = useRouter();
  const [isRegister, setIsRegister] = React.useState(false);
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
  });
  const handle = async () => {
    const final = { email: payload.email, password: payload.password };
    const rss = await login(final);
    if (rss.data.err === 0) {
      dispatch(
        logintoken({
          token: rss.data.access_token,
        })
      );
      route.push("/");
    } else {
      Swal.fire("Oops!", rss.data.mes, "error");
    }
  };

  return (
    <div className=" flex flex-col items-center  p-16 gap-20 text-white bg-[#212121] h-screen">
      <div className="w-3/5 flex flex-col gap-10">
        <label htmlFor="" className=" text-center text-4xl font-medium">
          Đăng nhập
        </label>
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
          className=" mt-7  outline-none border-none text-white bg-blue-600 hover:bg-blue-500 py-2"
        >
          Login
        </button>
        <h2
          className=" cursor-pointer hover:text-yellow-600 text-ellipsis"
          onClick={() => route.push("/resgister")}
        >
          Bạn chưa có tài khoản ?
        </h2>
      </div>
    </div>
  );
}

export default Login;
