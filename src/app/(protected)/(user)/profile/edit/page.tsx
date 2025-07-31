/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useRef, useState,useReducer, ChangeEvent } from 'react'
import '../locals.css'
import MenuNavigation from '@/component/menu'
import ProfileSkeleton from '@/component/profile/loading'

type DataProfile = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
  role: string;
  birth_date: string;
  departement: string;
  image: string;
}


const initialState : DataProfile= {
    username: "",
    fullname: "",
    image: "",
    address: "",
    birth_date: "",
    gender: "",
    email: '',
    password: '',
    phone: '',
    role: '',
    departement: ''
}

type ActionType = 
{type:"username", payload: string}|
{type:"fullname",payload: string}|
{type:"image", payload:string}|
{type:"birth_date", payload:string}|
{type:"gender",payload:string}|
{type:"address",payload:string}|
{type:"phone",payload:string}

const reducer = (state : DataProfile, action : ActionType)=>{
    switch(action.type){
        case "username":
            return {...state, username:action.payload} 
        case "fullname":
            return {...state, fullname:action.payload}
        case "image":
            return {...state, image:action.payload}
        case "address":
            return {...state, address:action.payload}
        case "birth_date":
            return {...state, birth_date:action.payload}
        case "gender":
            return {...state, gender:action.payload}
        case "phone":
            return {...state, phone:action.payload}
        default:
            return state
    }
}


export default function Page() {
  const [profile, setProfile] = useState<DataProfile | null>(null)
  const idref = useRef<HTMLInputElement>(null)
  const [state, dispatch] = useReducer(reducer,initialState)
  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token')
      if(!token){
        window.location.href = "/auth/login"
      }
    
      const id = localStorage.getItem('id')
      const response = await fetch(`http://localhost:3001/dashboard/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      })
      
      const data = await response.json()
      setProfile(data.data)
    
    dispatch({ type: "username", payload: data.data.username })
    dispatch({ type: "fullname", payload: data.data.fullname })
    dispatch({ type: "birth_date", payload: data.data.birth_date })
    dispatch({ type: "address", payload: data.data.address })
    dispatch({ type: "gender", payload: data.data.gender })
    dispatch({ type: "phone", payload: data.data.phone })
    dispatch({ type: "image", payload: data.data.image })

    }
    getUserProfile()
  }, [])

  if(profile === null){
    return(
      <ProfileSkeleton/>
    )
  }

  const openBrowser = ()=>{
    if(idref.current){
        idref.current.click();
    }
  }
  const changeProfile = (e : ChangeEvent<HTMLInputElement>)=>{
    const file = e.target.files?.[0];
    if(file){
        const reader = new FileReader();
        reader.onloadend = ()=>{
            if(typeof reader.result === 'string'){
                dispatch({type:"image",payload:reader.result})
            }
        }
        reader.readAsDataURL(file)
    }
  }
  const handleChange = (field: keyof DataProfile, value: string) => {
    dispatch({ type: field as any, payload: value })
}
  return (
    <>
    <div className='min-h-screen'>
      <div className='bg-white w-full h-1/2 max-w-3xl p-6 mx-auto my-4 rounded-lg shadow-lg mt-10'>
        <h1 className='text-cyan-500 font-extrabold text-4xl text-center mb-6 underline'>
          Profile
        </h1>

        <div className='flex justify-center mb-6'>
          <input type="file"
           accept='.jpg,.png,.jpeg' 
           className='hidden' 
           onChange={changeProfile}
           ref={idref}/>
          <img
            onClick={openBrowser}
            className='rounded-full border-4 border-cyan-300'
            src={state.image ? state.image :'https://i.pinimg.com/736x/bf/cb/e0/bfcbe08c8971f63b7d62bab4bb121786.jpg'}
            alt='profile'
            width={200}
          />
        </div>

        {profile && (
          <div className='text-start text-cyan-700 text-lg space-y-2 px-4'>
            <h1 className='text-xl border-b-2 w-52'><strong>Umum</strong></h1>
            <div className='p-2 mx-4 flex flex-col gap-2'>
            <p><strong>Username:</strong>  <input type="text" onChange={(e)=>handleChange("username",e.target.value)} value={state.username? state.username : ""} className='border p-1 rounded-md' /></p>
            <p><strong>Fullname:</strong> <input type="text" onChange={(e)=>handleChange("fullname",e.target.value)} value={state.fullname? state.fullname : ""} className='border p-1 rounded-md' /></p>
            <p className='flex gap-1'><strong>Email:</strong> {state.email? state.email : ""} <p className="text-red-600 text-sm"> *email tidak bisa diubah!</p></p>
            <p><strong>Address:</strong> <input onChange={(e)=>handleChange("address",e.target.value)} type="text" value={state.address? state.address : ""} className='border p-1 rounded-md'/></p>
            <p><strong>Birth:</strong> <input onChange={(e)=>handleChange("birth_date",e.target.value)} type="date" value={state.birth_date? state.birth_date : ""} className='border p-1 rounded-md'/></p>
            <p><strong>Phone:</strong> <input onChange={(e)=>handleChange("phone",e.target.value)} type="text" value={state.phone? state.phone: ""} className='border p-1 rounded-md'/></p>
            <p><strong>Gender:</strong> <input onChange={(e)=>handleChange("gender",e.target.value)} type="text" value={state.gender? state.gender : ""} className='border p-1 rounded-md'/></p>
            </div>

            <h1 className='text-xl border-b-2 w-72 flex gap-2'><strong>Organization</strong> <p className='text-red-600 text-sm'>*Organisasi Tidak Bisa Diubah!</p></h1>
            <div className='p-2 mx-4 flex flex-col gap-2'>
            <p><strong>Department:</strong>{profile?.departement || ""}</p>
            <p><strong>Role:</strong>{profile?.role || ""}</p>
            <p><strong>Program Kerja :</strong></p>
            <table className='text-center mx-auto my-4 rounded-md'>
              <thead className=''>
                <tr>             
                <th className='p-2 border font-bold text-white border-cyan-700 bg-cyan-400'>Nama Program</th>
                <th className='p-2 border font-bold text-white border-cyan-700 bg-cyan-400'>Keterangan</th>
                <th className='p-2 border font-bold text-white border-cyan-700 bg-cyan-400'>Status</th>
              </tr>

              </thead>
              <tbody>
                <tr>
                <td className='p-2 border'>Dies Natalis</td>
                <td className='p-2 border'>Seksi Perlengkapan</td>
                <td className='p-2 border'>Selesai!</td>
                </tr>
              
                <tr>
                <td className='p-2 border'>HIMNEC-Mikrotik</td>
                <td className='p-2 border'>Peserta</td>
                <td className='p-2 border'>On-Progress!</td>
              
                </tr>
                <tr>
                <td className='p-2 border'>FAST/ITCOMPETITION</td>
                <td className='p-2 border'>Seksi Acara</td>
                <td className='p-2 border'>On-Progress!</td>
                </tr>

              </tbody>
            </table>
            </div>
          </div>
        )}

        {!profile && (
          <p className='text-center text-gray-500 mt-4'>Loading profile...</p>
        )}
  
        <div className='flex  gap-5  justify-end'>
          <button onClick={()=> window.location.href ="/profile"} className='bg-red-400 p-3 w-52 shadow-2xl rounded-md'>Cancel</button>
          <button className='bg-green-400 p-3 w-52 shadow-2xl rounded-md'>Simpan</button>
        </div>
      </div>
    </div>
      <MenuNavigation />
    </>
  )
}
