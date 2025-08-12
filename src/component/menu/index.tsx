"use client"
import React, { useEffect, useState } from 'react'

export default function MenuNavigation() {
  const [open, setOpen] = useState(false)
  const [profile,setProfile] = useState<{role:string} | null>(null)
  
  
  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token')
      if(!token){
        window.location.href = "/auth/login"
      }
    
      const id = localStorage.getItem('id')
      const response = await fetch(`https://himatifabsencesystemr-ddepartmentbackend-production.up.railway.app/dashboard/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      const data = await response.json()
      setProfile(data.data)
    }

    getUserProfile()
  }, [])

  console.log(profile)

  const photos = () => {
    window.location.href = "/photos"
  }

  const logoutUser = () => {
    localStorage.clear()
    window.location.href = "/auth/login"
  }

  const toHome = () => {
    window.location.href = "/dashboard"
  }

  const toProfile = () => {
    window.location.href = "/profile"
  }

  return (
    <>
      <button 
        onClick={() => setOpen(!open)} 
        className={open ? "bg-red-300 font-bold text-red-700 p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl cursor-pointer hover:text-white transition-all hover:bg-red-600 fixed bottom-4 md:bottom-20 lwft-4 md:left-4 z-20":"bg-lime-300 font-bold text-lime-700 p-3 md:p-4 rounded-full shadow-xl hover:shadow-2xl cursor-pointer hover:text-white transition-all hover:bg-lime-600 fixed bottom-4 md:bottom-20 lwft-4 md:left-4 z-20"}
      >
      {open ?  <img src="/x.svg" className="w-6 h-6 md:w-8 md:h-8" alt="close" />:<img src="/more-vertical .svg" alt="menu" className="w-6 h-6 md:w-8 md:h-8" />}
      </button>

      {open && (
        <div className="fixed bg-cyan-50 z-10 shadow-2xl top-0 left-0 w-full md:w-96 h-full p-4 md:p-6 transition-all">
          <div className="text-center mb-4">
            <h1 className="text-cyan-500 text-xl md:text-2xl font-bold border-b-2 pb-2">Navigation</h1>
          </div>
          <ul className="flex flex-col gap-2">
            {[
              { title: "Home", href: "/dashboard", onClicked: toHome, icon : "/home.svg" },
              { title: "Profile", href: "/profile", onClicked: toProfile, icon:"/user.svg" },
              { title: "Program Kerja",href:"/program_kerja",onClicked: ()=>{console.log('progress')},icon:"/briefcase.svg"},
              { title: "Logout", href: "/auth/login", onClicked: logoutUser,icon:"/log-out.svg"},
            ].map((item, index) => (
              <li 
                key={index}
                onClick={item.onClicked}
                className="text-cyan-400 text-base md:text-md p-2 rounded hover:bg-sky-100 hover:cursor-pointer hover:shadow"
              >
                <a href={item.href} className='flex items-center gap-2'><img src={item.icon} alt={item.title} />{item.title}</a>
              </li>
            ))}
            {
              (profile?.role == "Ketua Departement" || 
              profile?.role == "Ketua Umum" || 
              profile?.role == "Sekertaris Umum" || 
              profile?.role == "Bendahara Umum" ||
              profile?.role == "Sekertaris Departement") &&
              <div className='p-3 border-t-2 border-cyan-400 '>
             {
              [
                {title: "Manajemen Anggota",href:"/list-anggota",onclicked:()=>{},icon:"/users.svg"},
                {title: "Buat Program Kerja", href:"/create-proker",onClicked:()=>{},icon:"/file-plus.svg"},
                {title: "Upload Pengumuman",href:"/upload-pengumuman",onclicked:()=>{},icon:"/folder.svg"},
                {title: "Buat Rapat", href:"/create-rapat",onclick:()=>{},icon:"/message-circle.svg"}
              ].map((item,index)=>{
                return(
              <li 
                  key={index++}
                onClick={()=>{}}
                className="text-cyan-400 text-base md:text-md p-2 rounded hover:bg-sky-100 hover:cursor-pointer hover:shadow"
              >
                <a href={item.href} className='flex items-center gap-2'><img src={item.icon} alt={item.icon} />{item.title}</a>
              </li> 
               )                
              })

             }
              </div>
          }
          </ul>
        </div>
      )}
    </>
  )
}
