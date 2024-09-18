import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserProps {
  name: string;
  email: string;
  level: string;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setLevel: (level: string) => void;
  resetUser: () => void;
}

const useUserStore = create(
  persist<UserProps>(
    (set) => ({
      name: "",
      email: "",
      level: "customer",
      setName: (name: string) => set({ name }),
      setEmail: (email: string) => set({ email }),
      setLevel: (level: string) => set({ level }),
      resetUser: () => set({ name: "", email: "", level: "customer" }),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useUserStore;
