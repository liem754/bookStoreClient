import { memo, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
// import {
//   createSearchParams,
//   useLocation,
//   useNavigate,
//   useParams,
//   useSearchParams,
// } from "react-router-dom";
function PagiItem({ item }: { item: any }) {
  // const navigate = useNavigate();
  // const { category } = useParams();
  const param = usePathname();
  const router = useRouter();
  const params: any = useSearchParams();
  const [focus, setFocus] = useState("");
  // const location = useLocation();
  const handlePagination = () => {
    const queries = Object.fromEntries([...params]);
    if (Number(item)) queries.page = item;
    if (params.has("q")) {
      const paramss = new URLSearchParams();
      paramss.append("q", params.get("q"));
      paramss.append("page", item);

      const search = paramss.toString();
      const url = `${param}?${search}`;
      router.push(url);
    } else {
      const paramss = new URLSearchParams();
      paramss.append("page", item);
      const search = paramss.toString();
      const url = `${param}?${search}`;
      router.push(url);
    }
  };

  return (
    <button
      onClick={() => handlePagination()}
      className={`py-2 px-4 bg-gray-100 text-black rounded-sm hover:bg-gray-300 border border-black ${
        +params.get("page") === +item && "bg-red-400 border-black"
      } ${
        !+params.get("page") &&
        +item === 1 &&
        "bg-red-400 border-black px-[18px]"
      }`}
    >
      {item}
    </button>
  );
}

export default memo(PagiItem);
