import React from "react";

export default function SkewButton({ children, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-2 font-bold uppercase tracking-wide
        transform skew-x-[-15deg] 
        transition duration-200 cursor-pointer select-none
        ${className}
      `}
    >
      {/* đảo ngược skew để chữ không bị méo skew-x-[15deg]*/}
      {children}
    </button>
  );
}
