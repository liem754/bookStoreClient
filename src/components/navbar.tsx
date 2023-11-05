"use client";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { useEffect, useState } from "react";
import { logout } from "@/store/actions/auth";
import { getUser } from "@/store/actions/user";
import { getOne } from "@/apis/user";
import { useRouter, usePathname } from "next/navigation";
import { upper } from "@/ultils/upper";
import logo from "@/access/logo2.png";
import Swal from "sweetalert2";
import Image from "next/image";
import { getBookbycategory } from "@/apis/book";
import { log } from "console";
function Navbar() {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const { userData, mes } = useSelector((state: any) => state.user);
  const [no, setNo] = useState(false);

  useEffect(() => {
    const tim = setTimeout(() => {
      isLoggedIn && dispatch(getUser());
    }, 2000);

    return () => {
      clearTimeout(tim);
    };
  }, [isLoggedIn]);
  const ft = async () => {
    const rs = await getOne();
    // if(rs.data.err===0){

    // }

    if (rs.data.err !== 0) {
      setNo(false);
    } else {
      setNo(true);
    }
  };
  useEffect(() => {
    const t = setTimeout(() => {
      ft();
    }, 3000);
    return () => {
      clearTimeout(t);
    };
  }, []);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!no && !userData && isLoggedIn === true) {
        Swal.fire(
          "Oops!",
          "Phiên đăng nhập hết hạn vui lòng đăng nhập",
          "warning"
        ).then(() => {
          dispatch(logout());
        });
      }
    }, 4000);
    return () => {
      clearTimeout(t);
    };
  }, [no]);
  console.log(no);

  const path = usePathname();

  const router = useRouter();

  return (
    <div className="w-[20%] flex flex-col items-center fixed h-screen  py-2 border-b-2 bg-[#191919] text-gray-200">
      <div className="w-full flex flex-col items-center gap-3 py-2">
        <div className="w-[100%] flex justify-center pb-8 border-b">
          <Image
            src={logo}
            alt="logo"
            className="w-[50%] bg-contain rounded-xl"
          />
          {/* <img src={logo} alt="logo" className="w-[50%]" /> */}
        </div>
        {path?.includes("/admin") && isLoggedIn ? (
          <div className=" w-full pl-8 pt-3 pb-6 flex flex-col gap-4 justify-start border-b">
            <h2
              onClick={() => router.push("/admin")}
              className="text-lg cursor-pointer font-medium py-2 hover:border-r-8 hover:text-white"
            >
              Information
            </h2>

            <Link
              href={"/admin/cart"}
              className="text-lg cursor-pointer font-medium py-2 hover:border-r-8
            hover:text-white"
            >
              Cart
            </Link>
            {userData?.roleData?.value === "Admin" && (
              <>
                <Link
                  href={"/admin/manager"}
                  className="text-lg cursor-pointer font-medium py-2 hover:border-r-8
            hover:text-white"
                >
                  ManagerBook
                </Link>
                <Link
                  href={"/admin/createblog"}
                  className="text-lg cursor-pointer font-medium py-2 hover:border-r-8
           hover:text-white"
                >
                  Create Blog
                </Link>
              </>
            )}
            <Link
              href={"/"}
              // onClick={() => {
              //   router.push("/");
              // }}
              className="text-lg cursor-pointer font-medium py-2 hover:border-r-8 hover:text-white"
            >
              Home
            </Link>
          </div>
        ) : (
          <div className=" w-full">
            <div className=" w-full pl-8 pt-3 pb-6 flex flex-col gap-4 justify-start border-b">
              <Link
                className="text-lg font-medium py-2 hover:border-r-8 hover:text-white"
                href={"/"}
              >
                Home
              </Link>
              <div
                className="text-lg cursor-pointer font-medium py-2 hover:border-r-8 hover:text-white"
                onClick={() => {
                  router.push("/book");
                }}
              >
                Book
              </div>
              <Link
                href="/blog"
                className="text-lg font-medium  py-2 hover:border-r-8 hover:text-white"
              >
                Blog
              </Link>
            </div>
            <div className=" w-full pl-8 pt-3 pb-6 flex flex-col gap-4 justify-start border-b">
              {userData?.roleData?.code === "R1" && isLoggedIn && (
                <Link
                  href="/create"
                  className="text-lg font-medium  py-2 hover:border-r-8 hover:text-white"
                >
                  Đăng Sách
                </Link>
              )}
              <Link
                href="/contact"
                className="text-lg font-medium  py-2 hover:border-r-8 hover:text-white"
              >
                Liên hệ
              </Link>
            </div>
            {isLoggedIn ? (
              <div className=" w-full pl-8 pt-3 pb-6 flex flex-col gap-4 justify-start border-b">
                <Link
                  href={"/admin"}
                  className="text-lg -ml-2 flex items-center gap-2 cursor-pointer font-medium py-2 hover:border-r-8 hover:text-white"
                >
                  <img
                    className=" w-[40px] h-[40px] rounded-[50%]"
                    src={
                      userData?.avatar ||
                      "https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg"
                    }
                    alt=""
                  />
                  <h2>{upper(userData?.name)}</h2>
                </Link>
                <div
                  onClick={() => {
                    dispatch(logout());
                  }}
                  className="text-lg cursor-pointer font-medium py-2 hover:border-r-8 hover:text-white"
                >
                  Đăng xuất
                </div>
              </div>
            ) : (
              <div className=" w-full pl-8 pt-3 pb-6 flex flex-col gap-4 justify-start border-b">
                <Link
                  className="text-lg font-medium py-2 hover:border-r-8 hover:text-white"
                  href={"/resgister"}
                >
                  Đăng ký
                </Link>
                <Link
                  href={"/login"}
                  className="text-lg font-medium py-2 hover:border-r-8 hover:text-white"
                >
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
