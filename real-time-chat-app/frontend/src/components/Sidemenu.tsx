import { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { MessageCircle } from 'lucide-react'

type Props = {}

function Sidemenu({}: Props) {
const {users, isUserLoading, getUsers, setSelectedUser} = useChatStore()

  useEffect(()=>{
    
    getUsers()
    
  },[getUsers])
  
  if(isUserLoading) return <div>Loading...</div>

  return (
    <div className='h-full w-[25rem]  border-r border-black/30'>
        <div className='p-4  flex items-center mx-3 justify-between text-[1.1rem] font-bold'>
            <MessageCircle className="text-blue-500" size={32}/> Chatty
        </div>
        <div className='mx-6 text-accent items-center flex gap-x-2 flex-row-reverse'>
            <span className='inline-block h-[1rem] w-[1rem] border border-accent rounded'></span>
            show online users
        </div>
        {users?.map((user)=>(
            <div onClick={()=>setSelectedUser(user)} key={user.email} className='flex justify-between items-center gap-2 mb-2 p-1 px-2 border-b border-black/30 cursor-pointer'>

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