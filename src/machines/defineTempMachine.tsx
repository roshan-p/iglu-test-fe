import { createMachine, assign } from "xstate";

interface DefineTypeContext {
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
}

export const defineTempMachine = createMachine<DefineTypeContext>(
  {
    id: "setMinMax",
    initial: "initialData",
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
    states: {
      initialData: {
        on: {
          SET_MIN_MAX: "setDataMinMax",
        },
      },
      setDataMinMax: {
        entry: assign({
          min: (ctx, event) => {
            return (ctx.min = parseInt(event?.min || 0));
          },
          max: (ctx, event) => {
            return (ctx.max = parseInt(event?.max || 0));
          },
          name: (ctx, event) => {
            return (ctx.name = event?.name || "");
          },
          description: (ctx, event) => {
            return (ctx.description = event?.description || "");
          },
          calcParams: (ctx, event) => {
            return (ctx.calcParams = event?.calcParams || []);
          },
        }),
        on: {
          SET_MIN_MAX: {
            actions: ["setDataMinMax"],
          },
          SET_INITIAL: {
            actions: ["setInitialData"],
          },
        },
      },
    },
  },
  {
    actions: {
      setDataMinMax: assign({
        min: (ctx, event) => {
          return (ctx.min = parseInt(event?.min || 0));
        },
        max: (ctx, event) => {
          return (ctx.max = parseInt(event?.max || 0));
        },
        name: (ctx, event) => {
          return (ctx.name = event?.name || "");
        },
        description: (ctx, event) => {
          return (ctx.description = event?.description || "");
        },
        calcParams: (ctx, event) => {
          return (ctx.calcParams = event?.calcParams || []);
        },
      }),
      setInitialData: assign({
        min: (ctx, event) => {
          return (ctx.min = parseInt("0"));
        },
        max: (ctx, event) => {
          return (ctx.max = parseInt("0"));
        },
        name: (ctx, event) => {
          return (ctx.name = "");
        },
        description: (ctx, event) => {
          return (ctx.description = "");
        },
        calcParams: (ctx, event) => {
          return (ctx.calcParams = [
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
          ]);
        },
      }),
    },
  }
);
