import React, { useContext } from "react";
import { Button } from "../../components/Button";
import { ScenarioContext } from "../../context/ScenarioContext";
import { ScenarioPage } from "../ScenarioPage";
import { ODTContext } from "../../context/ODTContext";
import { MiniDropdown } from "../../components/MiniDropdown";

const th_style = "bg-[#2AB4FF1A] text-center w-1/3 h-[40px]";
const td_style = "border border-[#E5E5E5] text-center w-1/3";
const th_style_row_1 = "bg-[#2AB4FF1A] w-1/3 h-[40px]";
const td_style_row_1 = "border border-[#E5E5E5] w-1/3";

export function MainPage() {
  const { active, newScenario, setNewScenario, state ,setActive,setParams} =
    useContext(ScenarioContext);
  const ODTData = useContext(ODTContext);
  const ODTDataList = ODTData.state.context.outDoorTemp[0].functionData;
  const temperatureRawData = state.context;
  return (
    <div className="ml-[66px] mr-[66px]">
      {active < 3 && newScenario && <ScenarioPage />}
      {!newScenario && (
        <div>
          <span className="absolute left-[106px] top-[50px]">Scenarios</span>
          <span className="absolute right-[106px] top-[42px]">
            <Button
              btnTxt="+ New Scenario"
              variant="secondary"
              onBtnClick={() => {
                setNewScenario(true);
              }}
            />
          </span>
          <div></div>
        </div>
      )}

      {active >= 3 && newScenario && (
        <div>
          <div className="float-left mt-[35px]">{temperatureRawData.name}</div>
          <div className="float-right mt-[35px]">
            <Button
              btnTxt="+ New Scenario"
              variant="secondary"
              onBtnClick={() => {
                setNewScenario(false)
                setNewScenario(true);
                setActive(0)
                setParams('SET_INITIAL',{})
              }}
            />
          </div>
          <div className="float-left text-left mt-[105px] clear-both">
            Description
            <br></br>
            {temperatureRawData.description || "No Description"}
          </div>
          <div className="float-left text-left mt-[24px] clear-both">
            Variables
          </div>
          <div className="float-left text-left mt-[24px] clear-both">
            Outdoor Temperature:
          </div>
          <div className="float-left text-left mt-[24px] clear-both">
            <MiniDropdown
              onClickMiniDropdown={() => {
                console.log("select");
              }}
              data={{ title: "DD", list: ODTDataList }}
              unit="℃"
            />
          </div>
          <div className="float-left text-left mt-[24px] clear-both">
            Results:
          </div>
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
                  <td className={td_style}>37</td>
                </tr>
                <tr>
                  <td className={td_style_row_1}>Flow tolerance* </td>
                  <td className={td_style}>m3/s</td>
                  <td className={td_style}>28</td>
                </tr>
                <tr>
                  <td className={td_style_row_1}>
                    Internal tolerance factor*{" "}
                  </td>
                  <td className={td_style}>{"(-)"}</td>
                  <td className={td_style}>0.200</td>
                </tr>
                <tr>
                  <td className={td_style_row_1}>
                    Maximal numer of iterations*{" "}
                  </td>
                  <td className={td_style}>{"(-)"}</td>
                  <td className={td_style}>3</td>
                </tr>
                <tr>
                  <td className={td_style_row_1}>Response factor* </td>
                  <td className={td_style}>m Lc</td>
                  <td className={td_style}>12</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
