/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useEffect, useState } from 'react'

export default function AbsenceSection() {
  const [open, setOpen] = useState<boolean>(false)
  const [isAbsence, setIsAbsence] = useState<boolean>(false)
  const [mapUrl, setMapUrl] = useState<string>("")
  const [status, setStatus] = useState<string | null>("")

  const absenceSystem = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`

      const userId = localStorage.getItem("id")
      const response = await fetch("http://localhost:3001/absence", {
        method: "POST",
        body: JSON.stringify({
          lokasi: url,
          user_id: userId,
          status: "Sudah Absen"
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })

      localStorage.setItem("absenAt", new Date().toISOString())
      const data = await response.json()

      setMapUrl(url)
      setIsAbsence(true)
      setOpen(false)
      setStatus("Sudah Absen")
    })
  }

  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords
      const url = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`
      setMapUrl(url)
    })

    try {
      const id = localStorage.getItem("id")
      const token = localStorage.getItem("token")

      const response = await fetch(`http://localhost:3001/absence/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })

      const data = await response.json()
      const backendStatus = data.data.status

      const absenAt = localStorage.getItem('absenAt')
      if (absenAt && absenAt !== 'undefined') {
        const diffMs = new Date().getTime() - new Date(absenAt).getTime()
        const diffHours = diffMs / (1000 * 60 * 60)

        if (diffHours >= 24) {
          setStatus("Belum Absen")
          localStorage.removeItem('absenAt')
        } else {
          setStatus(backendStatus)
        }
      } else {
        setStatus("Belum Absen")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("absenAt")
      if (!stored || stored === 'undefined') {
        localStorage.setItem("absenAt", 'undefined')
      }
    }
    getLocation()
  }, [])

  return (
    <div>
      <div className="bg-white p-4 md:p-8 h-auto md:h-xl xl:h-1/2 shadow-2xl rounded w-full md:w-xl mx-auto">
        <h1 className="font-bold text-center my-3 text-cyan-500 text-2xl underline">Absensi</h1>

        <div className="flex flex-wrap gap-2 justify-center mb-3">
          <p className="text-cyan-500">Agenda Hari Ini:</p>
          <a href="#" className="text-cyan-500 hover:text-red-600 hover:cursor-pointer underline">
            Rapat Paripurna Pengesahan UU Perampasan Aset
          </a>
        </div>

        <div className="flex justify-center my-3">
          <button className="bg-cyan-500 px-4 py-2 rounded-2xl font-bold" onClick={() => setOpen(true)}>
            Absen
          </button>
        </div>
        
        <p className="text-gray-300 text-center">Powered By HIMATIF UPB</p>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-40 z-30 flex items-center justify-center px-4">
          <div className="bg-sky-100 border-sky-700 p-4 md:p-6 shadow-xl rounded-md text-cyan-400 w-full max-w-xl">
            <div className="text-center">
              <h1 className="my-2 font-bold">Lokasi Kamu</h1>
              <div className="my-4">
                <iframe
                  src={mapUrl}
                  width="100%"
                  height="250"
                  className="rounded-md"
                  loading="lazy"
                ></iframe>
              </div>
              <div className="flex justify-center gap-3 flex-wrap">
                <button
                  onClick={absenceSystem}
                  className="bg-lime-600 px-4 py-2 rounded-xl text-green-200 cursor-pointer shadow-2xl"
                >
                  Mulai Absen
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-red-600 px-4 py-2 rounded-xl text-red-200 cursor-pointer shadow-2xl"
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
