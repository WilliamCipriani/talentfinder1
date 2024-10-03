import { useState } from 'react';
import axios from '../../lib/axios';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      // Realiza la solicitud a la API de recuperación de contraseña
      const response = await axios.post('/auth/forgot-password', { email });
      setMessage('Hemos enviado un enlace a tu correo para restablecer tu contraseña.');
      setError('');
    } catch (err) {
      setError('No se pudo enviar el enlace de recuperación. Verifica tu correo electrónico.');
      console.error('Error al solicitar recuperación de contraseña:', err);
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Recuperar Contraseña</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleForgotPassword}>
          <div className="mb-6">
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
          <div className="text-center">
            <button
              type="submit"
              className="w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {loading ? ( // Mostrar spinner mientras está cargando
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span className="ml-2">Cargando...</span>
                </div>
              ) : (
                'Enviar Enlace de Recuperación'
              )}
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm">
          ¿Ya tienes una cuenta?{' '}
          <Link href="/" className="text-blue-600 hover:underline">
            Iniciar Sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
