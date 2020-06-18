import React, { useContext } from 'react';
import { EnterpriseContext } from './EnterpriseContext'
import './Panel.css';

export default function ShieldGenerator() {
  const {
    shieldsOnline,
    raiseShields,
    lowerShields,
  } = useContext(EnterpriseContext);

  return (
    <div className="panel">
      <span>Escudos</span>
      <div className={`alert-light ${shieldsOnline ? 'green-light' : 'red-light'}`} />
        <button onClick={shieldsOnline ? lowerShields : raiseShields}>
        {`${shieldsOnline ? 'Baixar' : 'Erguer'} escudos`}
      </button>
    </div>
  );
}
