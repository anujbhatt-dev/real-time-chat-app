import { create } from "zustand"
import { IMessage, IUser } from "../types"
import axiosInstance from "../lib/axios"


type ChatI = {
    messages:IMessage[] | null
    users: IUser[] | null
    selectedUser:IUser | null
    isUserLoading: boolean
    isMessagesLoading: boolean,    
}

type ChatAcions = {
    getUsers: ()=>void
    getMessages: (userToChatId:string)=>void
    setSelectedUser: (user:IUser) => void
    sendMessage: (id:string) => void
}


export const useChatStore = create<ChatI & ChatAcions>((set,get)=>({
    messages:null,
    users: null,
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () =>{
        try {
            const res = await axiosInstance.get("/messages/users")
            console.log(res.data.users);
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
    },

    setSelectedUser: async (user)=>{
            set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${user._id}`)
            console.log(res.data.messages);            
            set({messages:res.data.messages, selectedUser:user})            
        } catch (error) {
            console.error("Error while fetch conversation:", error);
        } finally {
            set({isMessagesLoading:false})
        }
    },

    sendMessage: async (text:string)=>{
        const {selectedUser} =get()
        set({isMessagesLoading:true})        
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser?._id}`,{
                text
            })            
            set({})            
        } catch (error) {
            console.error("Error while fetch conversation:", error);
        } finally {
            set({isMessagesLoading:false})
        }
    },

}))