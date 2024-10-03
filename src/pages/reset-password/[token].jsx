import { useState } from 'react';
import axios from '../../lib/axios';
import { useRouter } from 'next/router';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { token } = router.query; // Obtenemos el token de la URL

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Realiza la solicitud a la API para restablecer la contraseña
      const response = await axios.post(`/auth/reset-password/${token}`, { newPassword });
      setMessage('Tu contraseña ha sido restablecida exitosamente.');
      setError('');
    } catch (err) {
      setError('No se pudo restablecer la contraseña. Inténtalo nuevamente.');
      console.error('Error al restablecer la contraseña:', err);
    } finally {
      setLoading(false); // Desactivar estado de carga
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Restablecer Contraseña</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        {error && <p className="mb-4 text-red-500">{error}</p>}
        <form onSubmit={handleResetPassword}>
          <div className="mb-6">
            <label htmlFor="newPassword" className="block text-gray-700">Nueva Contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 leading-5 outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              id="newPassword"
              placeholder="Introduce tu nueva contraseña"
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
                'Restablecer Contraseña'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
