import { useEffect, useState } from 'react';
import axios from '../lib/axios';

const ViewJobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get('/api/jobs');
                setJobs(response.data);
            } catch (error) {
                console.error('Error al obtener los puestos:', error);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Puestos Creados</h2>
            <div className="space-y-4">
                {jobs.map((job) => (
                    <div key={job.id} className="border-2 border-gray-300 rounded-md p-4">
                        <h3 className="text-lg font-bold">{job.title}</h3>
                        <p>{job.company}</p>
                        <p>{job.type}</p>
                        <p>{job.location}</p>
                        <p>{job.salaryRange}</p>
                        <p>{job.description}</p>
                        <p>{job.daysPosted} días publicados</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ViewJobs;
