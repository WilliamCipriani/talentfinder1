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
          const response = await axios.get(`/applications/applications/${user.id}`);
          setApplications(response.data);
        } catch (error) {
          console.error('Error fetching applications:', error);
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
