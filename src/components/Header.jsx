import React, { useState } from 'react';
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

  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleNotificationModal = async () => {
    if (!isNotificationModalOpen) {
      if (user && user.id) {
        try {
          const response = await axios.get(`/applications/applications/${user.id}`);
          const filteredNotifications = response.data.filter(application => application.status === 'pasó');
          setNotifications(filteredNotifications);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      } else {
        console.error('User ID is not available.');
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
        <FaRegUser className="text-white text-2xl" />
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
