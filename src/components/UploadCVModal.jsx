import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';
import { FaTrash } from 'react-icons/fa';

export default function UploadCVModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null);
  const [userCV, setUserCV] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserCV = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/cv/user-cv', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'api_key': process.env.NEXT_PUBLIC_API_KEY
          }
        });
        setUserCV(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener el CV:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchUserCV();
    }
  }, [isOpen]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Solo se permiten archivos PDF');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
      setError('');
    } else {
      setFile(null);
      setError('Solo se permiten archivos PDF');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!file) {
      setError('Por favor, selecciona un archivo PDF antes de subir.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('cv', file);

    try {
      const response = await axios.post('/cv/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'api_key': process.env.NEXT_PUBLIC_API_KEY
        }
      });

      if (response.status === 201) {
        alert('CV subido exitosamente');
        setFile(null); // Limpiar el archivo
        onClose(); // Cierra el modal
      }
    } catch (error) {
      alert('Error al subir el CV');
      console.error('Error:', error.response?.data || error.message);
    } finally {
      setLoading(false); // Ocultar spinner después de la subida
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete('/cv/delete', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'api_key': process.env.NEXT_PUBLIC_API_KEY 
        }
      });

      if (response.status === 200) {
        alert('CV eliminado exitosamente');
        setUserCV(null);
      }
    } catch (error) {
      alert('Error al eliminar el CV');
      console.error('Error:', error.response?.data || error.message);
    } finally {
      setLoading(false); // Ocultar spinner después de eliminar
    }
  };

  const handleDownload = async (cvId) => {
    setLoading(true);
    try {
      const response = await axios.get(`/cv/download-cv/${cvId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'api_key': process.env.NEXT_PUBLIC_API_KEY
        },
        responseType: 'blob' // Asegúrate de que el archivo binario se maneje como un blob
      });
  
      // Crear un enlace de descarga
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `cv_usuario_${cvId}.pdf`); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
    } catch (error) {
      console.error('Error al descargar el CV:', error.response?.data || error.message);
      alert('Error al descargar el CV');
    } finally {
      setLoading(false); 
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Subir CV</h2>

        {loading && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {!loading && userCV && userCV.active === true && (
          <div className="mb-4">
            <p className="text-gray-700">Ya tienes un CV subido:</p>
            <div className='flex text-center items-center gap-x'>
            <button
              onClick={() => handleDownload(userCV.id)} 
              className="text-blue-500 underline"
            >
                Descargar CV
            </button>
              <button
                onClick={handleDelete}
                className="text-red-600 font-bold rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                <FaTrash className="mr-2" />
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div 
            className={`mb-4 ${dragActive ? 'border-blue-500 bg-gray-50' : 'border-gray-300'} flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500 hover:bg-gray-50`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <label htmlFor="cv" className="flex flex-col items-center justify-center w-full h-full">
              <svg className="w-8 h-8 text-gray-500 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18m-8-4v8m4-4h4m-4 4v4m0-4h4"></path>
              </svg>
              <span className="mt-2 text-sm text-gray-500">Arrastra y suelta tu archivo aquí o haz click para seleccionar</span>
              <input 
                id="cv" 
                type="file" 
                className="hidden" 
                onChange={handleFileChange} 
                accept=".pdf"
                required 
              />
            </label>
          </div>
          {file && <p className="text-gray-700 mb-4">Archivo seleccionado: {file.name}</p>}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex items-center justify-between">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-150 ease-in-out" type="submit">
              Subir CV
            </button>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
