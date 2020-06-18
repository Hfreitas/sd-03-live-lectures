import React from 'react';

import './Panel.css';

export default function WeaponsBay() {
  return (
    <div className="panel">
      <span>Armas</span>
      <div className={`alert-light`} />
      <button onClick={() => alert('clicou')}>
        {`PLACEHOLDER`} armas
      </button>
      <span>Nível das armas: PLACEHOLDER</span>
        <button onClick={() => alert('clicou')}>Aumentar poder de fogo</button>
      <button onClick={() => alert('clicou')}>Diminuir poder de fogo</button>
      <span>Nível máximo: 3</span>
    </div>
  );
}
