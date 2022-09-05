import React, { useContext } from "react";
import { ScenarioContext } from "../../../context/ScenarioContext";
import { Button } from "../../../components/Button";

export function ScenarioStep3() {
  const { state, setParams, active, setActive } = useContext(ScenarioContext);
  const temperatureRawData = state.context;
  return (
    <div className="w-[493px]">
      <div>
        <div>Name*</div>
        <input
          onChange={(e) => {
            setParams("SET_MIN_MAX", {
              ...temperatureRawData,
              name: e.target.value,
            });
          }}
          className="w-[493px] h-[38px] rounded-[5px] border-[1px] border-solid border-gray-800 mt-[22px] pl-[10px] pr-[10px]"
        ></input>
      </div>
      <div>
        <div className="mt-[34px]">Description</div>
        <textarea
          onChange={(e) => {
            setParams("SET_MIN_MAX", {
              ...temperatureRawData,
              description: e.target.value,
            });
          }}
          className="w-[493px] h-[150px] max-h-[200px] rounded-[5px] border-[1px] border-solid border-gray-800 mt-[22px] p-[10px]"
        ></textarea>
      </div>
      <div className="space-between float-right mt-[35px]">
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
          disabled={temperatureRawData?.name.length === 0}
          onBtnClick={() => {setActive(active + 1);}}
        />
      </div>
    </div>
  );
}
