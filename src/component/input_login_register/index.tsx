"use client"
/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, useRef } from "react";

type DataProps = {
  changeController : (e : ChangeEvent<HTMLInputElement>)=>void,
  valued : string,
  props : string, 
  type:string, 
  dbName :string, 
  icon:string,
  action:()=>void
}

export default function Input({ props, valued,type,icon ,action,dbName,changeController }: DataProps) {
  const refId = useRef<HTMLInputElement | null>(null)
  
  const focused = ()=>{
    if(refId.current){
        refId.current.focus();
    }
  }

    return (
            <div onClick={()=>{
              focused()
              }} className='border flex flex-col p-2 rounded  border-gray-400'>
                <label htmlFor={props} className='text-gray-600 hover:cursor-pointer'>{props}</label>
                <div className='flex gap-1'>
                <input ref={refId} value={valued} type={type} className='text-black border-b w-full border-gray-400' onChange={changeController} name={dbName} id={props} />
                <button className='text-center p-2' type="button"  onClick={action}>
                    {
                    icon && icon.length > 0 &&
                    <img  src={`/${icon}`} className='mx-auto' width={20} alt="" />
                    }
                </button>
                </div>
            </div>
  )
}
