import { create } from "zustand";


const AuthStore = create((set,get)=>({
     authUser:null,
     isLoading:false,
     isSigningup:false,
     isLoggingIn:false,
     
}))