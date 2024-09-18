import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utils/api";
import useUserStore from "../store/useUserStore";

export default function LoginPage() {
  const inputClassName =
    "w-[350px] border border-gray-300 py-1 pl-[10px] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const { setName, setEmail, setLevel } = useUserStore();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    try {
      const res = await loginUser(email, password);
      const { user, token } = res;

      setName(user.name);
      setEmail(user.email);
      setLevel(user.level);

      sessionStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your Email or Password again");
      console.error("Login failed", err);
    }
  };

  return (
    <main className="w-full h-[600px] flex flex-col justify-center items-center ">
      <div className="w-[400px] md:w-[600px] border shadow-sm p-[40px] rounded-lg">
        <h1 className="text-[30px] font-bold text-center mb-[50px]">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-[15px]"
        >
          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              required
              className={inputClassName}
            />
          </div>
          <div>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              required
              className={inputClassName}
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-[350px] text-[18px] bg-red-500 font-bold text-white py-[8px] rounded-3xl mt-[30px]"
          >
            Login
          </button>
        </form>
        <div className="flex justify-center mt-[20px] gap-[8px]">
          <p>Don't have an account?</p>
          <Link to="/register" className="text-blue-600 font-semibold">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
