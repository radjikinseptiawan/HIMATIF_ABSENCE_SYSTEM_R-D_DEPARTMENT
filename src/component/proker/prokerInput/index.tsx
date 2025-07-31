"use client"
import React, { ChangeEvent } from 'react'

export default function CreateProker({value,children,title,nameFor,selected,onChanged}:{selected : (e : ChangeEvent<HTMLSelectElement>)=>void,
  title:string,nameFor:string,children:React.ReactNode,value:number | string,onChanged : (e:ChangeEvent<HTMLSelectElement>)=> void}) {
  return (
    <>
    <label htmlFor={nameFor}>{title}</label>   
        <select onChange={onChanged} value={value} name={nameFor} id={nameFor} onSelect={selected} className='border p-2 rounded-md'>
            {
                children
            }
        </select>
  </>
  )
}
