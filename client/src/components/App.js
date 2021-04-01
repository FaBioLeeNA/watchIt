import React, { useState } from 'react';
import Dashboard from './Dashboard';
import MainPage from './MainPage';




const App = () => {
  const [loged, setLoged] = useState(false);

  return (loged) ?  <Dashboard /> : <MainPage setLoged={setLoged}/>
};

export default App;
