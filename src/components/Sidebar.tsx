import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleMenu = (url: string) => {
    setShow(false);
    navigate(url);
  };

  return (
    <main className="bg-slate-50 w-[250px] min-h-screen shadow-md flex flex-col px-[30px] pt-[100px] font-bold">
      <Link to="/" className="text-[40px] mb-[30px]">
        Levi
      </Link>
      <h1 className="text-[25px] mb-[40px]">Admin Account</h1>
      <ul className="text-[20px] flex flex-col gap-[20px]">
        <li
          onClick={() => handleMenu("/admin/product?page=1")}
          className="w-[200px] py-[5px] flex justify-center items-center rounded-lg cursor-pointer hover:bg-neutral-200"
        >
          product
        </li>
        <li
          onClick={() => handleMenu("/admin/order?page=1")}
          className="w-[200px] py-[5px] flex justify-center items-center rounded-lg cursor-pointer hover:bg-neutral-200"
        >
          order
        </li>
      </ul>
    </main>
  );
}
