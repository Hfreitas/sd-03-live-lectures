import React from 'react';

import './Panel.css';

export default function WarpDrive() {
  return (
    <div className="panel">
      <span>Motor de Dobra</span>
      <div className={`alert-light`} />
        <button onClick={() => alert('clicou')}>
        {`PLACEHOLDER`} velocidade de dobra
      </button>
      <span>Armas e escudos devem estar desligados</span>
    </div>
  );
}
