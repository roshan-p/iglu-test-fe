import React, { useState } from "react";
interface MiniDropdownProps {
  onClickMiniDropdown: () => void;
  data: {
    title: string;
    list: Array<number>;
  };
  unit: string;
}
export function MiniDropdown({
  onClickMiniDropdown,
  data,
  unit,
}: MiniDropdownProps) {
  const [openSelect, setOpenSelect] = useState(false);
  const [ddTitle, setDDTitle] = useState("undefined");
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
            className="inline-flex w-[70px] justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 "
            id="menu-button"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {ddTitle}
            <svg
              className="-mr-1 ml-2 h-5 w-5] "
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
            className="width-[70px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none absolute"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            {data.list.map((item, index) => {
              return (
                <div key={index} className="py-1" role="none">
                  <span
                    className="text-gray-700 block px-4 py-2 text-sm"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                    onClick={() => {
                      onClickMiniDropdown();
                      setDDTitle(item.toString() + "℃");
                    }}
                  >
                    {item + unit}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
