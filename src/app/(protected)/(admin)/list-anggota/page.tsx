"use client"
import React, { useEffect, useState } from 'react'
import './locals.css'
import MenuNavigation from '@/component/menu'
import MemberList from '@/component/member'
import MemberLoading from '@/component/member/memberLoading'

type UserData = {
  fullname: string;
  role: string;
  user_id: number;
  photo?: string | null;
}

export default function Page() {
  const [data, setData] = useState<UserData[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getData = async () => {
    const token = localStorage.getItem("token")

    const response = await fetch('http://localhost:3001/users-accounts', {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      const text = await response.text()
      console.error("Gagal fetch:", response.status, text)
      return
    }

    const datas = await response.json();

    const usersWithPhoto = await Promise.all(
      datas.data.map(async (user: UserData) => {
        try {
          const photoRes = await fetch(`http://localhost:3001/users-accounts/${user.user_id}/photo`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`
            }
          })

          if (photoRes.ok) {
            const blob = await photoRes.blob()
            const url = URL.createObjectURL(blob)
            return { ...user, photo: url }
          } else {
            return { ...user, photo: null }
          }
        } catch (err) {
          console.error("Photo error:", err)
          return { ...user, photo: null }
        }
      })
    )

    setData(usersWithPhoto)
    setLoading(true)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <MenuNavigation />
      <div className='flex gap-2 flex-col'>
        {loading ?
          data.map((item, index) => (
            <MemberList
              key={item.user_id}
              nama={item.fullname}
              jabatan={item.role}
              media={item.photo || "https://i.pinimg.com/1200x/36/51/f4/3651f43d5bcfea454a15a6589921305a.jpg"}
            />
          )) :
          [...Array(11)].map((_, i) => <MemberLoading key={i} />)
        }
      </div>
    </>
  )
}
