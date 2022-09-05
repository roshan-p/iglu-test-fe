import { useMachine } from "@xstate/react";
import { createContext, useState } from "react";
import { odtFNMachine } from "../machines/odtFNMachine";
export type IODTContext = {
  state: {
    context: {
      outDoorTemp: Array<{
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
      outDoorTemp: [
        {
          index: 0,
          isRootTable: true,
          rootTableTitle: "",
          functionHeader: {
            functionTitle: "",
            functionSubTitle: "Outdoor Temperature",
          },
          functionData: [
            -20, -19, -18, -17, -16, -15, -14, -13, -12, -11, -10, -9, -8, -7,
            -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
            13, 14, 15, 16, 17, 18, 19, 20,
          ],
        },
        {
          index: 1,
          isRootTable: false,
          rootTableTitle: "Outdoor Temperature",
          functionHeader: {
            functionTitle: "System Head",
            functionSubTitle: "Thead",
          },
          functionData: [
            30.0, 32.1, 32.8, 33.5, 34.0, 36.2, 36.4, 37.0, 30.0, 32.1, 32.8,
            33.5, 34.0, 36.2, 36.4, 37.0, 30.0, 32.1, 32.8, 33.5, 34.0, 36.2,
            36.4, 37.0, 30.0, 32.1, 32.8, 33.5, 34.0, 36.2, 30.0, 32.1, 32.8,
            33.5, 34.0, 36.2, 36.4, 37.0, 30.0, 32.1, 32.8,
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
export const ODTContext = createContext<IODTContext>(defaultState);
export const ODTProvider = ({ children }: any) => {
  const [state, setParams] = useMachine(odtFNMachine);
  const [newScenario, setNewScenario] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <ODTContext.Provider
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
    </ODTContext.Provider>
  );
};
