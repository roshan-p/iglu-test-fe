import React, { useState } from 'react';
import { Tab } from '@headlessui/react'
import { toggleMachine } from '../../states/toggleMachine';
import { useMachine } from "@xstate/react";
import { CheckIcon } from '../../resources/icons';
import './Tabs.css';
const activeClass = "flex items-center justify-between focus:outline-none tab active text-warmGray-300 py-4 px-6 block hover:text-blue-600 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500"
const inactiveClass = "flex items-center justify-between focus:outline-none tab text-warmGray-300 py-4 px-6 block hover:text-blue-600 focus:outline-none"
export function Tabs() {
    const [active, setActive] = useState(0)

    return (
        <>
            <div className="bg-white">
                <nav className="tabs flex flex-col xl:flex-row">
                    <button onClick={() => setActive(0)} data-target="panel-1" className={active === 0 ? activeClass : inactiveClass}>
                        <div className="mr-5"><CheckIcon /></div> Description
                    </button>
                    <button onClick={() => setActive(1)} data-target="panel-2" className={active === 1 ? activeClass : inactiveClass}>
                        <div className="mr-5"><CheckIcon /></div>Map and Street View
                    </button>
                    <button onClick={() => setActive(2)} data-target="panel-3" className={active === 2 ? activeClass : inactiveClass}>
                        <div className="mr-5"><CheckIcon /></div>Other info
                    </button>
                </nav>
            </div>

            <div id="panels">
                <div className="panel-1 tab-content active py-5">   
                    <span className="mr-5 ">
                        <i className="fal fa-bed mr-1"></i> xxxxx
                    </span>
                    <span>
                        <i className="fal fa-bath mr-1"></i> yyyyy
                    </span>

                    zzzzz
                </div>
                <div className="panel-2 tab-content py-5">
                    Map here
                </div>
                <div className="panel-3 tab-content py-5">
                    other info
                </div>
            </div>
        </>
    )
}