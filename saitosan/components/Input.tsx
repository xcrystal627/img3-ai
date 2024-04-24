import React from 'react'

interface Props {
  type?: string
  name: string
  value: string | number
  placeholder: string
  autoFocus?: boolean
  autoComplete?: 'on' | 'off' | 'one-time-code'
  textAlign?: 'center' | 'left'
  className?: string
  style?: React.CSSProperties
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({
  type = 'text',
  name,
  value,
  placeholder,
  autoFocus = false,
  autoComplete = 'on',
  textAlign = 'left',
  className,
  style,
  onChange,
}: Props) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      onChange={onChange}
      className={`block w-full rounded-md border border-gray-200 px-4 py-3 text-sm text-${textAlign} focus:outline-none ${className}}`}
      style={style}
    ></input>
  )
}

export default Input
