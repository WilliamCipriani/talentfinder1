import axios from 'axios';

const instance = axios.create({
  //baseURL: 'https://talentfinderapi-b7aqezaechc4gddd.centralus-01.azurewebsites.net',
  baseURL: 'http://localhost:8000',
});

if (typeof window !== 'undefined') {
  instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');  // Obtener el token JWT
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;  // Obtener la API key desde el entorno

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Añadir el token JWT al encabezado Authorization
    }

    if (apiKey) {
      config.headers['api_key'] = apiKey;  // Añadir la API key al encabezado
    }

    return config;
  });
}


export default instance;
