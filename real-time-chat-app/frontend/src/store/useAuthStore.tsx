import { create } from "zustand";
import axiosInstance from "../lib/axios";

type User = {
  fullname: string;
  email: string;
  password: string;
};

type AuthState = {
  authUser: User | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth:boolean
};

type AuthActions = {
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setUpdatingProfile: (isUpdating: boolean) => void;
  setSigningUp: (isSigning: boolean) => void;
  setLoggingIn: (isLogging: boolean) => void;
//   setCheckingAuth: ()=>void
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth:true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error while checking auth:", error);
    } finally{
      set({isCheckingAuth:false})
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      set({ authUser: null });
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  },

  setUpdatingProfile: (isUpdating) => set({ isUpdatingProfile: isUpdating }),
  setSigningUp: (isSigning) => set({ isSigningUp: isSigning }),
  setLoggingIn: (isLogging) => set({ isLoggingIn: isLogging }),
  
}));
