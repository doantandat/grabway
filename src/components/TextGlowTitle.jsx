import React from 'react'

 const TextGlowTitle = ({text,className}) => {
  return (
    <h1 className={`font-batman text-3xl font-bold text-white
    drop-shadow-[0_0_10px_rgba(59,130,246,.9)]
    md:drop-shadow-[0_0_18px_rgba(59,130,246,.9)] ${className}`}>{text}</h1>
  )
}
export default TextGlowTitle;