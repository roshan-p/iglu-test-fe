import React, { useState, useContext } from "react";
import "./ScenarioPage.css";
import { Tabs } from "../../components/Tabs";
import { ScenarioStep1 } from "./ScenarioStep1";
import { ScenarioStep2 } from "./ScenarioStep2";
import { ScenarioStep3 } from "./ScenarioStep3";
import { ScenarioContext } from "../../context/ScenarioContext";

export function ScenarioPage() {
  const { active, setActive } = useContext(ScenarioContext);

  return (
    <div>
      <Tabs
        active={active}
        setActive={setActive}
        tab_0_detail={
          <div>
            <ScenarioStep1 />
          </div>
        }
        tab_1_detail={
          <div>
            <ScenarioStep2 />
          </div>
        }
        tab_2_detail={
          <div>
            <ScenarioStep3 />
          </div>
        }
      />
    </div>
  );
}
