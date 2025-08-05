import React from 'react'

export default function MemberLoading() {
  return (
<div className="bg-white w-xl rounded shadow-2xl mx-auto p-4 animate-pulse">
  <div className="flex text-cyan-500 gap-8">
    <div className="bg-gray-300 rounded-full w-20 h-20" />

    <div className="flex flex-col justify-between gap-4 flex-1">
      <div>
        <div className="bg-gray-300 h-6 w-40 rounded mb-2"></div>
        <div className="bg-gray-200 h-4 w-24 rounded"></div>
      </div>

      <div className="flex gap-2">
        <div className="bg-yellow-200 h-10 w-32 rounded-md"></div>
        <div className="bg-red-300 h-10 w-28 rounded-md"></div>
        <div className="bg-lime-300 h-10 w-24 rounded-md"></div>
      </div>
    </div>
  </div>
</div>

  )
}
