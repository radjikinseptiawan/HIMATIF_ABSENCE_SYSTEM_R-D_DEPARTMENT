"use client"
import React from 'react'

export default function MenuSection() {
  return (
    <div className="bg-gray-50 text-cyan-400 rounded p-4 shadow-2xl w-full md:w-xl mx-auto">
      <h1 className="font-bold underline text-center text-lg md:text-xl mb-2">Menu</h1>
      <ul className="flex flex-wrap justify-center gap-2 md:gap-4">
        <li className="hover:text-cyan-800 flex items-center flex-col cursor-pointer">
          <img src="/table.svg" alt="" />
         <p>Agenda Rapat</p>
        </li>
        <li className="hover:text-cyan-800 cursor-pointer flex items-center flex-col">
          <img src="file-text.svg" alt="" />
          Notulensi
        </li>
        <li className="hover:text-cyan-800 cursor-pointer flex items-center flex-col">
          <img src="bell.svg" alt="" />
          Notifikasi
        </li>
      </ul>
    </div>
  )
}
