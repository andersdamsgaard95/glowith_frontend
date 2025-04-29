'use client';

import { createContext, useContext } from 'react';

interface AppContextProps {
  backendUrl: string;
}

const AppContext = createContext<AppContextProps>({
  backendUrl: '', // default (empty) so it never crashes
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_STRAPI_URL || '';

  return (
    <AppContext.Provider value={{ backendUrl }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
