import React, { useEffect, useState } from 'react';
import axios from '../lib/axios';

const ApplicantList = ({ company }) => {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/jobs/applications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filteredApplicants = response.data.filter(applicant => applicant.company === company);
        setApplicants(filteredApplicants);
      } catch (error) {
        console.error('Error fetching applicants:', error);
      }
    };

    if (company) {
      fetchApplicants();
    }
  }, [company]);

   // Función para manejar la descarga del CV
  const handleDownload = async (cvId, fullName) => {
    try {
      const response = await axios.get(`/cv/download-cv/${cvId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        responseType: 'blob', // Esto asegura que obtienes el archivo binario como Blob
      });

      // Limpiar el nombre del postulante para usarlo como nombre de archivo
      const cleanedName = fullName
        ? fullName.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '') // Reemplazar espacios y caracteres no permitidos
        : `cv_${cvId}`; 

      // Crear un enlace de descarga y hacer clic en él programáticamente
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${cleanedName}_CV.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CV:', error);
      alert('Error al descargar el CV');
    }
  };

  return (
    <div className="m-5">
      <h2 className="text-xl font-bold mb-4">Postulantes Activos <span>({applicants.length})</span></h2>
      <ul>
        {applicants.map((applicant, index) => (
          <li key={index} className="flex items-center justify-between p-4 bg-white mb-4 rounded shadow">
            <div className="flex items-center">
              <img src="/img/perfil.png" alt={applicant.full_name} className="w-10 h-10 rounded-full" />
              <div className="ml-4 flex gap-x-10">
                <div className="font-bold">{applicant.full_name}</div>
                <div>{applicant.company}</div>
                <div>{applicant.title}</div>
                <div>{applicant.salaryRange}</div>
                <button 
                  onClick={() => handleDownload(applicant.cv_id, applicant.full_name)} // Usar el ID del CV para descargar
                  className='border-2 px-3 rounded-lg text-blue-500 hover:text-blue-700'
                >
                  Documento
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicantList;
