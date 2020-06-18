import React from 'react';
import Panel from './components/Panel.js';
import { Provider } from './components/EnterpriseContext';

function App() {
  return (
    <Provider>
      <Panel />
    </Provider>
  );
}

export default App;
