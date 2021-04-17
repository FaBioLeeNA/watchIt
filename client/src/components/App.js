import React, { useState } from 'react';
import { UserProvider } from '../contexts/UserProvider';
import Dashboard from './Dashboard';
import MainPage from './MainPage';




const App = () => {
  const [loged, setLoged] = useState(false);
  const componenet = (loged) ?  <Dashboard /> : <MainPage setLoged={setLoged}/>
  return (
    <UserProvider>
      {componenet}
    </UserProvider>
  )
};

export default App;
