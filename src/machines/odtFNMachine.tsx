import { createMachine, assign } from "xstate";
interface outDoorTempTypeContext {
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
}

export const odtFNMachine =
  createMachine<outDoorTempTypeContext>(
    {
      id: "setTempFunction",
       initial: "initialData",
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
      states: {
        initialData: {

          on: {
            SET_LOAD: {
              actions: ["onLoad"],
            },
          },
        },
        setData: {
          entry: assign({
            outDoorTemp: (ctx, event) => {
              return (ctx.outDoorTemp = { ...event?.value });
            },
          }),
          on: {
            SET_NEW_TABLE: {
              actions: ["assignTable"],
            },
          },
        },
        onLoadData: {
          entry: assign({
            isLoading: (ctx) => {
              return (ctx.isLoading = true);
            },
          }),
          on: {
            SET_LOAD: {
              actions: ["onLoad"],
            },
          },
        },
      },

    },
    {
      actions: {
        assignTable: assign({
          outDoorTemp: (ctx, event) => {
            return (ctx.outDoorTemp = { ...event?.value});
          },
          isLoading: (ctx) => {
            return (ctx.isLoading = false);
          },
        }),
        onLoad: assign({
          isLoading: (ctx) => {
            return (ctx.isLoading = true);
          },
        }),
      },
    }
  );
