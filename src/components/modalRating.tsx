import { memo, useState } from "react";
import { Icons } from "../ultils/icons";
import Button from "../components/button";
import Swal from "sweetalert2";
import { Ratings } from "@/apis/book";
import { voteOption } from "@/ultils/custom";
const { AiFillStar } = Icons;
function ModalRating({ setRating, handle, value, pid }: any) {
  const [choose, setChoose] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [payload, setPayload] = useState<any>({
    comment: "",
    star: "",
    pid: +pid,
  });
  const handleRatings = async () => {
    const rs = await Ratings(payload);
    if (rs.data.success) {
      Swal.fire("Thành Công!", rs.data.mes, "success").then(() => {
        setRating(false);
      });
    }
  };
  return (
    <div
      onClick={() => {
        setRating(false);
      }}
      className="z-50 animate-slide-bottom absolute flex text-black justify-center to items-center top-0 bottom-0 left-0 right-0  bg-black bg-opacity-60"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setRating(true);
        }}
        className="bg-white flex flex-col items-center gap-2 py-4 w-3/5"
      >
        <h2 className="text-lg font-medium my-3">Đánh giá sản phẩm</h2>
        <textarea
          value={payload?.comment}
          onChange={(e) =>
            setPayload((pre: any) => ({ ...pre, comment: e.target.value }))
          }
          className="border border-gray-400 p-2 w-[80%]"
          name=""
          id=""
        ></textarea>

        <h2>How do you like product ?</h2>
        <div className="flex items-center justify-center gap-6 w-full">
          {voteOption?.map((item) => (
            <div
              onClick={() => {
                if (choose === null) {
                  setChoose(item?.id);
                  setPayload((pre: any) => ({ ...pre, star: item?.id }));
                } else setChoose(null);
              }}
              key={item.id}
              className="flex flex-col text-center w-[9%] py-4 justify-center items-center gap-1 bg-gray-100 cursor-pointer"
            >
              {Number(choose) && choose >= item.id ? (
                <AiFillStar color="orange" />
              ) : (
                <AiFillStar color="gray" />
              )}
              <span className="w-full">{item.title}</span>
            </div>
          ))}
        </div>
        <Button
          Click={handleRatings}
          title={"Submit"}
          bgColor={"bg-red-600"}
          textColor={"text-white"}
          p={"py-2 px-36"}
          //   radius={"round-lg"}
        />
      </div>
    </div>
  );
}

export default memo(ModalRating);
