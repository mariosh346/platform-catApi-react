import { JSX, useEffect, useRef, useCallback, useMemo } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  title?: string; // Added for ARIA-labelledby
  description?: string; // Added for ARIA-describedby
}

function Modal({ children, onClose, title, description }: ModalProps): JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Basic focus trap (can be enhanced with a library like react-focus-lock)
  useEffect(() => {
    const focusableElements =
      modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      ) || [];
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    modalRef.current?.addEventListener('keydown', handleTabKeyPress);
    firstElement?.focus(); // Focus on the first element when modal opens

    return () => {
      modalRef.current?.removeEventListener('keydown', handleTabKeyPress);
    };
  }, [children]); // Re-run when modal content changes

  const modalId = useMemo(() => `modal-${Math.random().toString(36).substring(2, 9)}`, []);
  const titleId = title ? `${modalId}-title` : undefined;
  const descriptionId = description ? `${modalId}-description` : undefined;

  return (
    <div
      className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-100 flex justify-center items-center text-blue-500 z-50'
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      <div
        ref={modalRef}
        className='p-6 relative max-h-screen overflow-y-auto bg-white rounded-lg shadow-xl'
        onClick={(e) => {
          e.stopPropagation();
        }}
        tabIndex={-1} // Make modal content focusable
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 p-3 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          X
        </button>
        {title && <h2 id={titleId} className="text-xl font-bold mb-4">{title}</h2>}
        {description && <p id={descriptionId} className="mb-4">{description}</p>}
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal
