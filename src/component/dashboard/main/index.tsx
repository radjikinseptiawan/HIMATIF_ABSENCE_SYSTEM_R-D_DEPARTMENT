import React from 'react'

export default function AbsenceSection() {
  return (
   <div className="bg-white p-4 md:p-8 h-xl xl:h-1/2 shadow-2xl rounded w-xl ">
                <h1 className="font-bold text-center my-3 text-cyan-500 text-2xl underline">Absensi</h1>
                <div className="flex gap-3">
                <p className="text-cyan-500">Agenda Hari Ini: </p><a href="" className="text-cyan-500 hover:text-red-600 hover:cursor-pointer underline">Rapat Paripurna Pengsahan UU Perampasan Aset</a>
                </div>
                <div className="flex justify-center my-3">
                <button className="bg-cyan-500 p-3 rounded-2xl font-bold">Absen</button>
               </div>
               <div className="flex justify-center gap-2">
                <p className="text-cyan-500">Status : </p> <p className="text-orange-500">Belum Absen</p>
               </div> 
                <p className="text-gray-300 text-center">Powered By HIMATIF UPB</p>
            </div>
         
  )
}
