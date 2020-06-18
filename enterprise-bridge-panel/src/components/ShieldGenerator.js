import React from 'react';

import './Panel.css';

export default function ShieldGenerator() {
  return (
    <div className="panel">
      <span>Escudos</span>
      <div className={`alert-light`} />
        <button onClick={() => alert('clicou')}>
        {`PLACEHOLDER`} escudos
      </button>
    </div>
  );
}
