import { create } from "zustand"
import { IMessage, IUser } from "../types"
import axiosInstance from "../lib/axios"


type ChatI = {
    messages:IMessage[] | null
    users: IUser[] | null
    selectedUser:string | null
    isUserLoading: boolean
    isMessagesLoading: boolean
}

type ChatAcions = {
    getUsers: ()=>void
    getMessages: (userToChatId:string)=>void
}


export const useChatStore = create<ChatI & ChatAcions>((set)=>({
    messages:null,
    users: null,
    selectedUser: null,
    isUserLoading: true,
    isMessagesLoading: false,

    getUsers: async () =>{
        try {
            const res = await axiosInstance.get("/messages/users")
            set({users:res.data.users})
        } catch (error) {
            console.error("Error while checking auth:", error);
        } finally {
            set({isUserLoading:false})
        }
        
    },


    getMessages: async (userToChatId) => {
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userToChatId}`)
            set({messages:res.data})
        } catch (error) {
            console.error("Error while checking auth:", error);
        } finally {
            set({isMessagesLoading:false})
        }
    }



}))