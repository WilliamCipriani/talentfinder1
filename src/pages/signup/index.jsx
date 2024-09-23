import Image from 'next/image';
import React, { useState } from 'react';
import axios from '../../lib/axios';
import { useRouter } from 'next/router';

export default function Signup() {

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('/auth/register', {
        email: formData.email,
        password: formData.password,
        full_name: formData.fullName,
        role_id: 1,
      });

      if (response.status === 201) {
        alert('Usuario creado exitosamente');
        router.push('/');
      }
    } catch (error) {
      alert('Error al crear el usuario');
      console.error('Error:', error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-gray-100">
      <div className="flex-1 hidden lg:flex justify-center items-center">
        <Image
          src="/img/order-confirmed-2-78.png"
          alt="Imagen Descriptiva"
          layout="responsive"
          height={500}
          width={500}
          className="w-full"
        />
      </div>
      <div className="w-full max-w-md p-8 bg-white shadow-xl rounded-xl mx-4 my-6 lg:mx-8 lg:max-w-lg z-50">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Crear Cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-700 text-sm font-bold mb-2">Nombre Completo</label>
            <input 
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              id="fullName"
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
            <input 
              type="password" 
              id="password"
              value={formData.password}
              onChange={handleChange} 
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirmar Contraseña</label>
            <input 
              type="password" 
              id="confirmPassword" 
              value={formData.confirmPassword}
              onChange={handleChange}
              className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-500" />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out" type="submit">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
