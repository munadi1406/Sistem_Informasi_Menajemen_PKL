import { create } from "zustand";

export const useToken = create((set) => ({
  accessToken: "",
  setAccessToken: (at) => set({ accessToken: at }),
  refreshToken: "",
  setRefreshToken: (rt) => set({ refreshToken: rt }),
}));


export const useDataUser = create((set) => ({
  idUsers: '',
  setIdUsers: (id) => set({ idUsers: id }),
  username: "",
  setUsername: (u) => set({ username: u }),
  role: "",
  setRole: (r) => set({ role: r }),
}));
