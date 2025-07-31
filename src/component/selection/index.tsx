import React, { ChangeEvent, ReactNode, useRef } from 'react'

export default function Selection({name,changed,id,valued,children,textfor}:{changed:(e : ChangeEvent<HTMLSelectElement>)=>void,valued:string,textfor:string,name:string,id:string,children:ReactNode}) {
  const refId = useRef<HTMLInputElement | null>(null)
  
  const focusRef = ()=>{
    if(refId.current){
        refId.current.focus()
    }
  }
    return (
    <div>
            <div onClick={focusRef} className="text-gray-800 border border-gray-400 p-3 rounded flex items-center gap-4">
            <label htmlFor={name} className="text-gray-600">{textfor}</label>
            <select name={name} onChange={changed} value={valued} id={id} className="border rounded p-2 border-gray-400 w-full">
                {children}
            </select>
            </div>
    </div>
  )
}
