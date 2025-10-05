import React from 'react'
import { FaSpinner } from 'react-icons/fa'

 const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'><FaSpinner className='animate-spin'/></div>
  )
}
export default Loading