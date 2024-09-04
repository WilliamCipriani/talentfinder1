import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';

const Sidebar = ({ setView }) => {
  const [showJobs, setShowJobs] = useState(false);
  const [jobPositions, setJobPositions] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('jobs/jobs');
        const jobs = response.data;
        
        // Agrupar los trabajos por compañía y contar la cantidad de puestos de trabajo
        const companies = jobs.reduce((acc, job) => {
          if (acc[job.company]) {
            acc[job.company]++;
          } else {
            acc[job.company] = 1;
          }
          return acc;
        }, {});

        // Convertir el objeto en un array de { company, count }
        const groupedJobs = Object.keys(companies).map(company => ({
          company,
          count: companies[company]
        }));

        setJobPositions(groupedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleShowJobs = () => {
    setShowJobs(!showJobs);
  };

  const handleCompanyClick = (company) => {
    setView({ view: 'applicantList', company });
  };

  return (
    <div className="bg-gray-200 p-4 w-64">
      <button 
        className="bg-gray-300 text-black px-4 py-2 rounded w-full text-left mt-20"
        onClick={() => setView({ view: 'jobTable' })}
      >
        Crear puesto de trabajo
      </button>
      <div>
        <button 
          className="bg-gray-300 text-black px-4 py-2 rounded w-full text-left mt-10" 
          onClick={handleShowJobs}
        >
          Compañías de Trabajo ({jobPositions.length})
        </button>
        {showJobs && (
          <ul className="mt-2">
            {jobPositions.map((job, index) => (
              <li 
                key={index} 
                className="py-2 pl-4 text-black hover:bg-gray-300 cursor-pointer"
                onClick={() => handleCompanyClick(job.company)}
              >
                {job.company} ({job.count})
              </li>
            ))}
          </ul>
        )}
      </div>
      <button 
        className="bg-gray-300 text-black px-4 py-2 rounded w-full text-left mt-10"
        onClick={() => setView({ view: 'dashboard' })}
      >
        Dashboard
      </button>
    </div>
  );
}

export default Sidebar;
