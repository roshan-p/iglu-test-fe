

import { Button } from "../../../../components/Button";

interface odtTable {
  tableData: Array<{
    index: number;
    isRootTable: boolean;
    rootTableTitle: string;
    functionHeader: {
      functionTitle: string;
      functionSubTitle: string;
    };
    functionData: Array<number>;
  }>;
  addNewFunction: boolean;
  setNewTitle: Function;
  renderEmptyRow: Function;
  setNewSubtitle: Function;
  newSubtitle: string;
  newTitle: string;
  disabledSave: boolean;
  setDisabledSave:Function;
  newRowData: Array<number>;
  setAddNewFunction: Function;
  send: Function;
  newRow: Array<JSX.Element>;
  setOpenModal: Function;
  seletedIndex: number;
  //selectedParams:Array<{ paramName: string; paramUnit: string; paramIndex: number }>;
  temperatureRawData: {
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
  sendMachine: (event: string, data: object) => void;
}
export const renderTableData = ({
  tableData,
  addNewFunction,
  setNewTitle,
  renderEmptyRow,
  setNewSubtitle,
  newSubtitle,
  newTitle,
  disabledSave,
  setDisabledSave,
  newRowData,
  setAddNewFunction,
  send,
  newRow,
  setOpenModal,
  seletedIndex,
  temperatureRawData,
  sendMachine,
}: odtTable) => {
  const modal_th_style =
    "border border-[#E5E5E5] bg-[#2AB4FF1A] text-center w-1/4 h-[40px] whitespace-nowrap overflow-hidden";
  const modal_th_input_style =
    "border border-[#E5E5E5] bg-[#2AB4FF1A] text-center w-1/4 h-[40px] whitespace-nowrap overflow-hidden";
  const modal_td_style = "border border-[#E5E5E5] text-center w-1/4";
  const modal_th_style_row_1 =
    "border border-[#E5E5E5] bg-[#2AB4FF1A] w-3/4 h-[40px] text-center whitespace-nowrap overflow-hidden";
  const modal_td_style_row_1 = "border border-[#E5E5E5] w-3/4 text-center";
  const modal_th_button_style_row_1 =
    "border border-[#E5E5E5] bg-[#C4C4C4]/[.10] w-3/4 h-[40px] text-center whitespace-nowrap overflow-hidden";
 
  return tableData.map((group, index) => {
    const { functionData, functionHeader, rootTableTitle } = group;
    return (
      <>
        {index === 0 && (
          <table id="first-table" className="w-[30%]">
            <thead key={index}>
              <tr>
                <th className={modal_th_style_row_1}>
                  {functionHeader.functionTitle}
                </th>
              </tr>
              <tr>
                <th className={modal_th_style_row_1}>
                  {functionHeader.functionSubTitle}
                </th>
              </tr>
              <tr>
                <th className={modal_th_button_style_row_1}></th>
              </tr>
            </thead>
            <tbody>
              {functionData.map((unit, key) => (
                <tr key={key}>
                  <td className={modal_td_style_row_1}>{unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {addNewFunction && index === 0 && (
          <table className="w-[20%]">
            <thead key={index}>
              <tr>
                <th className={modal_th_input_style}>
                  <input
                    className="text-center"
                    value={newTitle}
                    onChange={(e) => {
                      setNewTitle(e.target.value);
                    }}
                  ></input>
                </th>
              </tr>
              <tr>
                <th className={modal_th_input_style}>
                  <input
                    className="text-center"
                    value={newSubtitle}
                    onChange={(e) => {
                      setNewSubtitle(e.target.value);
                    }}
                  ></input>
                </th>
              </tr>
              <tr>
                <th className={modal_th_button_style_row_1}>
                  <Button
                    btnTxt={"Save"}
                    disabled={disabledSave}
                    onBtnClick={() => {
                      renderEmptyRow();
                      let tempArray = tableData;
                      tempArray.push({
                        index: tempArray.length,
                        isRootTable: false,
                        rootTableTitle: functionHeader.functionSubTitle || "",
                        functionHeader: {
                          functionTitle: newTitle,
                          functionSubTitle: newSubtitle,
                        },
                        functionData: newRowData,
                      });
                      send({
                        type: "SET_LOAD",
                      });
                      send({
                        type: "SET_NEW_TABLE",
                        value: { ...tempArray },
                      });
                      setAddNewFunction(false);
                      setDisabledSave(true);
                    }}
                  ></Button>
                </th>
              </tr>
            </thead>
            <tbody>{newRow}</tbody>
          </table>
        )}
        {index !== 0 && (
          <table className="w-[20%]">
            <thead key={index}>
              <tr>
                <th className={modal_th_style}>
                  {functionHeader.functionTitle}
                </th>
              </tr>
              <tr>
                <th className={modal_th_style}>
                  {functionHeader.functionSubTitle}
                </th>
              </tr>
              <tr>
                <th className={modal_th_button_style_row_1}>
                  <button
                    onClick={() => {
                      let tmpSelected = temperatureRawData.calcParams;
                      tmpSelected[seletedIndex] = {
                        ...tmpSelected[seletedIndex],
                        selectedFunctionTitle: rootTableTitle,
                        selectedFunctionName:
                          functionHeader.functionTitle || "",
                        values: {
                          functionIndex: group?.index || 0,
                          functionData,
                        },
                      };      
                      setOpenModal(false);
                      sendMachine("SET_MIN_MAX", {
                        ...temperatureRawData,
                        calcParams: { ...tmpSelected },
                      });
                    }}
                    className="bg-[#0072FF] w-[72px] h-[30px] hover:bg-blue-700 text-white rounded"
                  >
                    Select
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {functionData.map((unit, key) => (
                <tr key={key}>
                  <td className={modal_td_style}>{unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </>
    );
  });
};
