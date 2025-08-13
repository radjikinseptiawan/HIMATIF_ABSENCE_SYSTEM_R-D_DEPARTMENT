"use client"
import MenuNavigation from "@/component/menu";
import React, { useReducer } from "react";
import './locals.css'

type initialType = {
  meetingName : string;
  date: string;
  time_start: string;
  time_end:string;
  location: string;
  notes: string
}


const initialState : initialType= {
  meetingName : "",
  date : "",
  time_start: "",
  time_end:"",
  location: "",
  notes : ""
}

type ActionType = {type:"time_end", payload:string}| {type:"name",payload:string} | {type:"date",payload:string}|{type:"time_start",payload:string}|{type:"location",payload:string}|{type:"notes",payload:string} 

const reducer = (state : initialType, action:ActionType)=>{
    switch(action.type){
      case "date":
        return {...state, date:action.payload};
      case "location":
        return {...state, location:action.payload};
      case "name":
        return {...state, meetingName:action.payload};
      case "time_start":
        return {...state, time_start:action.payload};
      case "time_end":
        return {...state, time_end: action.payload};
      case "notes":
        return {...state, notes:action.payload};
      default:
        return state
    }
}

export default function CreateMeeting() {
  const [state,dispatch] = useReducer(reducer,initialState);

  const submitForm = async()=>{
    const response = await fetch("https://himatifabsencesystemr-ddepartmentbackend-production.up.railway.app/rapat",{
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        judul : state.meetingName,
        notes : state.notes,
        tempat: state.location,
        tanggal: state.date,
        waktu_mulai: state.time_start,
        waktu_selesai: state.time_end
      })
    })

   const data = await response.json();
   return data
  }
  return (
    <div className="flex items-center text-cyan-700 justify-center min-h-screen bg-cover" style={{ backgroundImage: "url('/your-background.jpg')" }}>
      <form onSubmit={submitForm} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-center text-lg font-semibold mb-4">Buat Rapat</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1">Nama Rapat</label>
          <input
            type="text"
            value={state.meetingName}
            onChange={(e) => dispatch({type:"name", payload:e.target.value})}
            placeholder="Contoh: Rapat Koordinasi"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Tanggal</label>
          <input
            type="date"
            value={state.date}
            onChange={(e) => dispatch({type:"date", payload:e.target.value})}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Waktu Mulai</label>
          <input
            type="time"
            value={state.time_start}
            onChange={(e) => dispatch({type:"time_start",payload:e.target.value})}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-1">Waktu Selesai</label>
          <input
            type="time"
            value={state.time_end}
            onChange={(e) => dispatch({type:"time_end", payload:e.target.value})}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>


        <div className="mb-4">
          <label className="block text-sm mb-1">Lokasi</label>
          <input
            type="text"
            value={state.location}
            onChange={(e) => dispatch({type:"location", payload:e.target.value})}
            placeholder="Contoh: Ruang Rapat 1"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1">Catatan (Opsional)</label>
          <textarea
            value={state.notes}
            onChange={(e) => dispatch({type:"notes", payload:e.target.value})}
            placeholder="Catatan tambahan..."
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <button type="submit" className="w-full bg-cyan-500 text-white py-2 rounded hover:bg-cyan-600 transition">
          Buat Rapat
        </button>
      </form>
      <MenuNavigation/>
    </div>
  );
}
