/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import MenuNavigation from '@/component/menu'
import React, { useEffect, useState } from 'react'
import './locals.css'
import ProgramCard from '@/component/programCard'

type RoleType = {
  fullname : string
}

type ProkerType = {
  id_program:number,
  nama_program : string
  status : string
  notulensi_rapat: string
  ketua_pelaksana : RoleType
  sekertaris_pelaksana : RoleType
  sekertaris_pelaksana2 : RoleType
  bendahara_pelaksana : RoleType
  bendahara_pelaksana2 : RoleType
}
export default function page() {
  const [data,setData] = useState<ProkerType[]>([])
  const getData = async()=>{
  const response = await fetch('http://localhost:3001/programkerja',{method:"GET"})
  const data = await response.json();
  const settings = data.data
  setData(settings)
  }

  useEffect(()=>{
    getData()
  },[])
  const downloadNotulensi = async(id:number, judul:string)=>{
    const response = await fetch(`http://localhost:3001/notulensi-upload/download/${id}`,{
      method:"GET"
    })

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a')
    a.href = url;
    a.download = `${judul}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  return (
    <>
    {
      data.map((item : ProkerType,index : number)=>(
        <ProgramCard 
          key={index++}
          programKerja={item?.nama_program}
          ketuplak={item?.ketua_pelaksana?.fullname}
          sekertaris1={item?.sekertaris_pelaksana?.fullname}
          Sekertaris2={item?.sekertaris_pelaksana2?.fullname}
          bendahara1={item?.bendahara_pelaksana?.fullname}
          bendahara2={item?.bendahara_pelaksana2?.fullname}
          status={item?.status} 
          link={()=>downloadNotulensi(item?.id_program,item.nama_program)}/>
      ))
    }
    <MenuNavigation/>
    </>
  )
}
