import { NextPage } from 'next';
import supabaseClient from '../utils/supabaseClient';
import { useEffect } from 'react';

const Login: NextPage = () => {
  useEffect(() => {
    async function signIn() {
      await supabaseClient.auth.signIn({
        provider: 'github'
      });
    }
    signIn();
  }, []);
  return <div>Login</div>;
};

export default Login;
