import { ItemTable } from "./components/ItemTable";
import Modal from "./components/Modal";
import { FaSearch } from "react-icons/fa";

export default function AdminProductPage() {
  return (
    <main className="w-full min-h-screen flex flex-col px-[40px] gap-[20px]">
      <div className="w-full flex items-center gap-[10px] mt-[30px] border-b-2 p-1 border-neutral-500">
        <FaSearch size={16} />
        <input
          placeholder="제품 이름으로 검색"
          className="w-full focus:outline-none"
        />
      </div>
      <ItemTable />
      <Modal />
    </main>
  );
}
