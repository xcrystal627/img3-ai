import React from 'react'

interface Props {
  name: string
  value: string
  placeholder: string
  rows?: number
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function Textarea({
  name,
  value,
  placeholder,
  rows = 3,
  disabled = false,
  onChange,
}: Props) {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      rows={rows}
      disabled={disabled}
      className="mt-2 block w-full rounded-md border border-gray-200 px-4 py-3 text-sm focus:outline-none"
    ></textarea>
  )
}

export default Textarea
