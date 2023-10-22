"use client";
import { memo } from "react";
import usePagination from "../hooks/usePagination";
import PagiItem from "./pagiItem";
import { useSearchParams } from "next/navigation";

function Pagination({
  totalCount,
  pageSize,
}: {
  totalCount: number;
  pageSize: number;
}) {
  const params: any = useSearchParams();
  const pagination = usePagination(
    totalCount,
    +params.get("page") || 1,
    1,
    pageSize
  );
  const range = () => {
    const curentPage = +params.get("page");
    const start = (curentPage - 1) * pageSize + 1;
    const end = Math.min(curentPage * pageSize, totalCount);
    return `Shows product ${start} to ${end} of ${totalCount}`;
  };

  return (
    <div className="flex justify-between items-center">
      {!+params.get("page") ? (
        <span className="text-md italic">
          {`Shows product 1 to ${
            totalCount < 10 ? totalCount : pageSize
          } of ${totalCount}`}
        </span>
      ) : (
        <span className="text-md italic">{range()}</span>
      )}
      <div className="w-[30%] flex items-center justify-end gap-2 text-center">
        {pagination?.map((el: any) => (
          <PagiItem key={el} item={el} />
        ))}
      </div>
    </div>
  );
}

export default memo(Pagination);
