import { Plus, Send, Text } from "lucide-react"
import Message from "./Message"
import { useChatStore } from "../store/useChatStore"
import SendMessage from "./SendMessage"
import { useAuthStore } from "../store/useAuthStore"

function Chat() {
  const {selectedUser} = useChatStore()
  const {onlineUsers} = useAuthStore()

  return (
    <div className="h-full relative overflow-hidden ">
        {/* Top header  */}
        <div className="bg-base-300 flex-grow sticky top-0 h-[4rem] p-1 flex flex-col">
        <div className='flex justify-between items-center gap-2 mb-2 p-1 px-2 rounded-md cursor-pointer '>

            <div className='h-[3rem] w-[3rem] rounded-full'>
                <img src={"/avatar.png"} alt="" />
            </div>
            <div className='flex-grow h-full flex flex-col justify-center'>
                <div className='capitalize font-bold'>
                    {selectedUser?.fullname}
                </div>
                <div className='text-[0.7rem]'>
                    
                    {selectedUser && onlineUsers.includes(selectedUser?._id)?<div className="text-green-600">online</div>:<div className="text-gray-400">offline</div>}
                </div>
            </div>                
        </div>
        </div>
        {/* Chat Container */}
        <div className="flex-grow p-1 px-4 my-1 bg-base-300 h-[calc(100%-8rem)] overflow-y-auto">
            <Message/>
        </div>
        {/* Editor */}
        <SendMessage/>
    </div>
  )
}

export default Chat