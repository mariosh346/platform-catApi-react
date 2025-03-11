import React from 'react'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

function Modal({ children, onClose }: ModalProps): JSX.Element {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{ backgroundColor: 'white', padding: 20, position: 'relative' }}
        onClick={e => { e.stopPropagation(); }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>X</button>
        {children}
      </div>
    </div>
  )
}

export default Modal
