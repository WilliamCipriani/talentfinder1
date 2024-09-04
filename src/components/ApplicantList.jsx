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
                <a href={applicant.secure_url} download className='border-2 px-3 rounded-lg text-blue-500 hover:text-blue-700'>
                  documento
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicantList;
