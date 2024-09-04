import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SearchJob from "@/components/SearchJob";
import JobCard from "@/components/JobCard";
import Header from "@/components/Header";
import { useUser } from '@/context/userContext';
import axios from 'axios';

export default function InicioPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/jobs/jobs'); // Usa tu endpoint de la API
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, [setUser]);

  const handleSearch = (term, type) => {
    setSearchTerm(term);
    setJobType(type);
    filterJobs(term, type);
  };

  const filterJobs = (term, type) => {
    let filtered = jobs;

    if (term) {
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (type) {
      filtered = filtered.filter((job) =>
        job.type.toLowerCase() === type.toLowerCase()
      );
    }

    setFilteredJobs(filtered);
  };

  if (loading) return <p>Cargando trabajos...</p>;
  if (error) return <p>Error al cargar trabajos: {error}</p>;

  return (
    <>
      <Header
        title="Trabajos Disponibles"
        subtitle="Conoce más sobre nuestras oportunidades de empleo."
        backgroundClass="bg-hero-inicio"
        userName={user ? user.full_name : 'Usuario'}
      />
      <Layout>
        <SearchJob onSearch={handleSearch} />
        <div className="flex justify-center items-center flex-wrap m-4">
          {filteredJobs.map((job, index) => (
            <JobCard key={index} job={job} jobId={index} />
          ))}
        </div>
      </Layout>
    </>
  );
}
