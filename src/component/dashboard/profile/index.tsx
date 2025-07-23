import React from 'react'

export default function ProfileSection({Username,Role}:{Username:string,Role:String}) {
  return (
    <div className="bg-white md:h-xl md:p-8 text-cyan-500 w-xl p-4 pb-1 shadow-2xl rounded text-center">
             <div className="text-start font-bold underline">Profile</div>
                <img src="https://i.pinimg.com/1200x/f6/c5/29/f6c529de57547aab9aad2bda16861697.jpg" className="w-40 rounded-full mx-auto" alt="" />
                <h1 className="font-bold text-2xl">{Username}</h1>
                <p>{Role}</p>
                <div className="border-t border-cyan-500 items-center flex justify-center">
                    <a href="" className="hover:text-red-500 transition-colors">lihat selengkapnya</a>
                </div>
            </div>
          )
}
