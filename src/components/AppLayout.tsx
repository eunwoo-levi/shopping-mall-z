import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { getUserData } from "../utils/api";
import { useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import useUserStore from "../store/useUserStore";

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { setName, setEmail, setLevel } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          // loginWithToken
          const data = await getUserData();
          if (data.status === "success") {
            setName(data.user.name);
            setEmail(data.user.email);
            setLevel(data.user.level);
          }
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      {location.pathname.includes("admin") ? (
        <section className="w-full min-h-screen flex">
          <Sidebar />
          {children}
        </section>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </div>
  );
}
