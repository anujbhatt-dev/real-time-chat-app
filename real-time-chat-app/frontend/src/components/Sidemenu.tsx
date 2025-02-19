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
    <div className='h-[calc(100vw-4rem)] w-[20rem] p-4'>
        {users?.map((user)=>(
            <div key={user.email} className='flex justify-between items-center gap-2 mb-2 p-1 px-2 bg-zinc-900/50 rounded-md'>

                <div className='h-[4rem] w-[4rem] rounded-full'>
                    {user.profilePic ?<img src={user.profilePic} alt="" />: <>no img</>}
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