/* eslint-disable @next/next/no-img-element */
"use client"
import MainNavigation from "@/component/mainNavigation";

export default function Home() {

  const changePage = (link : string)=>{
    window.location.href = link
  }
  return (
    <>
      <MainNavigation action2={()=>changePage('auth/register')} action1={()=>changePage('auth/login')}/>
   
      <div className="mt-20 text-center">
        <h1 className="text-black text-4xl font-bold">
          Sistem Manajemen Anggota
        </h1>
        <p className="text-gray-600 text-2xl">Powered By Himpunan Mahasiswa Teknik Informatika</p>
      </div>

      <div className="flex justify-center">
        <img className="opacity-50" width={'1000px'} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGrkwFlmQ8fLJRWI8AmRZD3byqYLDrXvpwYA&s" alt="" />
      </div>

      <div className="p-4 bg-gray-900 w-full h-32">

      </div>

    </>
  );
}
