import React from 'react'
import { IMessage } from '../types'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'



function Message() {
const {messages} = useChatStore()
const {authUser} = useAuthStore()
  if(messages?.length===0) return <div className='h-full flex justify-center items-center font-semibold text-[1rem]'>  No conversation yet</div>
  return (
    <div>
        {messages?.map((message)=>(            
                <div className={`chat ${message.senderId===authUser?._id ? "chat-end" : "chat-start"} `}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div className="chat-header">                    
                <time className="text-xs opacity-50">
                  {new Date(message.createdAt).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </time>

                </div>
                <div className="chat-bubble">{message.text}</div>                
                </div>
            
        ))}
    </div>
  )
}

export default Message