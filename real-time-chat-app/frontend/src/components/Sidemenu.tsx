import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'

type Props = {}

function Sidemenu({}: Props) {
const {users, isUserLoading, getUsers} = useChatStore()

  useEffect(()=>{
    getUsers()
    
  },[getUsers])
  
  if(isUserLoading) return <div>Loading...</div>

  return (
    <div className='h-[calc(100vw-4rem)] w-[20rem] p-4  border-r border-black'>
        {users?.map((user)=>(
            <div key={user.email} className='flex justify-between items-center gap-2 mb-2 p-1 px-2 rounded-md  border-b border-black/50 cursor-pointer'>

                <div className='h-[4rem] w-[4rem] rounded-full'>
                    {user.profilePic ?<img src={user.profilePic || "/avatar.png"} alt="" />: <img src={"/avatar.png"} alt="" />}
                </div>
                <div className='flex-grow h-full'>
                    <div className='capitalize font-bold'>
                        {user.fullname}
                    </div>
                    <div className=''>
                        {user.isActive}
                    </div>
                </div>                
            </div>
        ))}
    </div>
  )
}

export default Sidemenu