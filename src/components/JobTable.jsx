import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import CreateJobForm from './CreateJobForm';
import axios from '../lib/axios';

const JobTable = () => {
    const [jobPositions, setJobPositions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await axios.get('jobs/jobs');
          setJobPositions(response.data);
        } catch (error) {
          console.error('Error fetching jobs:', error);
        }
      };
  
      fetchJobs();
    }, []);

    const handleCreateJob = (job) => {
        console.log(job);
        setIsModalOpen(false);
        // Lógica para guardar el nuevo trabajo
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {jobPositions.map((job, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{job.company}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{job.title}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{job.salaryRange}</td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <CreateJobForm onCreate={handleCreateJob} />
      </Modal>
    </div>
  );
}

export default JobTable;
