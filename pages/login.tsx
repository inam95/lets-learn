import { NextPage } from 'next';
import { useEffect } from 'react';
import { useUser } from '../context/userContext';

const Login: NextPage = () => {
  const { login } = useUser();
  useEffect(() => {
    async function signIn() {
      login();
    }
    signIn();
  }, [login]);

  return <div>Login</div>;
};

export default Login;
