import React, { ChangeEvent } from 'react'

interface Props {
  name: string
  value: string
  checked: boolean
  onCheckedChange: (value: string, checked: boolean) => void
}

function Checkbox({ name, value, checked, onCheckedChange }: Props) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onCheckedChange(value, event.target.checked)
  }

  return (
    <div>
      <input
        id={name}
        type="checkbox"
        checked={checked}
        value={value}
        onChange={handleChange}
      />
      <label htmlFor={name} className="ml-2">
        {name}
      </label>
    </div>
  )
}

export default Checkbox
