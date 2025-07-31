import MenuNavigation from '@/component/menu'
import React from 'react'
import './locals.css'
import ProgramCard from '@/component/programCard'

type RoleType = {
  fullname : string
}

type ProkerType = {
  nama_program : string
  status : string
  notulensi_rapat: string
  ketua_pelaksana : RoleType
  sekertaris_pelaksana : RoleType
  sekertaris_pelaksana2 : RoleType
  bendahara_pelaksana : RoleType
  bendahara_pelaksana2 : RoleType
}
export default async function page() {
  
  const response = await fetch('http://localhost:3001/programkerja',{method:"GET"})
  const data = await response.json();
  const settings = data.data
  return (
    <>
    {
      settings.map((item : ProkerType,index : number)=>(
        <ProgramCard 
          key={index++}
          programKerja={item?.nama_program}
          ketuplak={item?.ketua_pelaksana?.fullname}
          sekertaris1={item?.sekertaris_pelaksana?.fullname}
          Sekertaris2={item?.sekertaris_pelaksana2?.fullname}
          bendahara1={item?.bendahara_pelaksana?.fullname}
          bendahara2={item?.bendahara_pelaksana2?.fullname}
          status={item?.status} 
          link={item.notulensi_rapat}/>
      ))
    }
    <MenuNavigation/>
    </>
  )
}
