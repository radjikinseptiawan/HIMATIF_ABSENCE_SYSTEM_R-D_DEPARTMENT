/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import AnnouncementSection from "@/component/dashboard/announcement";
import AbsenceSection from "@/component/dashboard/main";
import MenuSection from "@/component/dashboard/menu";
import ProfileSection from "@/component/dashboard/profile";
import { useEffect, useState } from "react";
import './locals.css'
import MenuNavigation from "@/component/menu";

type RoleData = {
  username : string | null
  role : string | null
}

export default function page() {
  const [width, setWidth] = useState<number>(0)
  const [open, setOpen] = useState<boolean>(false)
  const [data, setData] = useState<RoleData | null>(null)
  const [imageUrl,setImageUrl] = useState<string | null>(null)
  useEffect(()=>{
    const responsiveUi = () => setWidth(window.innerWidth)
    responsiveUi()
    const token = localStorage.getItem('token')
    if(!token){
        window.location.href ="/auth/login"
    }
    fetchingUser()
    window.addEventListener('resize', responsiveUi)
    return () => window.removeEventListener('resize', responsiveUi)
  }, [])

  const fetchingUser = async () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3001/dashboard/${id}`, {
      method: "GET",
      headers: { "Authorization": `Bearer ${token}` }
    })
    const data = await response.json();

    if (!response.ok) {
      console.log(response.status)
      throw new Error("Failed connecting to server")
    }
          const photoResponse = await fetch(`http://localhost:3001/users-accounts/${id}/photo`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })
    if(photoResponse.ok){
      const blob = await photoResponse.blob()
      const url = await URL.createObjectURL(blob)
      setImageUrl(url)

    }
    setData(data.data)
  }

  return (
    <>
      <div 
        onClick={() => setOpen(false)} 
        className="flex flex-col md:flex-row md:w-screen md:min-h-full gap-[4px] justify-center items-start p-2 h-full w-screen"
      >
        <div className="flex flex-col gap-0.5">
          {width > 1200 && <MenuSection />}
          <ProfileSection Username={data ? data.username : "loading..."} Role={data ? data.role : "loading..."} media={imageUrl ? imageUrl : "https://i.pinimg.com/736x/bf/cb/e0/bfcbe08c8971f63b7d62bab4bb121786.jpg"} />
          <AbsenceSection />
          {width <= 1200 && <MenuSection />}
          <AnnouncementSection />
        </div>
      </div>
      <MenuNavigation />
    </>
  );
}
