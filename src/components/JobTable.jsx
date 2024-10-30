import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import CreateJobForm from './CreateJobForm';
import axios from '../lib/axios';

const JobTable = () => {
    const [jobPositions, setJobPositions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await axios.get('/jobs/jobs');
          setJobPositions(response.data);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };
  
      fetchJobs();
    }, []);

    const handleCreateJob = (job) => {
        setJobPositions([...jobPositions, job]);
        setIsModalOpen(false);
        // Lógica para guardar el nuevo trabajo
    };

    const handleUpdateJob = async (updatedJob) => {
      try {
        const response = await axios.put(`/jobs/jobs/${selectedJob.id}`, updatedJob);
        setJobPositions(
          jobPositions.map((job) => (job.id === selectedJob.id ? response.data : job))
        );
        setSelectedJob(null);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error updating job:', error);
      }
    };

   // Función para eliminar un trabajo
   const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este puesto de trabajo?");
    if (confirmDelete) {
      try {
        await axios.delete(`/jobs/delete-job/${jobId}`);
        setJobPositions(jobPositions.filter(job => job.id !== jobId));
      } catch (error) {
        console.error('Error eliminando trabajo:', error);
      }
    }
  };


  // Abrir modal para editar un trabajo
  const handleEditJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Cerrar el modal y reiniciar el trabajo seleccionado
  const handleCloseModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <button className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}>
        Crear
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compañía</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título del trabajo</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salario</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Locación</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {jobPositions.map((job, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{job.company}</td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{job.title}</td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{job.salaryRange}</td>
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
              {/* Botón de editar */}
              <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                <button 
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditJob(job)}>
                  Editar
                </button>
                {/* Botón de eliminar */}
                <button 
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteJob(job.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {/* Modal para crear o editar un trabajo */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateJobForm job={selectedJob} onCreate={selectedJob ? handleUpdateJob : handleCreateJob}/>
      </Modal>
    </div>
  );
}

export default JobTable;
