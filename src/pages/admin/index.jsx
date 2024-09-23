import dynamic from 'next/dynamic';
import withAuthAdmin from '@/components/withAuthAdmin';

const AdminDashboard = dynamic(() => import('../../components/AdminDashboard'), { ssr: false });

const AdminPage = () => {
  return <AdminDashboard />;
};

export default withAuthAdmin(AdminPage);
