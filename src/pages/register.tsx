import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import { registerUser } from "../utils/api";

export default function RegisterPage() {
  const inputClassName =
    "w-[350px] border border-gray-300 py-1 pl-[10px] rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    policy: false,
  });

  const { setName, setEmail } = useUserStore();

  const [passwordError, setPasswordError] = useState("");
  const [policyError, setPolicyError] = useState(false);
  const navigate = useNavigate();

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");
    setPolicyError(false);

    const { name, email, password, confirmPassword, policy } = formData;

    const checkConfirmPassword = password === confirmPassword;
    if (!checkConfirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (!policy) {
      setPolicyError(true);
      return;
    }

    setName(name);
    setEmail(email);

    try {
      await registerUser(name, email, password);
      setName(name);
      setEmail(email);

      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <main className=" w-full h-[600px] flex flex-col items-center mt-[40px]">
      <div className="w-[400px] md:w-[600px] border shadow-sm p-[40px] rounded-lg">
        <h1 className="text-[30px] font-bold text-center mb-[40px]">
          Register
        </h1>
        <form
          onSubmit={onRegister}
          className="flex flex-col items-center gap-[25px]"
        >
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Username"
              className={inputClassName}
              required
            />
          </div>
          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Email"
              className={inputClassName}
              required
            />
          </div>
          <div>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              placeholder="Password"
              className={inputClassName}
              required
            />
          </div>
          <div>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="Confirm Password"
              className={inputClassName}
              required
            />
          </div>
          {passwordError && <p className="text-red-600">{passwordError}</p>}
          <div className="w-[350px] flex justify-start gap-[10px]">
            <input
              name="policy"
              checked={formData.policy}
              onChange={handleChange}
              type="checkbox"
            />
            <p>이용약관에 동의합니다.</p>
          </div>
          {policyError && (
            <p className="text-red-600">
              You must agree to the terms and conditions.
            </p>
          )}
          <button
            type="submit"
            className="w-[350px] text-[18px] bg-red-500 font-bold text-white py-[8px] rounded-3xl mt-[30px]"
          >
            Register
          </button>
        </form>
        <div className="flex justify-center mt-[20px] gap-[8px]">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}
