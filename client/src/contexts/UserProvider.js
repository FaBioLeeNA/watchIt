import React, { useContext, useState } from 'react';

const UserContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
}

export const UserProvider = ({children}) => {
  const [user, setUser] = useState({});

  const userSetter = (data) => {
    setUser(data)
  }

  return (
    <UserContext.Provider value={{user, userSetter}}>
      {children}
    </UserContext.Provider>
  );
}

