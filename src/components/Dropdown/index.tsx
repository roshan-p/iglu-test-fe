import React, { useState } from "react";
interface DropdownProps {
  onClickDropdown: () => void;
  temperatureCalcData?: {
      paramName: string;
      units: string;
      selectedFunctionName: string;
      selectedFunctionTitle: string;
      values: {
        functionIndex: number;
        functionData: Array<number>;
      }
    };
  setSelectedDropdown:React.Dispatch<React.SetStateAction<number>>
}
export function Dropdown({
  onClickDropdown,
  temperatureCalcData,
  setSelectedDropdown
}: DropdownProps) {
  const [openSelect, setOpenSelect] = useState(false);
  return (
    <>
      <div
        className="relative inline-block text-left"
        onClick={() => {
          setOpenSelect(!openSelect);
        }}
      >
        <div>
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 "
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {temperatureCalcData?.selectedFunctionName || 'undefined'}
            <br></br>
            {temperatureCalcData?.selectedFunctionTitle}
            <svg
              className="-mr-1 ml-2 h-5 w-5 mt-[20px] "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {openSelect && (
          <div
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <span
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-0"
                onClick={() => {
                  onClickDropdown();
                  setSelectedDropdown(1)
                }}
              >
              Outdoor Temperature
              </span>
              {/* <span
                className="text-gray-700 block px-4 py-2 text-sm"
                role="menuitem"
                tabIndex={-1}
                id="menu-item-1"
                onClick={() => {
                  onClickDropdown();
                  setSelectedDropdown(2)
                }}
              >
              Time of Day
              </span> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
