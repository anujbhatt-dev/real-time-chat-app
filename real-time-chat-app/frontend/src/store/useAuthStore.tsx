import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { IUser } from "../types";
import { io, Socket } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BASE_URL || ""

type User = IUser

type AuthState = {
  authUser: User | null;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth:boolean
  socket:Socket | null
  onlineUsers: string[] 
};

type AuthActions = {
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setUpdatingProfile: (isUpdating: boolean) => void;
  setSigningUp: (isSigning: boolean) => void;
  setLoggingIn: (isLogging: boolean) => void;
  connectSocket : () => void;
  disconnectSocket : () => void;
//   setCheckingAuth: ()=>void
};

export const useAuthStore = create<AuthState & AuthActions>((set,get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningUp: false,
  isUpdatingProfile: false,
  isCheckingAuth:true,
  socket:null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.error("Error while checking auth:", error);
    } finally{
      set({isCheckingAuth:false})
    }
  },

  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  },

  setUpdatingProfile: (isUpdating) => set({ isUpdatingProfile: isUpdating }),
  setSigningUp: (isSigning) => set({ isSigningUp: isSigning }),
  setLoggingIn: (isLogging) => set({ isLoggingIn: isLogging }),
  
  connectSocket: ()=>{
    const {authUser} = get()
    if(!authUser || get().socket?.connected) return
    const socket = io(BASE_URL,{
      query:{
        userId:authUser._id
      }
    })
    socket.connect()
    set({socket})
    socket.on('getOnlineUsers',(userIds)=>{  
        console.log("Online users "+userIds);
              
        set({onlineUsers:userIds})
    })
  },

  disconnectSocket:()=>{
    const  {socket} = get()
    if(socket?.connected){
      socket.disconnect()
      set({socket:null})
    } 
  
  }
}));
