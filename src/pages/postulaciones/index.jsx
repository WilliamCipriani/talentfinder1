import { useEffect, useState } from 'react';
import Header from "@/components/Header";
import Layout from "@/components/Layout";
import PositionCard from "@/components/PositionCard";
import { useUser } from '@/context/userContext'
import axios from '@/lib/axios'

export default function MyPostulaciones() {
  const { user } = useUser();
  const [applications, setApplications] = useState([]);

  
  useEffect(() => {
    const fetchApplications = async () => {
      if (user) {
        try {
          // Obtener todas las postulaciones del usuario
          const response = await axios.get(`/applications/applications/${user.id}`);
          const fetchedApplications = response.data; // Guardamos las aplicaciones en una variable

          // Obtener todas las postulaciones rechazadas del usuario
          const rejectedResponse = await axios.get(`/applications/rejected/${user.id}`);
          const rejectedApplicants = rejectedResponse.data;

          // Actualizamos las aplicaciones, marcando las rechazadas
          const updatedApplications = fetchedApplications.map(application => {
            const isRejected = rejectedApplicants.some(rejected => rejected.job_id === application.job_id);
            return {
              ...application,
              status: isRejected ? 'rejected' : application.status
            };
          });

          // Actualizar el estado de las aplicaciones con las rechazadas
          setApplications(updatedApplications);
        } catch (error) {
          console.error('Error fetching applications or rejected applicants:', error);
        }
      }
    };

    fetchApplications();
  }, [user]);


  if (!user) {
    return <div>Loading...</div>;
  }
 
  return (
    <>
      <Header
        title="Postulaciones de Trabajo"
        subtitle="Conoce más sobre nuestras oportunidades de empleo."
        backgroundclassName="bg-hero-postulaciones"
      />
      <Layout>
        <div className="max-w-4xl mx-auto mt-10 space-y-4">
          {applications.map((application) => (
            <PositionCard
              key={application.id}
              title={application.title}
              description={application.company}
              status={application.status} 
            />
          ))} 
        </div>
      </Layout>
    </>
  );
}
