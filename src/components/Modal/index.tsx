import React, { ReactElement } from "react";

interface ModalProps {
  modalContent: ReactElement;
  isModalOpen: boolean;
//   setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
  setOpenModal:Function;
}
export function Modal({ modalContent,isModalOpen,setOpenModal }: ModalProps) {
  return (
    <>
      {isModalOpen&&<div
        id="defaultModal"
        tabIndex={-1}
        aria-hidden="true"
        //hidden
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full bg-black/30 h-[100vh]"
      >
        <div className="relative p-4 w-[70%] m-auto h-full md:h-auto mt-[145px]">
          <div className="relative bg-white rounded-lg shadow pb-[122px]">
            <div className="flex justify-between items-start p-4 rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Terms of Service
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="defaultModal"
                onClick={()=>{setOpenModal()}}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <>{modalContent}</>
          </div>
        </div>
      </div>}
    </>
  );
}
