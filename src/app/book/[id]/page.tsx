"use client";
import { getBook, getRatings } from "@/apis/book";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { book } from "@/types/book";
import { formatCurrencyVND } from "@/ultils/custom";
import { updateCart } from "@/apis/user";
import { formatStar } from "@/ultils/helpers";
import Votebar from "@/components/voteBar";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import moment from "moment";
import { Router } from "next/router";
import ModalRating from "@/components/modalRating";
import { Icons } from "@/ultils/icons";
const { AiOutlineStar, AiFillStar } = Icons;
function View() {
  const [number, setNumber] = useState(1);
  const { isLoggedIn } = useSelector((state: any) => state.auth);
  const [ratings, setRatings] = useState<any>(null);
  const [modal, setModal] = useState(false);
  const [products, setProducts] = useState(null);
  const route = useRouter();
  const param: any = useParams();

  const [quantity, setQuantity] = useState(0);
  const [book, setBook] = useState<book>();
  const fetch = async (id: any) => {
    const rs = await getBook(id);
    if (rs.data.err === 0) {
      setBook(rs.data.book);
    }
  };
  const fetchs = async (pid: any) => {
    const rs = await getRatings(pid);
    if (rs.data.err === 0) {
      setRatings(rs.data.ratings);
    } else {
      setRatings([]);
    }
  };

  useEffect(() => {
    fetchs(param?.id);
  }, [param.id, modal]);

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
      {modal && <ModalRating setRating={setModal} pid={param?.id} />}

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
      <div className="w-full">
        <div className="flex flex-col items-center gap-5">
          <div className="border-4 py-6 px-2 flex w-[90%] justify-between">
            <div className="w-[40%] flex flex-col items-center gap-2 justify-center">
              <span className="text-lg font-medium">{`${
                ratings?.length !== 0
                  ? Math.round(
                      (ratings?.reduce(
                        (sum: any, el: any) => sum + +el.star,
                        0
                      ) *
                        10) /
                        ratings?.length
                    ) / 10
                  : 0
              }/5`}</span>
              <span className="flex gap-1">
                {(ratings?.length !== 0
                  ? Math.round(
                      (ratings?.reduce(
                        (sum: any, el: any) => sum + +el.star,
                        0
                      ) *
                        10) /
                        ratings?.length
                    ) / 10
                  : 0) === 5 ? (
                  <div className="flex items-center gap-2">
                    <AiFillStar color="orange" />
                    <AiFillStar color="orange" />

                    <AiFillStar color="orange" />

                    <AiFillStar color="orange" />

                    <AiFillStar color="orange" />
                  </div>
                ) : (ratings?.length !== 0
                    ? Math.round(
                        (ratings?.reduce(
                          (sum: any, el: any) => sum + +el.star,
                          0
                        ) *
                          10) /
                          ratings?.length
                      ) / 10
                    : 0) === 4 ? (
                  <div className="flex items-center gap-2">
                    <AiFillStar color="orange" />
                    <AiFillStar color="orange" />

                    <AiFillStar color="orange" />

                    <AiFillStar color="orange" />

                    <AiOutlineStar color="orange" />
                  </div>
                ) : (ratings?.length !== 0
                    ? Math.round(
                        (ratings?.reduce(
                          (sum: any, el: any) => sum + +el.star,
                          0
                        ) *
                          10) /
                          ratings?.length
                      ) / 10
                    : 0) === 3 ? (
                  <div className="flex items-center gap-2">
                    <AiFillStar color="orange" />
                    <AiFillStar color="orange" />

                    <AiFillStar color="orange" />

                    <AiOutlineStar color="orange" />
                    <AiOutlineStar color="orange" />
                  </div>
                ) : (ratings?.length !== 0
                    ? Math.round(
                        (ratings?.reduce(
                          (sum: any, el: any) => sum + +el.star,
                          0
                        ) *
                          10) /
                          ratings?.length
                      ) / 10
                    : 0) === 2 ? (
                  <div className="flex items-center gap-2">
                    <AiFillStar color="orange" />
                    <AiFillStar color="orange" />

                    <AiOutlineStar color="orange" />

                    <AiOutlineStar color="orange" />
                    <AiOutlineStar color="orange" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <AiFillStar color="orange" />
                    <AiOutlineStar color="orange" />

                    <AiOutlineStar color="orange" />

                    <AiOutlineStar color="orange" />
                    <AiOutlineStar color="orange" />
                  </div>
                )}
              </span>
              <span className="lg:text-sm text-xs">{`${ratings?.length} reviewer`}</span>
            </div>
            <div className="w-[60%] flex flex-col gap-2">
              {Array.from(Array(5).keys())
                .reverse()
                .map((el) => (
                  <Votebar
                    key={el}
                    number={el + 1}
                    ratingCount={
                      ratings?.filter((i: any) => i.star === el + 1).length
                    }
                    ratingTotle={ratings?.length}
                  />
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-3 justify-center items-center">
            <h2>Do you want rating?</h2>
            <button
              onClick={() => {
                if (isLoggedIn) {
                  setModal(true);
                } else {
                  Swal.fire({
                    text: "Go Login to vote",
                    cancelButtonText: "Cancel",
                    confirmButtonText: "Go Login",
                    title: "Oops!",
                    showCancelButton: true,
                  }).then((rs) => {
                    if (rs.isConfirmed) route.push("/login");
                  });
                }
              }}
              className="py-1 px-5 bg-red-600 text-white rounded-md"
            >
              Đánh giá ngay
            </button>
          </div>
          <div className="flex flex-col gap-6 w-[90%] text-black bg-white pt-5">
            {ratings?.map((el: any) => (
              <div key={el} className="">
                <div className="flex flex-col gap-2 p-1 border ">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <img
                        src={el?.userData?.avatar}
                        className="w-[30px] rounded-[50%]"
                        alt=""
                      />

                      <h2 className="font-bold">{`${
                        el?.userData?.name?.charAt(0).toUpperCase() +
                        el?.userData?.name.slice(1)
                      }`}</h2>
                    </div>
                    <span className="text-xs">
                      {moment(el?.updatedAt).fromNow()}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 text-sm flex flex-col gap-1 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">vote:</span>
                      <span className="flex items-center gap-1">
                        {el?.star === 5 ? (
                          <div className="flex items-center gap-2">
                            <AiFillStar color="orange" />
                            <AiFillStar color="orange" />

                            <AiFillStar color="orange" />

                            <AiFillStar color="orange" />

                            <AiFillStar color="orange" />
                          </div>
                        ) : el?.star === 4 ? (
                          <div className="flex items-center gap-2">
                            <AiFillStar color="orange" />
                            <AiFillStar color="orange" />

                            <AiFillStar color="orange" />

                            <AiFillStar color="orange" />

                            <AiOutlineStar color="orange" />
                          </div>
                        ) : el?.star === 3 ? (
                          <div className="flex items-center gap-2">
                            <AiFillStar color="orange" />
                            <AiFillStar color="orange" />

                            <AiFillStar color="orange" />

                            <AiOutlineStar color="orange" />
                            <AiOutlineStar color="orange" />
                          </div>
                        ) : el?.star === 2 ? (
                          <div className="flex items-center gap-2">
                            <AiFillStar color="orange" />
                            <AiFillStar color="orange" />

                            <AiOutlineStar color="orange" />

                            <AiOutlineStar color="orange" />
                            <AiOutlineStar color="orange" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <AiFillStar color="orange" />
                            <AiOutlineStar color="orange" />

                            <AiOutlineStar color="orange" />

                            <AiOutlineStar color="orange" />
                            <AiOutlineStar color="orange" />
                          </div>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">Comment:</span>

                      <h2 className=" text-ellipsis">
                        {`

                                               " ${el.comment} "`}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default View;
