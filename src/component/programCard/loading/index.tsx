import React from 'react'

export default function ProgramCardSkeleton() {
  return (
    <div className='bg-white rounded-md shadow-2xl text-cyan-600 p-5 w-1/2 mx-auto my-2 animate-pulse'>
      <span className='flex justify-between border-b-2 mb-4'>
        <div className='w-1/3 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/2 h-4 bg-gray-200 rounded'></div>
      </span>

      <span className='flex gap-2 items-center mb-2'>
        <div className='w-1/4 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/2 h-4 bg-gray-200 rounded'></div>
      </span>

      <span className='flex gap-2 items-center mb-2'>
        <div className='w-1/4 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/2 h-4 bg-gray-200 rounded'></div>
      </span>

      <span className='flex gap-2 items-center mb-2'>
        <div className='w-1/4 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/2 h-4 bg-gray-200 rounded'></div>
      </span>

      <span className='flex gap-2 items-center mb-2'>
        <div className='w-1/4 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/2 h-4 bg-gray-200 rounded'></div>
      </span>

      <span className='flex gap-2 items-center mb-4'>
        <div className='w-1/4 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/2 h-4 bg-gray-200 rounded'></div>
      </span>

      <span className='flex justify-between border-t-2 pt-4'>
        <div className='w-1/3 h-4 bg-gray-200 rounded'></div>
        <div className='w-1/4 h-4 bg-gray-200 rounded'></div>
      </span>
    </div>
  )
}
