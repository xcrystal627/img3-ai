import React from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function Modal({ isOpen, onClose, children }: Props) {
  return (
    <>
      {isOpen && (
        <div className="fixed left-1/2 top-1/2 h-screen w-full -translate-x-1/2 -translate-y-1/2 transform ">
          <div
            className="h-screen w-full bg-black opacity-40"
            onClick={onClose}
          ></div>

          <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 transform">
            {children}
          </div>
        </div>
      )}
    </>
  )
}

export default Modal
