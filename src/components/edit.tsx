import { useEffect, useState } from "react";
import { Icons } from "@/ultils/icons";
import { getBase64 } from "@/ultils/helpers";
import { log } from "console";
import { createBook, getBook, updateBook } from "@/apis/book";
import Swal from "sweetalert2";
const { BsImage } = Icons;
function Edit({ edit, setEdit }: any) {
  const [image, setImage] = useState<any>();
  const [doi, setDoi] = useState<any>();
  const [payload, setPayload] = useState<any>({
    bid: edit,
    title: "",
    author: "",
    category: "",
    publicationYear: "",
    description: "",
    price: "",

    quantity: "",
    images: "",
  });

  const fetch = async (id: any) => {
    const rs = await getBook(id);
    if (rs.data.err === 0) {
      setPayload({
        bid: edit,
        title: rs.data.book ? rs.data.book?.title : "",
        author: rs.data.book ? rs.data.book?.author : "",
        category: rs.data.book ? rs.data.book?.category : "",
        publicationYear: rs.data.book ? rs.data.book?.publicationYear : "",
        description: rs.data.book ? rs.data.book?.description : "",
        price: rs.data.book ? rs.data.book?.price : "",

        quantity: rs.data.book ? rs.data.book?.quantity : "",
        images: rs.data.book ? rs.data.book?.images : "",
      });
      setImage(rs.data.book?.images);
    }
  };
  useEffect(() => {
    fetch(edit);
  }, [edit]);
  const ToBase64 = async (file: any) => {
    if (
      file?.type !== "image/png" &&
      file?.type !== "image/jpeg" &&
      file?.type !== "image/jpg"
    ) {
      alert("File not supported!");
    }
    const han = await getBase64(file);

    setImage(han);
    setDoi(false);
  };
  const handleDe = () => {
    setPayload((pre: any) => ({ ...pre, images: "" }));
    setImage("");
  };
  const handleOn = async (e: any) => {
    const files = e.target.files;
    setPayload((pre: any) => ({ ...pre, images: files }));
    setDoi(true);
  };
  useEffect(() => {
    payload.images && ToBase64(payload?.images[0]);
  }, [doi]);
  const handle = async (data: Record<string, any>) => {
    const formData = new FormData();
    if (payload.images.length > 0) formData.append("images", payload.images[0]);

    for (let i of Object.entries(data)) formData.append(i[0], i[1]);

    const rs = await updateBook(formData);
    if (rs.data.err === 0) {
      setEdit(0);
    }
  };

  return (
    <div className=" absolute top-0 left-0 bottom-0 right-0 z-40 bg-black bg-opacity-50  h-screen">
      <div className="flex flex-col justify-center items-center">
        <div className=" bg-white mt-2 ">
          <div className="container rounded-md ">
            <div className="form">
              <h2 className="text-3xl font-bold text-center">
                Sữa Thông Tin Sách
              </h2>

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
            <div className=" flex justify-end gap-4 mr-4">
              <button
                onClick={() => setEdit(0)}
                className=" text-lg hover:bg-gray-600 bg-black text-white outline-none rounded-md  py-2 px-7"
              >
                Cancel
              </button>
              <button
                onClick={() => handle(payload)}
                className=" text-lg hover:bg-blue-500 bg-blue-600 text-white outline-none rounded-md  py-2 px-7"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
