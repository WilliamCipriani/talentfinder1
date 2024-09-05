import axios from 'axios';

const instance = axios.create({
  baseURL: 'talentfinderapi-b7aqezaechc4gddd.centralus-01.azurewebsites.net', // Ajusta la URL base según sea necesario
});

// Añadir un interceptor para enviar el token en cada solicitud
if (typeof window !== 'undefined') {
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export default instance;
