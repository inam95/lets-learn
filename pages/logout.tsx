import { NextPage } from 'next';
import supabaseClient from '../utils/supabaseClient';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Logout: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    async function signOut() {
      await supabaseClient.auth.signOut();
    }
    signOut();
    router.push('/');
  });

  return <div>Logout</div>;
};

export default Logout;
