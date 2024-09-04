import dynamic from 'next/dynamic';

const AdminDashboard = dynamic(() => import('../../components/AdminDashboard'), { ssr: false });

const AdminPage = () => {
  return <AdminDashboard />;
};

export default AdminPage;
