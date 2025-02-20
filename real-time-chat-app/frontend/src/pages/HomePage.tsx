import Chat from '../components/Chat'
import NoChatSelected from '../components/NoChatSelected'
import Sidemenu from '../components/Sidemenu'
import { useChatStore } from '../store/useChatStore'

type Props = {}

function HomePage({}: Props) {
  const {selectedUser} = useChatStore()
  console.log(selectedUser);
  
  return (
    <div className='p-[3rem] h-full rounded-lg overflow-hidden' >

    <div className='flex h-[calc(100%-4rem)] bg-base-200 '>
          <Sidemenu/>
          <div className='flex-grow w-[calc(100%-20rem)]'>

          {!selectedUser ? <NoChatSelected/> : <Chat/>}
          </div>

    </div>
    </div>
  )
}

export default HomePage