"use client"
import React, { useEffect, useReducer, useState } from 'react'
import './locals.css'
import MenuNavigation from '@/component/menu'
import CreateProker from '@/component/proker/prokerInput'

type initialType = {
  nama_program: string,
  ketua_pelaksana: number,
  sekertaris_pelaksana: number,
  sekertaris_pelaksana2: number,
  bendahara_pelaksana: number,
  bendahara_pelaksana2: number ,
  tanggal_pelaksanaan : Date | null
  notulensi_rapat: File | null
}

const initialState : initialType= {
  nama_program:"",
  ketua_pelaksana : 0,
  sekertaris_pelaksana : 0,
  sekertaris_pelaksana2 : 0,
  bendahara_pelaksana : 0,
  bendahara_pelaksana2 : 0,
  tanggal_pelaksanaan: null,
  notulensi_rapat: null
}

type actionType = 
  |{type:'namaProgram',payload:string}
  |{type:'ketuplak',payload:number}
  |{type:'sekplak1',payload:number}
  |{type:'sekplak2',payload:number}
  |{type:'benplak1',payload:number}
  |{type:'benplak2',payload:number}
  |{type:'tanggalPelaksana',payload:string}
  |{type:'notulensiRapat',payload:File | null}

const reducer = (state :initialType ,action: actionType ) =>{
  switch(action.type){
    case 'ketuplak':
      return {...state, ketua_pelaksana: action.payload}
    case 'sekplak1':
      return {...state, sekertaris_pelaksana: action.payload}
    case 'sekplak2':
      return {...state, sekertaris_pelaksana2: action.payload}
    case 'benplak1':
      return {...state, bendahara_pelaksana: action.payload}
    case 'benplak2':
      return {...state, bendahara_pelaksana2: action.payload}
    case 'tanggalPelaksana':
      return {...state, tanggal_pelaksanaan: new Date(action.payload)}
    case 'notulensiRapat':
      return {...state, notulensi_rapat : action.payload}
    case 'namaProgram':
      return {...state, nama_program : action.payload}
    default:
      return state
    }
}

type AnggotaType = {
  id:number
  fullname:string
}

export default function Page() {
  const [data, setData] = useState<AnggotaType[]>([]);
  const [state,dispatch] = useReducer(reducer,initialState)
  useEffect(()=>{
    const fetchingData = async()=>{
      const response = await fetch('http://localhost:3001/anggota')
      const data = await response.json()
      setData(data.data)
    }
  fetchingData();
  },[])

  const dateFormat = (date : Date)=>{
    const year = date.getFullYear();
    const day = String(date.getDate()).padStart(2,'0');
    const month = String(date.getMonth()+1).padStart(2,'0');
    return `${year}-${month}-${day}`;
  }
  const submitToServer = async()=>{
    const formData = new FormData();

    formData.append('ketua_pelaksana',String(state.ketua_pelaksana))
    formData.append('sekertaris_pelaksana',String(state.sekertaris_pelaksana))
    formData.append('sekertaris_pelaksana2',String(state.sekertaris_pelaksana2))
    formData.append('bendahara_pelaksana',String(state.bendahara_pelaksana))
    formData.append('bendahara_pelaksana2',String(state.bendahara_pelaksana2))
    if(state.tanggal_pelaksanaan){
      formData.append('tanggal_pelaksanaan',dateFormat(state.tanggal_pelaksanaan))
    }
    formData.append('status',"On-Progress")
    formData.append('nama_program', state.nama_program)
    if(state.notulensi_rapat){
      formData.append('notulensi_rapat',state.notulensi_rapat)
    }
    try{
    const request = await fetch('http://localhost:3001/programkerja',{
      method:"POST",
      body:formData,
    })

    if(!request.ok){
      console.log('error')
    }

    return `Success add data`
   }catch(error){
    console.log(error)
   }
  }

  return (
    <>
      <div className='flex justify-center items-center align-middle min-h-screen my-2'>
        <div className='bg-white shadow-2xl text-sky-700 p-4 rounded-md w-xl'>
          <h1 className='text-xl font-bold text-center mb-4'>Buat Program Kerja</h1>
          <div className='flex flex-col gap-3'>
            <label htmlFor="proker">Nama Program Kerja</label>
            <input
              type="text"
              className='border p-2 rounded-md underline'
              name='proker'
              onChange={(e)=>dispatch({type:"namaProgram", payload:e.target.value})}
              value={state.nama_program}
              id='proker'
              placeholder='Tulis nama program'
            />

            <CreateProker onChanged={(e)=>dispatch({type:"ketuplak", payload: Number(e.target.value)})} 
            value={state.ketua_pelaksana || ""} 
            selected={(e)=>dispatch({type:"ketuplak",payload: Number(e.target.value)})
            } title={'Ketua Pelaksana'} nameFor={'ketua_pelaksana'}>
              <option value="" disabled></option>
              {data.map((item, index) => (
                
                <option value={item.id} key={index}>{item.fullname}</option>
              ))}
            </CreateProker>

            <CreateProker 
            onChanged={(e)=>dispatch({type:"sekplak1", payload: Number(e.target.value)})} value={state.sekertaris_pelaksana || ""} 
            selected={(e)=>dispatch({type:"sekplak1",payload:   Number(e.target.value)})
            } title={'Sekertaris Pelaksana 1'} nameFor={'Sekertaris_Pelaksana1'}>
              <option value="" disabled></option>
              {data.map((item, index) => (
                <option value={item.id} key={index}>{item.fullname}</option>
              ))}
            </CreateProker>

            <CreateProker 
            onChanged={(e)=>dispatch({type:"sekplak2", payload: Number(e.target.value)})} value={state.sekertaris_pelaksana2 || ""} 
            selected={(e)=>dispatch({type:"sekplak2",payload: Number(e.target.value)})
            } title={'Sekertaris Pelaksana 2'} nameFor={'sekplak2'}>
              <option value="" disabled></option>
              {data.map((item, index) => (
                <option value={item.id} key={index}>{item.fullname}</option>
              ))}
            </CreateProker>

            <CreateProker value={state.bendahara_pelaksana || ""} 
            onChanged={(e)=>dispatch({type:"benplak1", payload: Number(e.target.value)})}
            selected={(e)=>dispatch({type:"benplak1",payload: Number(e.target.value)})
            } title={'Bendahara Pelaksana 1'} nameFor={'Bendahara_Pelaksana'}>
              <option value="" disabled></option>
              {data.map((item, index) => (
                <option value={item.id} key={index}>{item.fullname}</option>
              ))}
            </CreateProker>

            <CreateProker value={state.bendahara_pelaksana2 || ""} 
            onChanged={(e)=>dispatch({type:"benplak2", payload: Number(e.target.value)})}
            selected={(e)=>dispatch({type:"benplak2",payload: Number(e.target.value)})
            } title={'Bendahara Pelaksana 2'} nameFor={'benplak2'}>
              <option value="" disabled></option>
              {data.map((item, index) => (
                <option value={item.id} key={index++}>{item.fullname}</option>
              ))}
            </CreateProker>
          </div>

          <div className='flex flex-col gap-2 my-3'>
            <label htmlFor="">Tangal Pelaksanaan</label>
            <input type="date" onChange={(e)=> dispatch({type:"tanggalPelaksana",payload:e.target.value})} className='border border-cyan-800 rounded-md p-4' />
          </div>
            
          <div className='flex flex-col gap-2 my-3'>
            <label htmlFor="">Notulensi Rapat</label>
            <input type="file" onChange={(e)=> {
              const file = e.target.files?.[0] || null
              dispatch({type:"notulensiRapat",payload: file})}} className='border border-cyan-800 rounded-md p-4' />
          </div>
             
          <div className='flex justify-center my-8'>
            <button onClick={submitToServer} className='bg-cyan-400 text-white p-2 font-bold rounded-md'>Buat Proker</button>
          </div>

          <button onClick={()=>{
            console.log(state)
            }}>debug</button>
        </div>
      </div>
      <MenuNavigation/>
    </>
  )
}
