import React from 'react'

interface Props {
  text: string
  roundedFull?: boolean
  py?: number
  onClick: () => void
}

function ButtonBorder({ text, onClick, roundedFull, py = 4 }: Props) {
  const roundedStyle = roundedFull ? 'rounded-full' : 'rounded-md'
  const pyStyle = `py-${py}`
  return (
    <button
      className={`w-full ${pyStyle} px-4 text-center bg-white text-primary border border-primary ${roundedStyle}`}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default ButtonBorder
