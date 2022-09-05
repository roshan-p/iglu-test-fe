import { createMachine } from "xstate";
interface timeOfDayTypeContext {
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
}

export const todFNMachine = createMachine<timeOfDayTypeContext>({
  id: "setTimeOfDay",
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
});
