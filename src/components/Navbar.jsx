import React from 'react';
import { useUser } from '@/context/userContext';

const Navbar = () => {
  const { user } = useUser();

  return (
    <div className="bg-white shadow p-4 flex items-center justify-between m-5 h-28">
      <div className="flex items-center">
        <img src="/img/trabajando.png" alt="Avatar administrador" className="w-14 h-14 rounded-full " />
        <span className="ml-4 text-lg font-bold">Bienvenido {user ? user.full_name : 'Usuario'}</span>
      </div>
    </div>
  );
}

export default Navbar;
