import React, { useState } from 'react';
import axios from '../lib/axios';

const CreateJobForm = () => {
  const [job, setJob] = useState({
    company: '',
    type: '',
    title: '',
    location: '',
    salaryRange: '',
    description: '',
    daysPosted: 0,
    qualifications: '',
    responsibilities: '',
    benefits: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Convertir los campos de texto separados por saltos de línea en arreglos
    const qualificationsArray = job.qualifications.split('\n').filter(Boolean);
    const responsibilitiesArray = job.responsibilities.split('\n').filter(Boolean);
    const benefitsArray = job.benefits.split('\n').filter(Boolean);

    const newJob = {
      ...job,
      qualifications: qualificationsArray,
      responsibilities: responsibilitiesArray,
      benefits: benefitsArray,
    };

    console.log('Submitting new job:', newJob);

    try {

      const response = await axios.post('/jobs/create-job', newJob, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status >= 200 && response.status < 300) {
        alert('Trabajo creado exitosamente');
        setJob({
          company: '',
          type: '',
          title: '',
          location: '',
          salaryRange: '',
          description: '',
          daysPosted: 0,
          qualifications: '',
          responsibilities: '',
          benefits: ''
        });
      } else {
        console.error('Error en la respuesta:', response.data); 
        alert('Error al crear el trabajo');
      }
    } catch (error) {
      // Log completo del error para entender qué está pasando
      console.error('Error al enviar la solicitud:', error.response || error.message);
      if (error.response) {
        console.error('Datos del error:', error.response.data); // Ver detalles del error en la respuesta
      }
      alert('Error al enviar la solicitud');
    } finally {
      setLoading(false); // Desactivar el spinner
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre de la Empresa</label>
          <input
            type="text"
            name="company"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={job.company}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tipo de Trabajo</label>
          <input
            type="text"
            name="type"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={job.type}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título del Trabajo</label>
          <input
            type="text"
            name="title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={job.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Ubicación del Trabajo</label>
          <input
            type="text"
            name="location"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={job.location}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Rango Salarial</label>
          <input
            type="text"
            name="salaryRange"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={job.salaryRange}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Días Publicado</label>
          <input
            type="number"
            name="daysPosted"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={job.daysPosted}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción General</label>
        <textarea
          name="description"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={job.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Calificaciones</label>
        <p className="text-sm text-gray-500 mt-1">
          Escribe cada calificación en una nueva línea. Ejemplo:
          <br />
          Experiencia en desarrollo web
          <br />
          Conocimiento en React y Node.js
          <br />
          Trabajo en equipo
        </p>
        <textarea
          name="qualifications"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={job.qualifications}
          onChange={handleChange}
          required
        />
        
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Responsabilidades</label>
        <p className="text-sm text-gray-500 mt-1">
          Escribe cada responsabilidad en una nueva línea. Ejemplo:
          <br />
          Supervisar el equipo de desarrollo
          <br />
          Mantener actualizadas las bases de datos
          <br />
          Coordinar con el cliente
        </p>
        <textarea
          name="responsibilities"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={job.responsibilities}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Beneficios</label>
        <p className="text-sm text-gray-500 mt-1">
          Escribe cada beneficio en una nueva línea. Ejemplo:
          <br />
          Seguro médico
          <br />
          Bono anual por desempeño
          <br />
          Flexibilidad en horario
        </p>
        <textarea
          name="benefits"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={job.benefits}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
          disabled={loading} // Deshabilitar mientras está en modo de carga
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> // Spinner
          ) : (
            'Crear'
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateJobForm;
