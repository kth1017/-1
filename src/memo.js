
import React, { useEffect, useState, useContext, createContext } from 'react';
import './style.css';

const ModContext = React.createContext();
function ModProvider({ children }) {
  const a = ['first', 'second'];
  const modState = useState(a);
  return <ModContext.Provider value={modState}>{children}</ModContext.Provider>;
}

function useModState() {
  const value = useContext(ModContext);
  if (value === undefined) {
    throw new Error('error');
  }

  return value[0][1];
}

function Top() {
  const [a, setA] = useModState();
  return <div>{setA}</div>;
}

export default function App() {
  return (
    <div>
      <ModProvider>
        <Top></Top>
      </ModProvider>
    </div>
  );
}
