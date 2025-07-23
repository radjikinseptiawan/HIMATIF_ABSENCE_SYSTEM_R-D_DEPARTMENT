/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import AnnouncementSection from "@/component/dashboard/announcement";
import AbsenceSection from "@/component/dashboard/main";
import MenuSection from "@/component/dashboard/menu";
import ProfileSection from "@/component/dashboard/profile";
import { useEffect, useState } from "react";
import './locals.css'

export default function page() {
    const [width,setWidth] = useState<number>(0)
    const [open,setOpen] = useState<boolean>(false)
    const [data,setData] = useState()
    useEffect(()=>{
        const responsiveUi = ()=>{
            const newSize = setWidth(window.innerWidth)
            return newSize
        }
        
        responsiveUi()
        fetchingUser()
        window.addEventListener('resize',responsiveUi)

        return ()=> window.removeEventListener('resize',responsiveUi)
    },[])

    const fetchingUser = async()=>{
        const id = localStorage.getItem("id");
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:3001/dashboard/${id}`,{
            method:"GET",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        const data = await response.json();

        if(!response.ok){
            console.log(response.status)
            throw new Error("Failed connectiong to server")
        }

        setData(data.data)
    }

    const logoutUser = ()=>{
            localStorage.clear()
            window.location.href = "/login"
    }

    console.log(data)
    return (
        <>
        <div onClick={()=>setOpen(false)} className="flex flex-col md:flex-row md:w-screen md:h-screen gap-1 justify-center items-center p-2 h-full w-screen"
        >
            <div className="flex flex-col gap-1">
            {width > 1200 && <MenuSection/>}
            <ProfileSection Username={data?.username} Role={data?.role}/>
            <AbsenceSection/>
            {width < 1200 && <MenuSection/>}
            </div>
            <AnnouncementSection/>
        </div>
        <button onClick={()=>setOpen(!open)} className="bg-lime-300 font-bold text-lime-700 absolute p-4 rounded-full shadow-xl hover:shdaow-2xl cursor-pointer hover:text-white transition-all hover:bg-lime-600 bottom-3 md:bottom-20 mx-4">Open</button>
        {
            open && 
            <div className="fixed bg-cyan-50 z-10 shadow-2xl top-0 left-0 p-3 w-96 h-full">
                <span className="text-cyan-500 shadow-sky-200 text-center p-3 font-bold">
                    <h1 className="border-b-2 text-2xl">Navigation</h1>
                </span>
                <ul className="flex flex-col">
                {
                    [
                        {
                            title : 'Profile',
                            href : '/',
                            onClicked : ()=>{

                            }
                        },
                        {
                            title : "Photos",
                            href   : '/',
                            onClicked : ()=>{
                                
                            }
                        },
                        {
                            title : "Logout",
                            href : "/auth/login",
                            onClicked : logoutUser
                        }
                    ].map((item,index)=>(
                        <li key={index++} onClick={item.onClicked} className=" hover:bg-sky-200 hover:rounded-br-md hover:rounded-tr-md text-md text-cyan-400 p-2 border-b-2 hover:cursor-pointer hover:shadow-xl"><a href={item.href} >{item.title}</a></li>
                    ))
                }
              </ul>
            </div>
        }
        </>
    );
}
