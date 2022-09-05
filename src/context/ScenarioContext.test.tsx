import React from "react";
import { render } from "@testing-library/react";
import { ScenarioProvider, ScenarioContext } from "./ScenarioContext";
import { ScenarioStep1 } from "../pages/ScenarioPage/ScenarioStep1";

describe("<ScenarioContext />", () => {
  const TestComponent = () => {
    const { state, setParams, active, setActive, newScenario, setNewScenario } =
      React.useContext(ScenarioContext);
    return (
      <ScenarioContext.Provider
        value={{
          state,
          setParams,
          active,
          setActive,
          newScenario,
          setNewScenario,
        }}
      >
        {
          <div>
            {" "}
            <ScenarioStep1 />
          </div>
        }
      </ScenarioContext.Provider>
    );
  };

  describe("<ScenarioProvider />", () => {
    test("provides expected AuthContext obj to child elements", () => {
      render(
        <ScenarioProvider>
          <TestComponent />
        </ScenarioProvider>
      );
    });
  });
});
