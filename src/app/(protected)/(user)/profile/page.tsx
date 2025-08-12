/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useEffect, useState } from 'react'
import './locals.css'
import MenuNavigation from '@/component/menu'
import ProfileSkeleton from '@/component/profile/loading'

type DataProfile = {
  username: string;
  fullname: string;
  email: string;
  password: string;
  gender: string;
  phone: number;
  address: string;
  role: string;
  photoProfile: File | Buffer | string
  birth_date: string;
  departement: string;

}

export default function Page() {
  const [profile, setProfile] = useState<DataProfile | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  useEffect(() => {
    const getUserProfile = async () => {
      const token = localStorage.getItem('token')
      const id = localStorage.getItem('id')
      if(!token || !id){
        window.location.href = "/auth/login"
      }
    
      const response = await fetch(`https://himatifabsencesystemr-ddepartmentbackend-production.up.railway.app/dashboard/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      
      const data = await response.json()
      setProfile(data.data)

      const photoResponse = await fetch(`https://himatifabsencesystemr-ddepartmentbackend-production.up.railway.app/users-accounts/${id}/photo`,{
        headers : {
          Authorization : `Bearer ${token}`
        }
      })

      if(photoResponse.ok){
        const blob = await photoResponse.blob();
        console.log(blob)
        setImageUrl(URL.createObjectURL(blob))
      }
    }


    getUserProfile()
    console.log(imageUrl)
    console.log(profile)
  }, [])

  if(profile === null){
    return(
      <ProfileSkeleton/>
    )
  }

  return (
    <>
    <div className='min-h-screen'>
      <div className='bg-white w-full h-1/2 max-w-3xl p-6 mx-auto my-4 rounded-lg shadow-lg mt-10'>
        <h1 className='text-cyan-500 font-extrabold text-4xl text-center mb-6 underline'>
          Profile
        </h1>

        <div className='flex justify-center mb-6'>
          <img
            className='rounded-full border-4 border-cyan-300'
            src={imageUrl ?? 'https://i.pinimg.com/736x/1a/a8/d7/1aa8d75f3498784bcd2617b3e3d1e0c4.jpg'}
            alt='profile'
            width={200}
          />
        </div>

        {profile && (
          <div className='text-start text-cyan-700 text-lg space-y-2 px-4'>
            <h1 className='text-xl border-b-2 w-52'><strong>Umum</strong></h1>
            <div className='p-2 mx-4'>
            <p><strong>Username:</strong> {profile.username}</p>
            <p><strong>Fullname:</strong> {profile.fullname}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Address:</strong> {profile.address}</p>
            <p><strong>Birth:</strong> {profile.birth_date}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            </div>

            <h1 className='text-xl border-b-2 w-52'><strong>Organization</strong></h1>
            <div className='p-2 mx-4 overflow-auto overflow-x-scroll'>
            <p><strong>Department:</strong> {profile.departement}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Program Kerja :</strong></p>
            <table className='text-center mx-auto my-4  rounded-md'>
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
  
        <div className='flex justify-end'>
          <button className='bg-yellow-400 p-3 w-52 shadow-2xl rounded-md' onClick={()=>window.location.href = "/profile/edit"}>Edit</button>
        </div>
      </div>
    </div>
      <MenuNavigation />
    </>
  )
}
