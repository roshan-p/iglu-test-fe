import React from "react";
import "./App.css";
import { MainPage } from "./pages/MainPage";
import { ScenarioProvider } from "./context/ScenarioContext";
import { ODTProvider } from "./context/ODTContext";
import { TODProvider } from "./context/TODContext";

function App() {
  return (
    <div className="App">
      <ScenarioProvider>
        <ODTProvider>
          <TODProvider>
            <MainPage />
          </TODProvider>
        </ODTProvider>
      </ScenarioProvider>
    </div>
  );
}

export default App;
