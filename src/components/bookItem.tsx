import { book } from "@/types/book";
import { formatCurrencyVND } from "@/ultils/custom";
import { type } from "os";

const BookItem = ({
  title,
  author,
  category,
  publicationYear,
  description,
  price,
  quantity,
  images,
}: book) => {
  return (
    <div className=" border shadow-lg rounded-md h-[655px] ">
      <div className="w-full h-[350px]">
        <img src={images} alt="" className=" w-full h-full rounded-md" />
      </div>
      <div className=" p-3 flex flex-col gap-4">
        <h2 className=" text-2xl font-semibold text-center line-clamp-2 overflow-ellipsis pb-2 border-b">
          {title}
        </h2>
        <h2 className=" text-lg font-medium line-clamp-1 overflow-ellipsis ">{`Tác giả: ${author}`}</h2>
        <h2 className=" text-lg font-medium">{`Giá: ${formatCurrencyVND(
          price
        )}`}</h2>
        <h2 className=" text-lg font-medium">{`Năm phát hành: ${publicationYear}`}</h2>
        <h2 className=" text-lg font-medium">{`Thể loại: ${category}`}</h2>
      </div>
    </div>
  );
};

export default BookItem;
