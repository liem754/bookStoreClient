"use client";

import { getcategory } from "@/apis/book";
import Slider from "@/components/Slider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [cate, setCate] = useState<any>();
  const router = useRouter();
  const fetch = async () => {
    const rs = await getcategory();
    if (rs.data.err === 0) {
      setCate(rs.data.categorys);
    }
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <main className="flex flex-col p-16 gap-20 bg-[#212121]">
      <div className="flex justify-between items-center text-white">
        <div className="flex flex-col  gap-5">
          <h2 className=" text-6xl font-medium">Book Store</h2>
          <h2 className=" text-2xl font-medium">
            Tất cả các loại sách đều có ở đây !
          </h2>
        </div>
        <h2 className=" text-5xl font-medium text-[#1bc804]">Hello World</h2>
      </div>
      <div className="flex justify-center items-center">
        <div className=" w-[80%] flex items-center justify-between gap-6">
          <div className="w-[15%] flex flex-col items-center gap-5">
            <img
              src="https://ninedev.net/img/eat.png"
              alt=""
              className="w-[80%]"
            />
            <h2 className="text-white">Eat()</h2>
          </div>
          <div className="w-[15%] flex flex-col items-center gap-5">
            <img
              src="https://ninedev.net/img/sleeping.png"
              alt=""
              className="w-[80%]"
            />
            <h2 className="text-white">Sleep()</h2>
          </div>
          <div className="w-[15%] flex flex-col items-center gap-5">
            <img
              src="https://ninedev.net/img/code.png"
              alt=""
              className="w-[80%]"
            />
            <h2 className="text-white">Code()</h2>
          </div>
          <div className="w-[15%] flex flex-col items-center gap-5">
            <img
              src="https://ninedev.net/img/repeat.png"
              alt=""
              className="w-[80%]"
            />
            <h2 className="text-white">Repeat()</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className=" w-[80%] text-white">
          Bạn là một người yêu thích cái đẹp, bạn muốn đem đến cho mọi người
          những trải nghiệm thật ấn tượng tại website của bạn, vậy thì hãy cùng
          mình trở thành một Frontend Developer chuyên nghiệp tự tin thực hiện
          những điều này nhé!
        </div>
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={() => router.push("/book")}
          className="bg-red-950 text-red-400 border border-red-400 border-b-4 font-medium overflow-hidden relative px-5 py-3 rounded-md hover:brightness-150 hover:border-t-4 hover:border-b active:opacity-75 outline-none duration-300 group"
        >
          <span className="bg-red-400 shadow-red-400 absolute -top-[150%] left-0 inline-flex w-80 h-[5px] rounded-md opacity-50 group-hover:top-[150%] duration-500 shadow-[0_0_10px_10px_rgba(0,0,0,0.3)]"></span>
          Xem Sách thôi nào
        </button>
      </div>
      <div className="flex flex-col justify-center  items-center gap-4 text-white my-6 z-50">
        <h2 className="text-2xl font-normal">Danh mục sách</h2>

        <div className=" flex justify-around w-[85%] ">
          {cate?.map((item: any) => (
            <h2
              className="text-lg border-x cursor-pointer px-3 inline-block hover:text-red-400"
              onClick={() => router.push("/book")}
              key={item.id}
            >
              {item.value}
            </h2>
          ))}
        </div>
        <div className="w-[85%]">
          <Slider />
        </div>
      </div>
      <div className="flex flex-col justify-center  items-center gap-7 text-white py-20 z-50 border-y-4">
        <h2 className="text-2xl font-normal">Lợi ích của việc đọc sách</h2>

        <div className=" flex gap-3 ">
          <div className=" flex flex-col gap-2">
            <h2 className="text-lg text-green-500">1. Mở rộng kiến thức</h2>
            <span>
              {" "}
              Đọc sách là một phương pháp học tập hiệu quả để tiếp thu kiến thức
              mới. Bằng cách đọc sách, bạn có thể khám phá những ý tưởng, thông
              tin và kiến thức mới trong các lĩnh vực khác nhau như khoa học,
              lịch sử, nghệ thuật, kinh doanh, v.v. Điều này giúp mở rộng kiến
              thức tổng quát và trở thành một người có tri thức đa dạng.
            </span>
          </div>
        </div>
        <div className="w-[85%] flex justify-center">
          <img
            src="https://readvii.com/wp-content/uploads/2020/07/sach-kien-thuc-pho-thong-cover.png"
            alt=""
          />
        </div>
        <div className=" flex gap-3 mt-10">
          <div className=" flex flex-col gap-2">
            <h2 className="text-lg text-green-500">
              2. Cải thiện sự tập trung và tăng cường kỹ năng tư duy, phân tích.
            </h2>
            <span>
              Khi đọc sách toàn bộ tâm trí và các giác quan của bạn đều dồn về
              đôi mắt theo dõi đọc từng chữ, từng dòng. Bàn tay lật lật từng
              trang giấy và trong đầu tập trung vào những kiến thức mà cuốn sách
              đang nhắc đến hay suy nghĩ theo dõi diễn biến tiếp theo của câu
              truyện mà không cần phải quan tâm tới mọi thứ xung quanh, chỉ cần
              bộ não và mắt hoạt động. Với những cuốn sách hay bổ ích về lĩnh
              vực bạn quan tâm, bạn đọc ngấu nghiến từng trang từng trang không
              rời mắt, đây là cách rèn luyện được sự tập trung cao độ của trí óc
              đồng thời bản thân mình cũng đang vừa đọc vừa tư duy, phân tích
              theo diễn biến câu chuyện. Chính vì vậy thời gian theo dõi đọc một
              cuốn sách hay cũng là khoảng thời gian bạn đang rèn luyện sự tập
              trung và khả năng tư duy phân tích của bản thân rất tốt.
            </span>
          </div>
        </div>
        <div className="w-[85%] flex justify-center">
          <img
            src="https://thaipham.live/wp-content/uploads/2019/01/loi-ich-doc-sach-happy-live.jpg"
            alt="phan tich"
          />
        </div>
        <div className=" flex gap-3 mt-10">
          <div className=" flex flex-col gap-2">
            <h2 className="text-lg text-green-500">
              3. Vốn từ ngữ được mở rộng thông qua việc đọc sách.
            </h2>
            <span>
              Vốn từ của bản thân nhiều lên, giao tiếp nói chuyện với mọi người
              một cách hoạt ngôn cởi mở và cuốn hút là một trong những lợi ích
              tuyệt vời mà việc đọc sách mang lại. Tri thức trong sách được diễn
              đạt rất xúc tích, logic dễ hiểu và không kém phần thu hút cho
              người đọc. Nên khi đọc càng nhiều bạn sẽ có thêm càng nhiều kiến
              thức và học được cách diễn đạt, kể chuyện logic thu hút người nghe
              nhờ khả năng tư duy với vốn từ ngữ phong phú ấn tượng. Đồng thời
              khả năng viết cũng tiến bộ rõ rệt đấy.
            </span>
          </div>
        </div>
        <div className="w-[85%] flex justify-center">
          <img
            src="https://elite-symbol.com/wp-content/uploads/2018/08/docsach.jpg"
            alt="phan tich"
          />
        </div>
        <div className=" flex gap-3 mt-10">
          <div className=" flex flex-col gap-2">
            <h2 className="text-lg text-green-500">4. Cải thiện trí nhớ.</h2>
            <span>
              Khi bạn đọc sách, bạn phải ghi nhớ các nhân vật, thông tin về họ,
              hoài bão, lịch sử, sắc thái hay các tình tiết hình thành nên lối
              sống qua mỗi câu chuyện. Có thể là hơi nhiều nhưng dần dần não bộ
              sẽ ghi nhớ được hết nhờ sự rèn luyện theo thời gian. Giống như một
              thói quen, lặp đi lặp lại nhiều lần bạn sẽ quen ngay với việc ghi
              nhớ thôi mà. Rất kì diệu, mỗi ký ức mới sẽ khiến não tạo ra nếp
              nhăn mới và củng cố nếp nhăn cũ, hỗ trợ việc nhớ lại và cân bằng
              cảm xúc. Thật thú vị phải không?
            </span>
          </div>
        </div>
        <div className="w-[85%] flex justify-center">
          <img
            src="https://www.reader.com.vn/uploads/news/187620570_nhng_cun_sach_danh_cho_ngi_mi_bt_u.jpg"
            alt="phan tich"
          />
        </div>
      </div>
    </main>
  );
}
