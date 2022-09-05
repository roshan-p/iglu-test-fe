import { useMachine } from "@xstate/react";
import { createContext, useState } from "react";
import { defineTempMachine } from "../machines/defineTempMachine";
export type IScenarioContext = {
  state: {
    context: {
      min: number;
      max: number;
      name: string;
      description?: string;
      calcParams: Array<{
        paramName: string;
        units: string;
        selectedFunctionName: string;
        selectedFunctionTitle: string;
        values: {
          functionIndex: number;
          functionData: Array<number>;
        };
      }>;
    };
  };
  setParams: (type: string, value: object) => void;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  newScenario: boolean;
  setNewScenario: React.Dispatch<React.SetStateAction<boolean>>;
};
const defaultState = {
  state: {
    context: {
      min: 0,
      max: 0,
      name: "",
      description: "",
      calcParams: [
        {
          paramName: "",
          selectedFunctionName: "",
          selectedFunctionTitle: "",
          units: "",
          values: {
            functionIndex: 0,
            functionData: [],
          },
        },
      ],
    },
  },
  setParams: () => {},
  active: 0,
  setActive: () => {},
  newScenario: false,
  setNewScenario: () => {},
};
export const ScenarioContext = createContext<IScenarioContext>(defaultState);
export const ScenarioProvider = ({ children }: any) => {
  const [state, setParams] = useMachine(defineTempMachine);
  const [newScenario, setNewScenario] = useState(false);
  const [active, setActive] = useState(0);
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
      {children}
    </ScenarioContext.Provider>
  );
};
