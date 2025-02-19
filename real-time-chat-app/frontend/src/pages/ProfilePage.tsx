import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

type Props = {}

function ProfilePage({}: Props) {
  const {authUser} = useAuthStore()
  return (
    <div className='h-[calc(100vh-4rem)] flex justify-center items-center flex-col gap-y-4'> 
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <input disabled type="text" placeholder={authUser?.fullname} className="input input-bordered w-full max-w-xs" />
          <input disabled type="email" placeholder={authUser?.email} className="input input-bordered w-full max-w-xs" />
    </div>
  )
}

export default ProfilePage