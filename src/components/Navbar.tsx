import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const buttonClassName = "hover:bg-neutral-300 p-[6px] rounded-lg font-semibold";

export default function Navbar() {
  const { name, email, level, resetUser } = useUserStore();
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("user-storage");
    resetUser(); // 상태 리셋
    navigate("/login");
  };

  return (
    <nav className="bg-neutral-300 bg-opacity-50 w-full h-[60px] flex justify-between items-center px-[20px]">
      <div className={buttonClassName}>Levi</div>
      <div>Shopping-Mall</div>
      <div className="flex items-center gap-[20px]">
        <div>{name && <h1>{name}님</h1>}</div>
        {level === "admin" && (
          <Link to="/admin" className="text-blue-600">
            AdminPage
          </Link>
        )}
        {name ? (
          <button onClick={logout} className={buttonClassName}>
            LOGOUT
          </button>
        ) : (
          <Link to="/login" className={buttonClassName}>
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
}
