import React from 'react';
import './Panel.css';

import WarpDrive from './WarpDrive';
import WeaponsBay from './WeaponsBay';
import ShieldGenerator from './ShieldGenerator';

function Panel() {
  return (
    <div className="complete-panel">
      <span className="energy-gauge">Energia em utilização: PLACEHOLDER</span>
      <div className="interactions-panel">
        <WarpDrive />
        <WeaponsBay />
        <ShieldGenerator />
      </div>
      <span className="energy-warning">A nave tem 4 de energia</span>
    </div>
  );
}

export default Panel;
