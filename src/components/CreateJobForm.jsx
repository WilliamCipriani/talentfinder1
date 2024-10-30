import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';

const CreateJobForm = ( { job: initialJob } ) => {
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
  const [companyImage, setCompanyImage] = useState(null); // Nuevo estado para la imagen de la empresa
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Initial job", initialJob);
    if (initialJob) {
      setJob({
        company: initialJob.company || '',
        type: initialJob.type || '',
        title: initialJob.title || '',
        location: initialJob.location || '',
        salaryRange: initialJob.salaryRange || '',
        description: initialJob.description || '',
        daysPosted: initialJob.daysPosted || 0,
        qualifications: initialJob.qualifications || '',
        responsibilities: initialJob.responsibilities || '',
        benefits: initialJob.benefits || ''
      });
      if (initialJob.companyImage) {
        const imageData = initialJob.companyImage.startsWith('data:image')
          ? initialJob.companyImage
          : `data:image/jpeg;base64,${initialJob.companyImage}`;
        setPreviewImage(imageData);
      }
    }
  }, [initialJob]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCompanyImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const qualificationsArray = job.qualifications.split('\n').filter(Boolean);
    const responsibilitiesArray = job.responsibilities.split('\n').filter(Boolean);
    const benefitsArray = job.benefits.split('\n').filter(Boolean);

    const formData = new FormData();
    formData.append('company', job.company);
    formData.append('type', job.type);
    formData.append('title', job.title);
    formData.append('location', job.location);
    formData.append('salaryRange', job.salaryRange);
    formData.append('description', job.description);
    formData.append('daysPosted', job.daysPosted);
    formData.append('qualifications', qualificationsArray.join('\n'));
    formData.append('responsibilities', responsibilitiesArray.join('\n'));
    formData.append('benefits', benefitsArray.join('\n'));

    if (companyImage) {
      formData.append('company_image', companyImage); // Adjuntar la imagen al FormData
    }

    try {
      const response = await axios.post('/jobs/create-job', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
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
        setCompanyImage(null);
      } else {
        alert('Error al crear el trabajo');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error.response || error.message);
      if (error.response) {
        console.error('Datos del error:', error.response.data);
      }
      alert('Error al enviar la solicitud');
    } finally {
      setLoading(false);
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

      {/* Campo para subir la imagen de la empresa */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Imagen de la Empresa</label>
        <input
          type="file"
          name="company_image"
          accept="image/*"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          onChange={handleImageChange} // Manejar la selección de la imagen
        />
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
          Escribe cada calificación en una nueva línea.
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
          Escribe cada responsabilidad en una nueva línea.
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
          Escribe cada beneficio en una nueva línea.
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
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            initialJob ? 'Actualizar' : 'Crear'
          )}
        </button>
      </div>
    </form>
  );
}

export default CreateJobForm;
