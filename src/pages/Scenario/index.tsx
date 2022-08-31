import React from 'react';

import { toggleMachine } from '../../states/toggleMachine';
import { useMachine } from "@xstate/react";
import './Scenario.css';
import { Tabs } from '../../components/Tabs';

export function Scenario() {
    const [current, send] = useMachine(toggleMachine);
    const active = current.matches("active");
    const { count } = current.context;
    return (
        <div>
            <Tabs />
            <h1>XState React Template</h1>
            <h2>Fork this template!</h2>


            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => send("TOGGLE")}>
                Click me ({active ? "✅" : "❌"})
            </button>{" "}
            <code>
                Toggled <strong>{count}</strong> times
            </code>

        </div>
    );
}