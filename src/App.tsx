import React from 'react';
import logo from './logo.svg';
import { toggleMachine } from './states/toggleMachine';
import { useMachine } from "@xstate/react";
import './App.css';
import { Scenario } from './pages/Scenario';

function App() {

  return (
    <div className="App">
   <Scenario></Scenario>
    </div>
  );
}

export default App;
