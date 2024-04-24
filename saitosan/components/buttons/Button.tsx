import React from 'react'

interface Props {
  id?: string
  type?: 'submit' | 'button'
  text: string
  roundedFull?: boolean
  textColor?: string
  bgColor?: string
  py?: number
  className?: string
  onClick?: () => void
}

function Button({
  id,
  type,
  text,
  onClick,
  roundedFull = false,
  textColor,
  bgColor,
  py = 4,
  className,
}: Props) {
  const roundedStyle = roundedFull ? 'rounded-full' : 'rounded-md'
  const pyStyle = `py-${py}`
  const textColorStyle = textColor ? `${textColor}` : 'text-white'
  const bgColorStyle = bgColor
    ? `${bgColor}`
    : 'bg-gradient-to-r from-primary to-primary600'
  return (
    <button
      id={id}
      type={type}
      className={`
      w-full px-4 text-center 
      ${pyStyle} ${bgColorStyle} ${textColorStyle} ${roundedStyle}
      ${className}
      `}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
