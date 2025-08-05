/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function ProfileSection({ Username, Role,media }: { media:string,Username: string | null, Role: string | null }) {
  return (
    <div className="bg-white shadow-2xl rounded text-center w-full md:w-xl p-4 md:p-8 md:h-xl text-cyan-500 mx-auto">
      <div className="font-bold underline text-start mb-3">Profile</div>
      <img 
        src={media} 
        alt="" 
        className="w-28 md:w-40 border-2 border-cyan-400 rounded-full mx-auto mb-3"
      />
      <h1 className="font-bold text-xl md:text-2xl mb-1">{Username}</h1>
      <p className="text-base md:text-lg mb-3">{Role}</p>
      <div className="border-t border-cyan-500 pt-2">
        <a href="/profile" className="hover:text-red-500 transition-colors text-sm md:text-base">
          lihat selengkapnya
        </a>
      </div>
    </div>
  )
}
