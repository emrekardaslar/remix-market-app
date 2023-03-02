import { useEffect } from 'react'

export const Modal = ({ isOpen, onClose, children }: any) => {
  const handleEscape = (event: { keyCode: number }) => {
    if (event.keyCode === 27) {
      onClose()
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape, false)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape, false)
    }
  }, [isOpen])

  return isOpen ? (
    <div className='modal-overlay'>
      <div className='modal'>
        <div className='modal-header'>
          <button className='modal-close' onClick={onClose}>
            X
          </button>
        </div>
        <div className='modal-content'>{children}</div>
      </div>
    </div>
  ) : null
}
