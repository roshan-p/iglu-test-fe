import { createModel } from "@xstate/test";
import { mock as mockInterface } from "jest-mock-extended";
import { assign, createMachine } from "xstate";
import { defineTempMachine } from "./defineTempMachine";


export interface DefineTypeContext {
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
const mock = mockInterface<DefineTypeContext>();
describe("DefineType Test", () => {
  test("Mock out an interface", () => {
    mock.min = 5;
    mock.max = 10;
    mock.name = "title";
    mock.description = "description";
    mock.calcParams = [
      {
        paramName: "paramName",
        units: "units",
        selectedFunctionName: "function name",
        selectedFunctionTitle: "function title",
        values: {
          functionIndex: 0,
          functionData: [1, 2, 3, 4, 5],
        },
      },
    ];
  });
});
it("mock min should be equl to expected", () => {
  expect(mock.min).toEqual(5);
});
it("mock max should be equl to expected", () => {
  expect(mock.max).toEqual(10);
});
it("mock name should be equl to expected", () => {
  expect(mock.name).toEqual("title");
});
it("mock description should be equl to expected", () => {
  expect(mock.description).toEqual("description");
});
it("mock calcParams should be equl to expected", () => {
  expect(mock.calcParams).toEqual([
    {
      paramName: "paramName",
      units: "units",
      selectedFunctionName: "function name",
      selectedFunctionTitle: "function title",
      values: {
        functionIndex: 0,
        functionData: [1, 2, 3, 4, 5],
      },
    },
  ]);
});

it('should reach "yellow" given "green" when the "TIMER" event occurs', () => {
    const toggleMachine = createMachine<DefineTypeContext>(  {
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
            meta: {
                test: async (page:any) => {
                  await page.waitFor('input:checked');
                }
              }
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
      });
      const toggleModel = createModel(toggleMachine)
      toggleModel.withEvents({
        SET_MIN_MAX: {
          exec: async (page) => {
            await page;
          }
        }
      });
    const expectedValue = { min: 0, max: 0, name: '', description: '', calcParams: [] };

    const actualState = defineTempMachine.transition({}, { type: 'SET_MIN_MAX' });
    expect(actualState.context).toEqual((expectedValue));

 
  });
