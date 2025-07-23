"use client"
import React from 'react'
import { useState } from 'react'

export default function AnnouncementSection() {
  const [data,setData] = useState<{id:number,title:string,date:string}[]>([
  {
    id: 1,
    title: "Pengumpulan Proposal Kegiatan Wajib Maksimal 25 September 2025",
    date: "2025-09-10"
  },
  {
    id: 2,
    title: "Rapat Koordinasi Departemen Litbang Minggu Ini Ditiadakan",
    date: "2025-09-08"
  },
  {
    id: 3,
    title: "Pendaftaran Open Recruitment Panitia HIMATIF 2025 Telah Dibuka",
    date: "2025-09-05"
  },
  {
    id: 4,
    title: "Serah Terima Jabatan Akan Dilaksanakan pada 15 Oktober 2025",
    date: "2025-09-03"
  },
  {
    id: 5,
    title: "Deadline Pengumpulan Laporan Keuangan Akhir Periode: 30 September 2025",
    date: "2025-09-01"
  }
]
)
  return (
            <div className="bg-cyan-50 text-cyan-600 h-full overflow-y-scroll rounded w-xl p-4 shadow-2xl">
                <h1 className="font-bold underline">Announcement</h1>
                <ul className="flex flex-col gap-2 bg-white justify-center">
                    {
                      data.map((item : {id : number, title:string, date:string})=>(
                        <li key={item.id} className='border-b-gray-300 bg-whites p-2 border-b-2 cursor-pointer hover:shadow-xl'>
                          <h1>{item.title}</h1>
                          <p>{item.date}</p>
                        </li>
                      ))
                    }
                </ul>
            </div>
  )
}
