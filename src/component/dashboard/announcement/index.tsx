"use client"
import React, { useState } from 'react'

export default function AnnouncementSection() {
  const [data, setData] = useState<{ id: number, title: string, date: string }[]>([
    { id: 1, title: "Pengumpulan Proposal Kegiatan Wajib Maksimal 25 September 2025", date: "2025-09-10" },
    { id: 2, title: "Rapat Koordinasi Departemen Litbang Minggu Ini Ditiadakan", date: "2025-09-08" },
    { id: 3, title: "Pendaftaran Open Recruitment Panitia HIMATIF 2025 Telah Dibuka", date: "2025-09-05" },
    { id: 4, title: "Serah Terima Jabatan Akan Dilaksanakan pada 15 Oktober 2025", date: "2025-09-03" },
    { id: 5, title: "Deadline Pengumpulan Laporan Keuangan Akhir Periode: 30 September 2025", date: "2025-09-01" }
  ])

  return (
    <div className="bg-cyan-50 text-cyan-600 rounded shadow-2xl w-full md:w-xl mx-auto p-4 md:p-6 max-h-[600px] overflow-y-auto">
      <h1 className="font-bold underline text-center mb-3 text-lg md:text-xl">Announcement</h1>
      <ul className="flex flex-col gap-[4px]">
        {data.map((item) => (
          <li 
            key={item.id} 
            className="bg-white p-3 rounded shadow hover:shadow-md transition cursor-pointer border border-gray-200"
          >
            <h2 className="font-semibold text-base md:text-lg mb-1">{item.title}</h2>
            <p className="text-xs md:text-sm text-gray-500">{item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
