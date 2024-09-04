import { createContext, useContext, useState } from 'react';

const JobContext = createContext();

export const useJobs = () => useContext(JobContext);

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]); // Asumiendo que cargas los trabajos aquí o los recibes de una API

    return (
        <JobContext.Provider value={{ jobs, setJobs }}>
            {children}
        </JobContext.Provider>
    );
};
