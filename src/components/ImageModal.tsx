import React from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  onClose: () => void;
  isDark: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, onClose, isDark }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
      onClick={onClose} // Close when clicking outside the image
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}> {/* Prevent modal from closing when clicking on the image itself */}
        <img 
          src={src} 
          alt={alt} 
          className="max-w-full max-h-[90vh] rounded-lg shadow-lg"
        />
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-white text-2xl font-bold p-2 rounded-full ${isDark ? 'bg-gray-800' : 'bg-gray-600'} hover:bg-gray-700`}
          aria-label="Cerrar"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
