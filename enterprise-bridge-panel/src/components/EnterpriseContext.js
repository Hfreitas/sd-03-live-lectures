import React, { createContext, useState } from 'react';

const EnterpriseContext = createContext();

const EnterpriseProvider = ({ children }) => {
  const [energyGauge, setEnergyGauge] = useState(0);
  const [warpSpeed, setWarpSpeed] = useState(false);
  const [shieldsOnline, setShieldsOnline] = useState(false);
  const [weaponsEnabled, setWeaponsEnabled] = useState(true);
  const [weaponsLevel, setWeaponsLevel] = useState(0);

  const engageWarpSpeed = () => {
    if (warpSpeed || weaponsEnabled || shieldsOnline || energyGauge > 2) return undefined;

    setWarpSpeed(true);
    setEnergyGauge((currentEnergyGauge) => currentEnergyGauge + 2);
  }

  const disengageWarpSpeed = () => {
    if (!warpSpeed || energyGauge < 2) return undefined;

    setWarpSpeed(false);
    setEnergyGauge((currentEnergyGauge) => currentEnergyGauge - 2);
  }

  const raiseShields = () => {
    if (warpSpeed || shieldsOnline || energyGauge > 2) return undefined;

    setEnergyGauge((currentEnergyGauge) => currentEnergyGauge + 2);
    setShieldsOnline(true);
  }

  const lowerShields = () => {
    if (!shieldsOnline || energyGauge < 2) return undefined;

    setEnergyGauge((currentEnergyGauge) => currentEnergyGauge - 2);
    setShieldsOnline(false);
  }

  const weaponsOnline = () => {
    if (warpSpeed || weaponsEnabled) return undefined;

    setWeaponsEnabled(true);
  }

  const weaponsOffline = () => {
    if (warpSpeed || !weaponsEnabled) return undefined;

    setWeaponsEnabled(false);
    setEnergyGauge((currentEnergyGauge) => currentEnergyGauge - weaponsLevel);
    setWeaponsLevel(0);
  }

  const increaseFirepower = () => {
    if (warpSpeed || weaponsLevel === 3 || energyGauge === 4 || !weaponsEnabled)
      return undefined;

    setEnergyGauge((curretEnergyGauge) => curretEnergyGauge + 1);
    setWeaponsLevel((currentWeaponsLevel) => currentWeaponsLevel + 1);
  };

  const decreaseFirepower = () => {
    if (warpSpeed || weaponsLevel === 0 || energyGauge === 0 || !weaponsEnabled) return undefined;

    setEnergyGauge((curretEnergyGauge) => curretEnergyGauge - 1);
    setWeaponsLevel((currentWeaponsLevel) => currentWeaponsLevel - 1);
  };

  const context = {
    energyGauge,
    warpSpeed,
    engageWarpSpeed,
    disengageWarpSpeed,
    shieldsOnline,
    raiseShields,
    lowerShields,
    weaponsEnabled,
    weaponsOnline,
    weaponsOffline,
    weaponsLevel,
    increaseFirepower,
    decreaseFirepower,
  };

  return (
    <EnterpriseContext.Provider value={context}>
      {children}
    </EnterpriseContext.Provider>
  );
};

export { EnterpriseContext, EnterpriseProvider as Provider }
