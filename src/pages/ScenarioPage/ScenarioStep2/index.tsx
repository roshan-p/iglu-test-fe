  import React, { useEffect, useState, useContext } from "react";
import { ScenarioContext } from "../../../context/ScenarioContext";
import { ODTContext } from "../../../context/ODTContext";
import { TODContext } from "../../../context/TODContext";
import { Dropdown } from "../../../components/Dropdown";
import { Button } from "../../../components/Button";
import { Modal } from "../../../components/Modal";
import { validateFunctionArray } from "../../../components/utilities/utilities";
import { renderTableData } from "./components/odtTable";
import "./ScenarioStep2.css";


const th_style = "bg-[#2AB4FF1A] text-center w-1/3 h-[40px]";
const td_style = "border border-[#E5E5E5] text-center w-1/3";
const th_style_row_1 = "bg-[#2AB4FF1A] w-1/3 h-[40px]";
const td_style_row_1 = "border border-[#E5E5E5] w-1/3";

const modal_td_style = "border border-[#E5E5E5] text-center w-1/4";

export function ScenarioStep2() {
  const { state, setParams, active, setActive } = useContext(ScenarioContext);
  const ODTData = useContext(ODTContext);
  const TODData = useContext(TODContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState(0);
  const [seletedIndex, setSelectedIndex] = useState(0);
  const [addNewFunction, setAddNewFunction] = useState(false);
  const [newRow, setNewRow] = useState<JSX.Element[]>([]);
  const [newRowData, setNewRowData] = useState<number[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [disabledSave, setDisabledSave] = useState(true);
  const todTableData = TODData.state.context.timeOfDay;
  const [disableNext, setDisableNext] = useState(true);
  const temperatureRawData = state.context;
  const onClickDropdown = (
    paramName: string,
    units: string,
    paramIndex: number
  ) => {
    let tmpParam = temperatureRawData.calcParams;
    tmpParam[paramIndex] = {
      ...tmpParam[paramIndex],
      paramName: paramName,
      units: units,
    };
    setParams("SET_MIN_MAX", {
      ...temperatureRawData,
      calcParams: { ...tmpParam },
    });
    setOpenModal(!openModal);
  };

  useEffect(() => {
    const paramsData = temperatureRawData.calcParams;
    let paramObjSize = Object.keys(paramsData).length;
    if (paramObjSize !== 5) return;
    setDisableNext(false);
  }, [temperatureRawData]);

  useEffect(() => {
    if (validateFunctionArray(newRowData)) {
      if (newTitle && newSubtitle) {
        setDisabledSave(false);
      }
    }
  }, [newRowData, newSubtitle, newTitle]);

  useEffect(() => {
    if (!addNewFunction) {
      setNewRow([]);
      setNewRowData([]);
      setNewTitle("");
      setNewSubtitle("");
      setSelectedDropdown(0);
    }
  }, [addNewFunction]);

  const onChangeRow = (value: number, index: number) => {
    let tmpRow = newRowData;
    tmpRow[index] = value;
    setNewRowData([...tmpRow]);
  };
  const renderEmptyRow = () => {
    let rows = newRow;
    for (let i = 0; i < 41; i++) {
      rows.push(
        <tr key={i}>
          <td className={modal_td_style}>
            <input
              value={newRowData[i]}
              type="number"
              onChange={(e) => {
                if (isNaN(parseInt(e.target.value))) return;
                onChangeRow(parseInt(e.target.value), i);
              }}
              className="text-center"
            ></input>
          </td>
        </tr>
      );
    }
    setNewRow(rows);
  };

  return (
    <div>
      <table className="w-[100%]">
        <thead>
          <tr>
            <th className={th_style_row_1}>Calculation parameters</th>
            <th className={th_style}>Unit</th>
            <th className={th_style}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={td_style_row_1}>Head tolerance* </td>
            <td className={td_style}>m Lc</td>
            <td className={td_style}>
              <Dropdown
                onClickDropdown={() => {
                  setSelectedIndex(0);
                  onClickDropdown("Head tolerance", "m Lc", 0);
                }}
                temperatureCalcData={temperatureRawData.calcParams[0]}
                setSelectedDropdown={setSelectedDropdown}
              />
            </td>
          </tr>
          <tr>
            <td className={td_style_row_1}>Flow tolerance* </td>
            <td className={td_style}>m3/s</td>
            <td className={td_style}>
              <Dropdown
                onClickDropdown={() => {
                  setSelectedIndex(1);
                  onClickDropdown("Flow tolerance", "m3/s", 1);
                }}
                temperatureCalcData={temperatureRawData.calcParams[1]}
                setSelectedDropdown={setSelectedDropdown}
              />
            </td>
          </tr>
          <tr>
            <td className={td_style_row_1}>Internal tolerance factor* </td>
            <td className={td_style}>{"(-)"}</td>
            <td className={td_style}>
              <Dropdown
                onClickDropdown={() => {
                  setSelectedIndex(2);
                  onClickDropdown("Internal tolerance factor", "(-)", 2);
                }}
                temperatureCalcData={temperatureRawData.calcParams[2]}
                setSelectedDropdown={setSelectedDropdown}
              />
            </td>
          </tr>
          <tr>
            <td className={td_style_row_1}>Maximal numer of iterations* </td>
            <td className={td_style}>{"(-)"}</td>
            <td className={td_style}>
              <Dropdown
                onClickDropdown={() => {
                  setSelectedIndex(3);
                  onClickDropdown("Maximal numer of iterations", "(-)", 3);
                }}
                temperatureCalcData={temperatureRawData.calcParams[3]}
                setSelectedDropdown={setSelectedDropdown}
              />
            </td>
          </tr>
          <tr>
            <td className={td_style_row_1}>Response factor* </td>
            <td className={td_style}>m Lc</td>
            <td className={td_style}>
              <Dropdown
                onClickDropdown={() => {
                  setSelectedIndex(4);
                  onClickDropdown("Response factor", "m Lc", 4);
                }}
                temperatureCalcData={temperatureRawData.calcParams[4]}
                setSelectedDropdown={setSelectedDropdown}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <Modal
        isModalOpen={openModal && selectedDropdown === 1}
        setOpenModal={() => {
          setOpenModal(!openModal);
          setAddNewFunction(false);
        }}
        modalContent={
          <div className="text-center">
            <h1>Select a Function of Outdoor Temperature</h1>
            <div className="text-right mt-[40px] mb-[40px] overflow-scroll mr-[200px]">
              <Button
                btnTxt="New Function"
                onBtnClick={() => {
                  setAddNewFunction(!addNewFunction);
                  renderEmptyRow();
                }}
              />
            </div>
            <div className="justify-center overflow-scroll">
              <div className="inline-flex margin-auto">
                {renderTableData({
                  tableData: ODTData.state.context.outDoorTemp,
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
                  send: ODTData.setParams,
                  newRow,
                  setOpenModal,
                  seletedIndex,
                  temperatureRawData,
                  sendMachine: setParams,
                })}
              </div>
            </div>
          </div>
        }
      />
      <Modal
        isModalOpen={openModal && selectedDropdown === 2}
        setOpenModal={() => {
          setOpenModal(!openModal);
          setAddNewFunction(false);
        }}
        modalContent={
          <div className="text-center">
            <h1>Select a Time of Day</h1>
            <div className="text-right mt-[40px] mb-[40px] overflow-scroll"></div>
            <div className="justify-center overflow-scroll">
              <div className="inline-flex margin-auto">
                {renderTableData({
                  tableData: todTableData,
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
                  send: ODTData.setParams,
                  newRow,
                  setOpenModal,
                  seletedIndex,
                  temperatureRawData,
                  sendMachine: setParams,
                })}
              </div>
            </div>
          </div>
        }
      />
      <div className="absolute right-[65px] mt-[30px] space-between">
        <span className="mr-[20px]">
          <Button
            btnTxt="Back"
            variant="secondary"
            onBtnClick={() => {
              setActive(active - 1);
            }}
          />
        </span>
        <Button
          btnTxt="Next"
          disabled={disableNext}
          onBtnClick={() => {
            setActive(active + 1);
          }}
        />
      </div>
    </div>
  );
}
