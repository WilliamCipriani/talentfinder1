import { useState } from 'react';
import axios from '../lib/axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);

      console.log('Datos del usuario:', user);
      localStorage.setItem('user', JSON.stringify(user));

      if (user.role_id === 2 || user.role_id === 3) {
        router.push('/admin');
      } else {
        router.push('/inicio');
      }
    } catch (err) {
      setError('Login fallido. Por favor, verifica tu correo electrónico y contraseña.');
      console.error('Error durante el login:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col justify-center items-center">
      <div className="h-screen mx-8 sm:mx-20 md:mx-40 lg:mx-52 flex">
        <div className="flex flex-wrap items-center justify-center md:justify-between w-full">
          <div className="hidden md:block md:w-9/12 lg:w-6/12 xl:w-5/12">
            <Image
              src="/img/authentication.png"
              className="w-full"
              alt="Imagen de autenticación"
              layout="responsive"
              height={900}
              width={900}
            />
          </div>
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleLogin}>
              <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
              <div className="relative mb-6">
                <label htmlFor="email" className="block text-gray-700">Correo electrónico</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 leading-5 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  id="email"
                  placeholder="Introduce tu correo electrónico"
                  required
                />
              </div>
              <div className="relative mb-6">
                <label htmlFor="password" className="block text-gray-700">Contraseña</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 leading-5 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
                  id="password"
                  placeholder="Introduce tu contraseña"
                  required
                />
              </div>
              {error && <p className="mb-4 text-red-500">{error}</p>}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                    Recuérdame
                  </label>
                </div>
                <Link href="#" className="text-sm text-blue-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Iniciar Sesión
                </button>
                <p className="mt-4 text-sm">
                  ¿No tienes una cuenta?{' '}
                  <Link href="/signup" className="text-blue-600 hover:underline">
                    Regístrate
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
