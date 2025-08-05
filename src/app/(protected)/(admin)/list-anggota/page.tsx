/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { useEffect, useState } from 'react'
import './locals.css'
import MenuNavigation from '@/component/menu'
import MemberList from '@/component/member'
import MemberLoading from '@/component/member/memberLoading'
type UserData = {
  fullname: string;
  role: string;
};

export default function page() {
  const [data,setData] = useState<UserData[]>([])
  const [loading,setLoading] = useState<boolean>(false)
  const getData = async()=>{
    const response = await fetch('http://localhost:3001/users-accounts',{
      method:"GET",
      headers:{
        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        "Content-Type" : "application/json"
      }
    })
    if(!response.ok){
      const text = await response.text()
      console.error("Gagal fetch:",response.status, text)
      return
    }
    const datas = await response.json();
    setData(datas.data)
    setLoading(true)
    return
  }

  useEffect(()=>{
    getData()
  },[])

  return (
    <>
    <MenuNavigation/>
    <div className='flex gap-2 flex-col'>
    {loading ? 
   data.map((item,index)=>{
        return(
          <MemberList key={index++} nama={item.fullname} jabatan={item.role}/>
        )
      })
   :
   <>
      <MemberLoading/>
      <MemberLoading/>
      <MemberLoading/>
      <MemberLoading/>
      <MemberLoading/>
      <MemberLoading/>
      <MemberLoading/>
      <MemberLoading/>
      <MemberLoading/>
      <MemberLoading/>
      <MemberLoading/>
    
     </>
  }
    </div>
  </>
  )
}
