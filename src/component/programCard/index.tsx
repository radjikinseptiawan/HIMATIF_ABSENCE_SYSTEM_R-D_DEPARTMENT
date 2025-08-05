import React from 'react'

export default function ProgramCard({programKerja,ketuplak,sekertaris1,link,Sekertaris2,bendahara1,bendahara2,status} : {link:string,status:string,programKerja:string, ketuplak:string, sekertaris1:string, Sekertaris2:string, bendahara1:string,bendahara2:string}) {
  return (
    <div className='bg-white rounded-md shadow-2xl text-cyan-600 p-5 w-sm md:w-md lg:w-lg xl:w-xl mx-auto my-2'>
        <span className='flex justify-between border-b-2'>
        <h1 className='font-bold'>Program Kerja :</h1>
        <h1 className='font-semibold'>{programKerja}</h1>
        </span>
        <span className='flex gap-2 items-center'>
        <h2 className='my-2'>Ketua Pelaksana : </h2>
        <h2 className='underline'>{ketuplak}</h2>
        </span>
        <span className='flex items-center gap-2'>
        <h2 className='my-2'>Sekertaris Pelaksana : </h2>
        <h2 className='underline'>{sekertaris1}</h2>
        </span>
        <span className=' flex items-center gap-2'>
        <h2 className='my-2'>Sekertaris Pelaksana : </h2>
        <h2 className='underline'>{Sekertaris2}</h2>
        </span>
        <span className='flex items-center gap-2'>
        <h2 className='my-2'>Bendahara Pelaksana</h2>
        <h2 className='underline'>{bendahara1}</h2>
        </span>
        <span className='flex items-center gap-2'>
        <h2 className='my-2'>Bendahara Pelaksana</h2>
        <h2 className='underline'>{bendahara2}</h2>
        </span>
        <span className='flex justify-between border-t-2 border-gray-200 p-2'>
            <div className='flex gap-2'>
            <h2>Status: </h2>
            <h2 className='text-lime-600'>{status}</h2>
            </div>
            
            <div className='text-center'>
              <button className='flex flex-col text-center align-middle justify-center'>
              <img src="file-text.svg" alt="" width={30} className='mx-auto'/>
              <a href={link}>
                <p>Unduh Notulensi</p>
              </a></button>
            </div>
        </span>
    </div>
  )
}
