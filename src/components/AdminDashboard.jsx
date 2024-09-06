import React, { useState } from 'react';
import Sidebar from './Slidebar';
import Navbar from './Navbar';
import JobTable from './JobTable';
import ApplicantList from './ApplicantList';
import Dashboard from './Dashboard';

const AdminDashboard = () => {
  const [view, setView] = useState({ view: 'jobTable', company: null });

  const renderView = () => {
    switch(view.view) {
      case 'jobTable':
        return <JobTable />;
      case 'applicantList':
        return <ApplicantList company={view.company} />;
      case 'dashboard':
        return <Dashboard />; 
      default:
        return <JobTable />;
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar setView={setView} /> 
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="p-4">
          {renderView()} {/* Renderiza la vista seleccionada */}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
