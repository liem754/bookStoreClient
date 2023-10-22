function Header() {
  return (
    <div className="flex flex-col justify-center items-center py-3 border-b">
      <div className="w-4/5 flex items-center justify-between ">
        <h2 className=" text-2xl font-bold">LOGO</h2>
        <div className="flex items-center gap-2">
          <button className=" outline-none border-none py-2 px-6 text-white bg-black rounded-md">
            Đăng ký
          </button>
          <button className=" outline-none border-none py-2 px-6 text-white bg-black rounded-md">
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
