// components/Modal.jsx
import React from 'react';
import { XIcon } from '@heroicons/react/solid';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all lg:max-w-4xl sm:max-w-lg sm:w-full max-h-full p-5">
        <div className="px-6 py-6 sm:p-6 overflow-auto max-h-full">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Crear Nuevo Puesto de Trabajo
              </h3>
            </div>
            <button 
              className="ml-auto bg-red-100 rounded-full p-1 text-red-600 hover:text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={onClose}
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="mt-4 overflow-y-auto max-h-96">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
