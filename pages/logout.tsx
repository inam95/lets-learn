import { NextPage } from 'next';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';

const Logout: NextPage = () => {
  const { logout } = useUser();
  useEffect(() => {
    async function signOut() {
      logout();
    }
    signOut();
  }, [logout]);

  return <div>Logout</div>;
};

export default Logout;
