import React from 'react'

export default function MemberList({nama,jabatan}: {nama:string, jabatan:string}) {
    return (
        <div className='bg-white w-xl rounded shadow-2xl mx-auto p-4'>
            <div className='flex text-cyan-500 gap-8'>
                <img src="https://i.pinimg.com/1200x/8c/10/0a/8c100a3d4910da272dadc05885dc35c2.jpg" width={80} alt="" />
                <div>
                <div>
                    <h1 className='font-bold text-xl'>{nama}</h1>
                    <p>{jabatan}</p>
                </div>

                <div className='flex gap-2'>
                    <button className='bg-yellow-400 p-2 text-white rounded-md font-bold'>Surat Panggilan</button>
                    <button className='bg-red-800 p-2 text-white rounded-md font-bold'>Keluarkan</button>
                    <button className='bg-lime-800 p-2 text-white rounded-md font-bold'>Detail</button>
                </div>
                </div>
            </div>
        </div>
  )
}
