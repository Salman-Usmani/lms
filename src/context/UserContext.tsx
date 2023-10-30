import {createContext, ReactNode, useContext, useState} from 'react';
import {UserData} from '../types';

interface UserContextType {
  user: UserData | null;
  setUser: (user: UserData | null) => void;
}
interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<UserData | null>(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};
