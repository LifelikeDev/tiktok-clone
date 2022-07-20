import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { AppUser } from "../utils";

const undefinedUser: AppUser = {
    _id: "",
    _type: "user",
    userName: "",
    image: ""
};

const authStore = (set: any) => ({
  userProfile: undefinedUser,
  addUser: (user: AppUser) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: undefinedUser }),
});

const useAuthStore = create(persist(authStore, { name: "auth" }));

export default useAuthStore;
