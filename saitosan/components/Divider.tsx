import React from 'react'

interface Props {
  className?: string
}

function Divider({ className }: Props) {
  return (
    <div
      className={`flex items-center border-t border-gray-400 pb-3 text-xs text-gray-400 ${className}`}
    ></div>
  )
}

export default Divider
