"use client";
import { updateUser } from "@/apis/user";
import { getUser } from "@/store/actions/user";
import { getBase64 } from "@/ultils/helpers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function User() {
  const dispatch = useDispatch<any>();
  const [truee, setTruee] = useState<any>(false);

  const [avatar, setAvatar] = useState<any>();
  const { userData } = useSelector((state: any) => state.user);
  const [payload, setPayload] = useState<any>({
    name: userData?.name ? userData?.name : "",
    email: userData?.email ? userData?.email : "",
    avatar: userData?.avatar || "",
  });
  const ToBase64 = async (file: any) => {
    if (
      file?.type !== "image/png" &&
      file?.type !== "image/jpeg" &&
      file?.type !== "image/jpg"
    ) {
      alert("File not supported!");
    }
    const han = await getBase64(file);

    setAvatar(han);
    setTruee(false);
  };
  const handle = async (data: Record<string, any>) => {
    let formData = new FormData();
    if (data.avatar.length > 0) formData.append("avatar", data.avatar[0]);
    else delete data.avatar;

    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    const rs = await updateUser(formData);
    if (rs.data.err === 0) {
      Swal.fire("Thành công", "Chỉnh sữa thông tin thành công", "success").then(
        () => {
          dispatch(getUser());
          setAvatar("");
        }
      );
    }
  };
  const handleChane = (e: any) => {
    setPayload((pre: any) => ({
      ...pre,
      avatar: e.target.files,
    }));
    setTruee(true);
  };
  useEffect(() => {
    truee && setAvatar(ToBase64(payload.avatar[0]));
  }, [truee]);

  return (
    <div className="flex justify-center flex-col text-white items-center bg-[#212121] h-screen">
      <h2 className=" text-3xl font-bold text-center">Thông Tin Tài Khoản</h2>
      <div className="w-3/5 rounded-2xl bg-slate-900 my-10 text-white">
        <div className="flex flex-col gap-5 p-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="">Tên</label>
            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="Name"
              value={payload.name}
              onChange={(e) =>
                setPayload((pre: any) => ({ ...pre, name: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="">Email</label>
            <input
              className="bg-slate-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="Email"
              value={payload.email}
              onChange={(e) =>
                setPayload((pre: any) => ({ ...pre, email: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2">
              <img
                className=" w-[60px] h-[60px] rounded-[50%] mt-3"
                src={userData?.avatar ? userData?.avatar : avatar}
                alt=""
              />
              <label htmlFor="avatar">Thay ảnh</label>
              <input
                id="avatar"
                onChange={(e) => handleChane(e)}
                type="file"
                hidden
              />
            </div>
            {avatar && (
              <div className="flex flex-col gap-2 items-center">
                <img
                  className=" w-[60px] h-[60px] rounded-[50%] mt-3"
                  src={avatar}
                  alt=""
                />
                <label htmlFor="avatar">ảnh mới</label>
              </div>
            )}
          </div>

          <button
            onClick={() => handle(payload)}
            className="inline-block cursor-pointer rounded-md bg-gray-700 px-4 py-3.5 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;
