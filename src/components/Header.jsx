import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import UploadCVModal from './UploadCVModal';
import NotificationModal from './NotificationModal';
import { FaRegUser, FaBell } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useUser } from '@/context/userContext';
import Link from 'next/link';
import axios from '../lib/axios';

export default function Header({ title, subtitle, backgroundClass }) {
  const { user, setUser } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [profileImage, setProfileImage] = useState(null); // Estado para la imagen de perfil del usuario
  const [isImageModalOpen, setIsImageModalOpen] = useState(false); // Modal para subir imagen
  const [image, setImage] = useState(null); // Almacena la imagen seleccionada

  const router = useRouter();

  // Obtener la imagen de perfil del usuario desde el backend
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (user && user.id) {
        try {
          const response = await axios.get(`/users/profile-image/${user.id}`, {
            responseType: 'blob' // Asegúrate de obtener la imagen como blob
          });
          const imageUrl = URL.createObjectURL(response.data);
          setProfileImage(imageUrl);
        } catch (error) {
          console.error('Error al obtener la imagen del perfil:', error);
        }
      }
    };

    fetchProfileImage();
  }, [user]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Abrir modal para subir la imagen
  const openImageModal = () => setIsImageModalOpen(true);
  const closeImageModal = () => setIsImageModalOpen(false);

  // Subir imagen al backend
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if (!image) return;

    const formData = new FormData();
    formData.append('profile_image', image); // Nombre del campo esperado por el backend

    try {
      await axios.post(`/users/upload-image/${user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Imagen subida exitosamente');
      closeImageModal();
      // Refrescar la imagen del perfil
      const imageUrl = URL.createObjectURL(image);
      setProfileImage(imageUrl);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un error al subir la imagen.');
    }
  };

  // Manejar el archivo de imagen seleccionado
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const toggleNotificationModal = async () => {
    if (!isNotificationModalOpen) {
      if (user && user.id) {
        try {
          const response = await axios.get(`/applications/applications/${user.id}`);
          const filteredNotifications = response.data.filter(application => application.status === 'pasó');
          setNotifications(filteredNotifications);
        } catch (error) {
          console.error('Error al obtener las notificaciones:', error);
        }
      } else {
        console.error('No se encontró el ID del usuario.');
      }
    }
    setIsNotificationModalOpen(!isNotificationModalOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  return (
    <div>
      <div className="w-full h-16 bg-gray-800 flex justify-between items-center px-4 md:px-6">
        <div className="flex items-center space-x-4">
          {/* Mostrar la imagen si existe, si no mostrar el ícono de usuario */}
          {profileImage ? (
            <img src={profileImage} alt="Perfil" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <FaRegUser className="text-white text-2xl" />
          )}
          <span className="text-white">{user ? user.full_name : 'Usuario'}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <FaBell className="text-white text-2xl cursor-pointer" onClick={toggleNotificationModal} />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {notifications.length}
              </span>
            )}
            <NotificationModal isOpen={isNotificationModalOpen} notifications={notifications} onClose={toggleNotificationModal} />
          </div>
          <button onClick={openImageModal} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition duration-300">
            Subir Imagen
          </button>
          <button onClick={openModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300">
            Subir CV
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300"
            >
              Cerrar sesión
            </button>
          )}
          <button onClick={toggleMenu} className="block md:hidden text-white focus:outline-none">
            {menuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="w-full bg-gray-800 text-white flex flex-col items-center py-4 space-y-4 md:hidden">
          <Link href="/" className="text-white hover:text-gray-400 transition duration-300">
            Inicio
          </Link>
          <Link href="/mis-postulaciones" className="text-white hover:text-gray-400 transition duration-300">
            Mis Postulaciones
          </Link>
          <button onClick={openModal} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-300">
            Subir CV
          </button>
          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      )}

      <UploadCVModal isOpen={isModalOpen} onClose={closeModal} />
      
      {/* Modal para subir la imagen */}
      {isImageModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-center">Subir Imagen de Perfil</h2>
            <form onSubmit={handleImageUpload} className="space-y-4">
              <div className="text-center">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange} 
                  className="text-gray-600 bg-gray-100 px-4 py-2 rounded-lg cursor-pointer w-full focus:outline-none"
                />
              </div>
              <div className="flex justify-center space-x-4">
                <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition duration-300">
                  Subir
                </button>
                <button type="button" onClick={closeImageModal} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition duration-300">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div
        className={`relative ${backgroundClass} h-64 md:h-80 flex items-center justify-center text-center bg-cover bg-center`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-white z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">{title}</h1>
            <p className="text-lg md:text-xl">{subtitle}</p>
            <div className="flex justify-center gap-x-10 mt-4">
              <Link href="/inicio" className="text-white text-lg hover:text-gray-400 transition duration-300 underline">
                Inicio
              </Link>
              <Link href="/postulaciones" className="text-white text-lg hover:text-gray-400 transition duration-300 underline">
                Mis Postulaciones
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
