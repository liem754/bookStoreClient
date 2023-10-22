"use client";
import { useEffect, useState } from "react";
import "./create.css";
import { bookDetail } from "@/types/book";
import { Icons } from "@/ultils/icons";
import { getBase64 } from "@/ultils/helpers";
import { log } from "console";
import { createBook } from "@/apis/book";
import Swal from "sweetalert2";
const { BsImage } = Icons;
function Create() {
  const [image, setImage] = useState<any>();
  const [load, setLoad] = useState<any>(false);

  const [payload, setPayload] = useState<any>({
    title: "",
    author: "",
    category: "",
    publicationYear: "",
    description: "",
    price: 0,
    quantity: 0,
    images: "",
  });
  const ToBase64 = async (file: any) => {
    if (file?.type !== "image/png" && file?.type !== "image/jpeg") {
      alert("File not supported!");
    }
    const han = await getBase64(file);

    setImage(han);
  };
  const handleDe = () => {
    setPayload((pre: any) => ({ ...pre, images: "" }));
    setImage("");
  };
  const handleOn = async (e: any) => {
    const files = e.target.files;

    setPayload((pre: any) => ({ ...pre, images: files }));
  };
  useEffect(() => {
    payload.images && ToBase64(payload?.images[0]);
  }, [payload?.images]);

  const handle = async (data: Record<string, any>) => {
    setLoad(true);
    const formData = new FormData();
    if (data?.images?.length > 0) formData.append("images", data.images[0]);
    else delete data.images;

    for (let i of Object.entries(data)) formData.append(i[0], i[1]);
    // for (let i of Object.entries(data)) console.log(i);

    const rs = await createBook(formData);
    console.log(rs.data.err);

    if (rs.data.err === 0) {
      Swal.fire("Chúc mừng!", "Đăng sách thành công", "success").then(() => {
        setLoad(false);
        setPayload({
          title: "",
          author: "",
          category: "",
          publicationYear: "",
          description: "",
          price: 0,
          quantity: 0,
          images: "",
        });
        setImage("");
      });
    } else {
      setLoad(false);
      Swal.fire("Oops!", `${rs.data.mes}`, "error");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-[#212121]">
      <div className="w-4/5 flex flex-col items-center">
        <div className="container my-14 rounded-md">
          <div className="form">
            <h2 className="text-3xl font-bold text-center">Đăng Sách</h2>

            <div className="form-row">
              <div className="input-data">
                <input
                  type="text"
                  required
                  value={payload?.title}
                  onChange={(e) =>
                    setPayload((pre: any) => ({
                      ...pre,
                      title: e.target.value,
                    }))
                  }
                />
                <div className="underline"></div>
                <label htmlFor="">Title</label>
              </div>
              <div className="input-data">
                <input
                  type="text"
                  required
                  value={payload?.author}
                  onChange={(e) =>
                    setPayload((pre: any) => ({
                      ...pre,
                      author: e.target.value,
                    }))
                  }
                />
                <div className="underline"></div>
                <label htmlFor="">Author</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  type="text"
                  required
                  value={payload?.category}
                  onChange={(e) =>
                    setPayload((pre: any) => ({
                      ...pre,
                      category: e.target.value,
                    }))
                  }
                />
                <div className="underline"></div>
                <label htmlFor="">Category</label>
              </div>
              <div className="input-data">
                <input
                  type="text"
                  required
                  value={payload?.publicationYear}
                  onChange={(e) =>
                    setPayload((pre: any) => ({
                      ...pre,
                      publicationYear: e.target.value,
                    }))
                  }
                />
                <div className="underline"></div>
                <label htmlFor="">PublicationYear</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data">
                <input
                  type="text"
                  required
                  value={payload?.quantity}
                  onChange={(e) =>
                    setPayload((pre: any) => ({
                      ...pre,
                      quantity: e.target.value,
                    }))
                  }
                />
                <div className="underline"></div>
                <label htmlFor="">Quantity</label>
              </div>
              <div className="input-data">
                <input
                  type="text"
                  required
                  value={payload?.price}
                  onChange={(e) =>
                    setPayload((pre: any) => ({
                      ...pre,
                      price: e.target.value,
                    }))
                  }
                />
                <div className="underline"></div>
                <label htmlFor="">Price</label>
              </div>
            </div>
            <div className="form-row">
              <div className="input-data textarea">
                <textarea
                  required
                  value={payload?.description}
                  onChange={(e) =>
                    setPayload((pre: any) => ({
                      ...pre,
                      description: e.target.value,
                    }))
                  }
                ></textarea>
                <br />
                <div className="underline"></div>
                <label htmlFor="">Description</label>
                <br />
              </div>
            </div>
            <div
              onFocus={(e) => {
                e.stopPropagation();
              }}
              className="w-full px-3 py-5 mt-3 "
            >
              <label htmlFor="" className=" font-medium mb-2">
                Images (chọn ảnh)
              </label>
              <div className="w-full h-[160px] border-2 border-black mt-1 flex justify-center items-center">
                <label htmlFor="image" className=" cursor-pointer">
                  <BsImage size={"40px"} />
                </label>
              </div>
              <input id="image" type="file" hidden onChange={handleOn} />
            </div>
            <div className="w-full ">
              {image && (
                <div key={image} className="flex gap-2">
                  <img src={image} className="w-[30%] my-2" alt="" />
                  <span
                    className=" cursor-pointer "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDe();
                    }}
                  >
                    Xóa
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className=" flex justify-end mr-4">
            <button
              onClick={() => handle(payload)}
              className=" text-lg cursor-pointer transition-all 
              bg-gray-700 text-white px-8 py-2 rounded-lg
              border-green-400
              border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
              active:border-b-[2px] active:brightness-90 active:translate-y-[2px] hover:shadow-xl hover:shadow-green-300 shadow-green-300 active:shadow-none"
            >
              {load ? (
                <div className="flex flex-row gap-2 py-2 px-4 ">
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.3s]"></div>
                  <div className="w-2 h-2 rounded-full bg-white animate-bounce [animation-delay:.7s]"></div>
                </div>
              ) : (
                <p> Create</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
