"use client"
import MenuNavigation from "@/component/menu";
import React, { useState } from "react";
import './locals.css'
export default function UploadNotulensi() {
  const [meetingId, setMeetingId] = useState<string>(""); // kalau mau hubungkan notulensi ke rapat tertentu
  const [announcement, setAnnouncement] = useState<File | null>(null);

  const uploadFile = async()=>{
    const formData  =new FormData();
    formData.append("judul", meetingId)
   for (const pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
     }

    if(announcement) formData.append("file", announcement)
   
      try{
      const request = await fetch('https://himatifabsencesystemr-ddepartmentbackend-production.up.railway.app/notulensi-upload',{
        method:"POST",
        body: formData
      })
      
      if(!request.ok){
        console.log('error');
      }
      return request;
    }catch(error){
      console.log(error)
    }
    }


  return (
    <div className="flex items-center text-cyan-600 justify-center min-h-screen bg-cover" style={{ backgroundImage: "url('/your-background.jpg')" }}>
      <form onSubmit={uploadFile} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-lg font-semibold mb-4">Upload Pengumumant</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">ID / Nama Rapat</label>
          <input
            type="text"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value)}
            placeholder="Contoh: Rapat Koordinasi"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">File Notulensi (PDF, DOC, DOCX)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e)=>{
              const data = e.target.files?.[0] || null;
              setAnnouncement(data);
            }}
            className="w-full p-1 border rounded-md"
            required
          />
        </div>

        <button type="submit" className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition">
          Upload Notulensi
        </button>
      </form>
      <MenuNavigation/>
    </div>
  );
}
