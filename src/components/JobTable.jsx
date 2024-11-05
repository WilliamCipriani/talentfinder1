import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import CreateJobForm from "./CreateJobForm";
import axios from "../lib/axios";

const JobTable = () => {
  const [jobPositions, setJobPositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/jobs/jobs");
      console.log(response.data);
      setJobPositions(response.data);
      console.log(`Puestos recibidos: ${response.data.length}`);
      
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleCreateJob = () => {
    setIsModalOpen(false);
    setSuccessMessage("Trabajo creado exitosamente");
    setShowSuccessMessage(true);

    // Llama a fetchJobs para obtener la lista actualizada de trabajos
    fetchJobs();

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleUpdateJob = (updatedJob) => {
    setJobPositions(
      jobPositions.map((job) => (job.id === updatedJob.id ? updatedJob : job))
    );
    setSelectedJob(null);
    setIsModalOpen(false);
    setSuccessMessage("Trabajo actualizado exitosamente");
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Función para eliminar un trabajo
  const handleDeleteJob = async (jobId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este puesto de trabajo?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`/jobs/delete-job/${jobId}`);
        setJobPositions(jobPositions.filter((job) => job.id !== jobId));
        setSuccessMessage("Trabajo eliminado exitosamente"); // Configurar mensaje de éxito para eliminación
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      } catch (error) {
        console.error("Error eliminando trabajo:", error);
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
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobPositions.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(jobPositions.length / itemsPerPage);

  return (
    <div className="p-4">
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-500">
          {successMessage}
        </div>
      )}
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsModalOpen(true)}
      >
        Crear
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Compañía
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título del trabajo
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Salario
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Locación
              </th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-100">
                <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                  {job.company}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                  {job.title}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                  {job.salaryRange}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                  {job.location}
                </td>
                <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">
                  {/*<button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditJob(job)}
                  >
                    Editar
                  </button>*/}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDeleteJob(job.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center my-4">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            } mx-1`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      {/* Modal para crear o editar un trabajo */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateJobForm
          job={selectedJob}
          onCreate={selectedJob ? handleUpdateJob : handleCreateJob}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default JobTable;
