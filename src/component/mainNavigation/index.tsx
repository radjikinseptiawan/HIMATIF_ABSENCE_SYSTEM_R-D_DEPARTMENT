import React from 'react'

export default function MainNavigation({action1,action2}:{action2:()=>void,action1:()=>void}) {
  return (
      <div className="bg-cyan-600 z-30 gap-2 justify-end flex fixed top-0 w-full p-1">
        <button onClick={action1} className="border-4 border-cyan-400 bg-white p-2 text-black rounded-2xl hover:shadow-2xl cursor-pointer">Login</button>
        <button onClick={action2} className="border-4 border-cyan-400 bg-white p-2 text-black rounded-2xl hover:shadow-2xl cursor-pointer">Register</button>
      </div>
  )
}
