import React from "react";
import { CheckIcon } from "../../resources/icons";
import "./Tabs.css";
const activeClass =
  "flex items-center justify-between focus:outline-none tab active text-warmGray-300 py-4 px-6 block hover:text-blue-600 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500";
const inactiveClass =
  "flex items-center justify-between focus:outline-none tab text-warmGray-300 py-4 px-6 block hover:text-blue-600 focus:outline-none";
interface TabsProps {
  tab_0_detail: any;
  tab_1_detail: any;
  tab_2_detail: any;
  active: number;
  setActive: React.Dispatch<React.SetStateAction<number>>;
  disabledTab?: boolean;
}
export function Tabs({
  tab_0_detail,
  tab_1_detail,
  tab_2_detail,
  active,
  setActive,
  disabledTab = true,
}: TabsProps) {
  return (
    <>
      <div className="bg-white pt-[66px] pb-[44px]">
        <nav className="tabs flex flex-col md:flex-row border-b-[1px] border-trueGray-200 pl-8">
          <button
            disabled={disabledTab}
            onClick={() => setActive(0)}
            data-target="panel-1"
            className={active === 0 ? activeClass : inactiveClass}
          >
            <div className="mr-5">
              <CheckIcon />
            </div>{" "}
            Define Variables
          </button>
          <button
            disabled={disabledTab}
            onClick={() => setActive(1)}
            data-target="panel-2"
            className={active === 1 ? activeClass : inactiveClass}
          >
            <div className="mr-5">
              <CheckIcon />
            </div>
            Parameters
          </button>
          <button
            disabled={disabledTab}
            onClick={() => setActive(2)}
            data-target="panel-3"
            className={active === 2 ? activeClass : inactiveClass}
          >
            <div className="mr-5">
              <CheckIcon />
            </div>
            Info
          </button>
        </nav>
      </div>

      <div className="text-left" id="panels">
        {active === 0 && (
          <div className="panel-1 tab-content active py-5">{tab_0_detail}</div>
        )}
        {active === 1 && (
          <div className="panel-2 tab-content py-5"> {tab_1_detail}</div>
        )}
        {active === 2 && (
          <div className="panel-3 tab-content py-5"> {tab_2_detail}</div>
        )}
      </div>
    </>
  );
}
