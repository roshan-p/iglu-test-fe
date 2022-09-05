import { useMachine } from "@xstate/react";
import { createContext, useState } from "react";
import { todFNMachine } from "../machines/todFNMachine";
export type ITODContext = {
  state: {
    context: {
      timeOfDay: Array<{
        index: number;
        isRootTable: boolean;
        rootTableTitle: string;
        functionHeader: {
          functionTitle: string;
          functionSubTitle: string;
        };
        functionData: Array<number>;
      }>;
      isLoading: boolean;
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
      timeOfDay: [
        {
          index: 0,
          isRootTable: true,
          rootTableTitle: "",
          functionHeader: {
            functionTitle: "",
            functionSubTitle: "Time of Day",
          },
          functionData: [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 17, 18, 19,
            20, 21, 22, 23, 24,
          ],
        },
      ],
      isLoading: false,
    },
  },
  setParams: () => {},
  active: 0,
  setActive: () => {},
  newScenario: false,
  setNewScenario: () => {},
};
export const TODContext = createContext<ITODContext>(defaultState);
export const TODProvider = ({ children }: any) => {
  const [state, setParams] = useMachine(todFNMachine);
  const [newScenario, setNewScenario] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <TODContext.Provider
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
    </TODContext.Provider>
  );
};
