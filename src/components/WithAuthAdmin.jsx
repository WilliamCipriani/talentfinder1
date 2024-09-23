import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/userContext';

const withAuthAdmin = (WrappedComponent) => {
  return (props) => {
    const { user, setUser } = useUser();
    const router = useRouter();

    useEffect(() => {
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/'); // Redirigir al login si no hay usuario
      } else {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Verificar si el role_id es 2 o 3
        if (parsedUser.role_id !== 2 && parsedUser.role_id !== 3) {
          router.push('/inicio'); // Redirigir si no es admin
        }
      }
    }, [setUser, router]);

    if (!user) {
      return <p>Cargando...</p>; // Mostrar algo mientras se verifica el usuario
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthAdmin;
