import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SearchJob from "@/components/SearchJob";
import JobCard from "@/components/JobCard";
import Header from "@/components/Header";
import Pagination from "@/components/Pagination"
import { useUser } from '@/context/userContext';
import axios from '../../lib/axios';

export default function InicioPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 4; // Mostrar 4 trabajos por página

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobs/jobs'); 
        const sortedJobs = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setJobs(sortedJobs);
        setFilteredJobs(sortedJobs);
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
    setCurrentPage(1); // Reiniciar a la primera página cuando se realice una búsqueda
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

  // Obtener los trabajos de la página actual
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Cargando trabajos...</p>;
  if (error) return <p>Error al cargar trabajos: {error}</p>;

  return (
    <>
      <Header
        title="Trabajos Disponibles"
        subtitle="Conoce más sobre nuestras oportunidades de empleo."
        backgroundclassName="bg-hero-inicio"
        userName={user ? user.full_name : 'Usuario'}
      />
      <Layout>
        <SearchJob onSearch={handleSearch} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 m-4 justify-items-center">
          {currentJobs.map((job, index) => (
            <JobCard key={index} job={job} jobId={index} />
          ))}
        </div>

        {filteredJobs.length > jobsPerPage && (
          <Pagination
            jobsPerPage={jobsPerPage}
            totalJobs={filteredJobs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </Layout>
    </>
  );
}
