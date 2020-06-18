import React, { useContext } from 'react';
import { EnterpriseContext } from './EnterpriseContext.js';

import './Panel.css';

export default function WeaponsBay() {
  const {
    weaponsOffline,
    weaponsOnline,
    weaponsLevel,
    weaponsEnabled,
    increaseFirepower,
    decreaseFirepower,
  } = useContext(EnterpriseContext);

  return (
    <div className="panel">
      <span>Armas</span>
      <div className={`alert-light ${weaponsEnabled ? 'green-light' : 'red-light'}`} />
      <button onClick={weaponsEnabled ? weaponsOffline : weaponsOnline}>
        {`${weaponsEnabled ? 'Desabilitar' : 'Habilitar'} armas`}
      </button>
      <span>{`Nível das armas: ${weaponsLevel}`}</span>
      <button onClick={increaseFirepower}>Aumentar poder de fogo</button>
      <button onClick={decreaseFirepower}>Diminuir poder de fogo</button>
      <span>Nível máximo: 3</span>
    </div>
  );
}
