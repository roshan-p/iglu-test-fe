import React, { useState, useEffect } from "react";
interface ButtonProps {
  btnTxt: string;
  disabled?: boolean;
  onBtnClick: () => void;
  variant?: string;
}
const defaultStyle =
  "bg-[#0072FF] min-w-[72px] h-[30px] hover:bg-blue-700 text-white rounded disabled:bg-gray-300 pl-[10px] pr-[10px]";
const secondaryStyle =
  "bg-[#FFFFFF] min-w-[72px] h-[30px] hover:bg-gray-100 text-blue-600 rounded disabled:bg-gray-300 border-[#0072FF] border-[1px] border-solid  pl-[10px] pr-[10px]";

export function Button({
  btnTxt,
  disabled = false,
  onBtnClick,
  variant = "default",
}: ButtonProps) {
  const [styles, setStyles] = useState(defaultStyle);

  useEffect(() => {
    if (variant === "secondary") setStyles(secondaryStyle);
  }, [variant]);

  return (
    <button disabled={disabled} onClick={onBtnClick} className={styles}>
      {btnTxt}
    </button>
  );
}
