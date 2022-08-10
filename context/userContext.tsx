import { User as UserType } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';
import supabaseClient from '../utils/supabaseClient';

type UserContextType = {
  user: any;
  login: () => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>({
  user: null,
  login: () => {},
  logout: () => {}
});
UserContext.displayName = 'userContext';

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(`useUser must be used within <User />`);
  }
  return context;
};

export default function UserProvider({ children }) {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange(() => getUserProfile());
  }, []);

  const getUserProfile = async () => {
    const sessionUser = supabaseClient.auth.user();
    if (sessionUser) {
      const { data: profileData } = await supabaseClient
        .from('profile')
        .select('*')
        .eq('id', sessionUser.id)
        .single();

      setUser(() => ({
        ...sessionUser,
        ...profileData
      }));
    }
  };

  const login = async () => {
    await supabaseClient.auth.signIn({
      provider: 'github'
    });
    getUserProfile();
  };

  const logout = async () => {
    await supabaseClient.auth.signOut();
    setUser(null);
    router.push('/');
  };

  const exposed = {
    user,
    login,
    logout
  };

  return (
    <UserContext.Provider value={exposed}>{children}</UserContext.Provider>
  );
}
