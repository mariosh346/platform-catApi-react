import { JSX } from 'react'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
  isLoading?: boolean
  error?: string
}

function Modal({ children, onClose, isLoading, error }: ModalProps): JSX.Element {
  const renderLoadingOrError = () => {
    if  (isLoading) return <p className='text-white text-center m-8'>Loading...</p>
    if  (error) return <p className='text-red-500 text-center m-8'>{error}</p>
  }
  return (
    <div
      className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-100 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        className='p-6 relative max-h-screen overflow-y-auto'
        onClick={e => { e.stopPropagation(); }}
      >
        <button type="button" onClick={onClose} className="absolute top-3 right-3 p-3">X</button>
        {renderLoadingOrError() ?? children}
      </div>
    </div>
  )
}

export default Modal
