import React from 'react'

function Label({ children }: { children: string }) {
  return (
    <label className="mb-2 block text-sm font-medium text-slate-600">
      {children}
    </label>
  )
}

export default Label
