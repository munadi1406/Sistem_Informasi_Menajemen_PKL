import { create } from "zustand";

export const useToken = create((set) => ({
  accessToken: "",
  setAccessToken: (at) => set({ accessToken: at }),
  refreshToken: "",
  setRefreshToken: (rt) => set({ refreshToken: rt }),
}));

export const useDataUser = create((set) => ({
  idUsers: "",
  setIdUsers: (id) => set({ idUsers: id }),
  username: "",
  setUsername: (u) => set({ username: u }),
  role: "",
  setRole: (r) => set({ role: r }),
}));

export const useAlertNotification = create((set) => ({
  open: false,
  setOpen: (isOpen) => set({ open: isOpen }),
  status: false,
  setStatus: (status) => set({ status }),
  msg: "",
  setMsg: (msg) => set({ msg }),
}));

export const useKepsekImage = create((set) => ({
  imageL: "",
  setImage: (image) => set({ image }),
}));

export const useMoveComponent = create((set) => ({
  x: 50,
  setX: (x) => set({ x }),
  y: 50,
  setY: (y) => set({ y }),
  xKepsek: 200,
  setXKepsek: (xKepsek) => set({ xKepsek }),
  yKepsek: 100,
  setYKepsek: (yKepsek) => set({ yKepsek }),
  xKepel: 100,
  setXKepel: (xKepel) => set({ xKepel }),
  yKepel: 100,
  setYKepel: (yKepel) => set({ yKepel }),
  xQrCode: 150,
  setXQrCode: (xQrCode) => set({ xQrCode }),
  yQrCode: 150,
  setYQrCode: (yQrCode) => set({ yQrCode }),
}));

