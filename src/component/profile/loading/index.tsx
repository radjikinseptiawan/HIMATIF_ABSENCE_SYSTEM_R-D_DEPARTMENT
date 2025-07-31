import React from 'react'

export default function ProfileSkeleton() {
  return (
    <div className='min-h-screen'>
      <div className='bg-white w-full h-1/2 max-w-3xl p-6 mx-auto my-4 rounded-lg shadow-lg mt-10 animate-pulse'>
        <h1 className='text-cyan-500 font-extrabold text-4xl text-center mb-6 underline'>
          Profile
        </h1>

        <div className='flex justify-center mb-6'>
          <div className='rounded-full bg-gray-200 border-4 border-cyan-300 w-[200px] h-[200px]'></div>
        </div>

        <div className='text-start text-cyan-700 text-lg space-y-4 px-4'>
          <div>
            <div className='h-5 w-32 bg-gray-200 rounded mb-2'></div>
            <div className='space-y-2 ml-4'>
              <div className='h-4 w-3/4 bg-gray-200 rounded'></div>
              <div className='h-4 w-2/3 bg-gray-200 rounded'></div>
              <div className='h-4 w-4/5 bg-gray-200 rounded'></div>
              <div className='h-4 w-2/3 bg-gray-200 rounded'></div>
              <div className='h-4 w-3/5 bg-gray-200 rounded'></div>
              <div className='h-4 w-2/4 bg-gray-200 rounded'></div>
              <div className='h-4 w-1/3 bg-gray-200 rounded'></div>
            </div>
          </div>

          <div>
            <div className='h-5 w-40 bg-gray-200 rounded mb-2'></div>
            <div className='space-y-2 ml-4'>
              <div className='h-4 w-2/3 bg-gray-200 rounded'></div>
              <div className='h-4 w-1/2 bg-gray-200 rounded'></div>
            </div>

            <div className='mt-4'>
              <div className='grid grid-cols-3 gap-2 mb-2'>
                <div className='h-6 bg-gray-300 rounded'></div>
                <div className='h-6 bg-gray-300 rounded'></div>
                <div className='h-6 bg-gray-300 rounded'></div>
              </div>
              <div className='space-y-2'>
                {[1, 2, 3].map((i) => (
                  <div key={i} className='grid grid-cols-3 gap-2'>
                    <div className='h-4 bg-gray-200 rounded'></div>
                    <div className='h-4 bg-gray-200 rounded'></div>
                    <div className='h-4 bg-gray-200 rounded'></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tombol edit */}
        <div className='flex justify-end mt-6'>
          <div className='bg-yellow-200 w-52 h-10 rounded-md shadow-lg'></div>
        </div>
      </div>
    </div>
  )
}
