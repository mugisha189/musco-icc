import LoadingView from '@/components/shared/LoadingView';
import { IUser, UserProfile } from '@/utils/types/user.type';
import { deleteCookie, getCookie } from 'cookies-next';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

interface UserContextProps {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  profile: UserProfile | null;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const UserContext = React.createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  profile: null,
  setProfile: () => {},
});

export const useUser = () => React.useContext(UserContext);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<IUser | null>(null);
  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [loading, setLoading] = React.useState(false);
  const pathname = usePathname();

  const getProfile = async () => {
    const token = getCookie('token');
    if (!token) return;
    setLoading(true);
    if (!pathname?.startsWith('/gaming') && !token /* || pathname !== '/auth/login' */) return setLoading(false);
    try {
      const response = await fetch('/api/auth/profile');
      const res = await response.json();
      const data = res.user;
      setUser(data);
      setProfile(data);
    } catch (error) {
      console.log(error);
      deleteCookie('token');
    }
    setLoading(false);
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <LoadingView />;

  return <UserContext.Provider value={{ user, setUser, profile, setProfile }}>{children}</UserContext.Provider>;
};

export default UserProvider;
