import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { AppUser } from "../utils";

import { BASE_URL } from "../utils";

const undefinedUser: AppUser = {
  _id: "",
  _type: "user",
  userName: "",
  image: "",
};

const authStore = (set: any) => ({
  userProfile: undefinedUser,
  allUsers: [],
  addUser: (user: AppUser) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: undefinedUser }),
  fetchAllUsers: async () => {
    const response = axios.get(`${BASE_URL}/api/users`);

    set({ allUsers: (await response).data });
  },
});

const useAuthStore = create(persist(authStore, { name: "auth" }));

export default useAuthStore;
