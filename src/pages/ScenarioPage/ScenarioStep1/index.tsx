import React, { useContext } from "react";
import { ScenarioContext } from "../../../context/ScenarioContext";
import { Button } from "../../../components/Button";
import "./ScenarioStep1.css";

const tempInputStyle =
  "w-[172px] h-[40px] border-[1px] rounded-[5px] border-gray-800 border-solid text-gray-800 p-[10px] text-[12px]";

export function ScenarioStep1() {
  const { state, setParams, active, setActive } = useContext(ScenarioContext);
  const temperatureRawData = state.context;

  return (
    <>
      <div className="border-b-[1px] border-trueGray-200 border-solid pb-[34px]">
        <div>Outdoor Tempurature (℃)</div>
        <div className="inline-flex pt-[21px]">
          <div className="min-temp pr-[16px]">
            <div className="mb-[10px]">Min Outdoor Tempurature*:</div>
            <div data-value={temperatureRawData?.min}>
              <input
                type="number"
                className={tempInputStyle}
                value={temperatureRawData?.min}
                onChange={(e) => {
                  console.log("min");
                  console.log(temperatureRawData);
                  setParams("SET_MIN_MAX", {
                    ...temperatureRawData,
                    min: parseInt(e.target.value),
                  });
                }}
              />
            </div>
          </div>
          <div className="max-temp">
            <div className="mb-[10px]">Max Outdoor Tempurature*:</div>
            <div data-value={temperatureRawData?.max || 0}>
              <input
                type="number"
                className={tempInputStyle}
                value={temperatureRawData?.max || 0}
                onChange={(e) => {
                  setParams("SET_MIN_MAX", {
                    ...temperatureRawData,
                    max: parseInt(e.target.value),
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-[65px] mt-[30px]">
        <Button
          btnTxt="Next"
          onBtnClick={() => {
            setActive(active + 1);
          }}
        />
      </div>
    </>
  );
}
