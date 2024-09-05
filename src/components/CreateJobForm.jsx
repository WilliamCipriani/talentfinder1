// components/CreateJobForm.jsx
import React, { useState } from 'react';

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      const token = localStorage.getItem('token');
      console.log('Token:', token);

      const response = await fetch('https://talentfinderapi-b7aqezaechc4gddd.centralus-01.azurewebsites.net/jobs/create-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Asegúrate de tener el token guardado en localStorage
        },
        body: JSON.stringify(newJob)
      });

      console.log('Response status:', response.status);

      if (response.ok) {
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
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert('Error al crear el trabajo');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud');
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
        <textarea
          name="benefits"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={job.benefits}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Crear
        </button>
      </div>
    </form>
  );
}

export default CreateJobForm;
