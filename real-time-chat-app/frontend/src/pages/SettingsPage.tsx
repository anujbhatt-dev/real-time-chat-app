import React from 'react'
import Theme from '../types'
import { useThemeStore } from '../store/useThemeStore'

type Props = {}

function SettingsPage({}: Props) {
  const {setThemeName} = useThemeStore()

  const previwItems = [
      
  ]
  return (
    <div className='flex justify-center items-center m-4'>

    <div className='grid gap-4 grid-cols-4 md:grid-cols-8'>
        {
          [
            "light",
            "dark",
            "cupcake",
            "bumblebee",
            "emerald",
            "corporate",
            "synthwave",
            "retro",
            "cyberpunk",
            "valentine",
            "halloween",
            "garden",
            "forest",
            "aqua",
            "lofi",
            "pastel",
            "fantasy",
            "wireframe",
            "black",
            "luxury",
            "dracula",
            "cmyk",
            "autumn",
            "business",
            "acid",
            "lemonade",
            "night",
            "coffee",
            "winter",
            "dim",
            "nord",
            "sunset",
          ].map((item,i)=>{
            return <div data-theme={item} className='bg-black/20 flex-col gap-1 rounded-md min-h-[4rem] min-w-[6rem] flex justify-center items-center capitalize cursor-pointer py-4 px-6' onClick={()=>setThemeName(item)}>
              <div className='flex justify-center items-center gap-1'>
              <p className='h-[2rem] w-[1rem] bg-primary'></p>
              <p className='h-[2rem] w-[1rem] bg-secondary'></p>
              <p className='h-[2rem] w-[1rem] bg-accent'></p>
              <p className='h-[2rem] w-[1rem] bg-neutral'></p>
              </div>
              <div className='text-gray-600'>{item}</div>
            </div>
          })
        }
    </div>
    </div>
  )
}

export default SettingsPage