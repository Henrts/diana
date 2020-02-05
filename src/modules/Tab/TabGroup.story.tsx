import React, { useRef } from "react";
import TabGroup, { IProps, ITabGroupRef } from "./TabGroup";
import Tab from "./Tab";

export const TabGroupRefExample = () => {
  const ref = useRef<ITabGroupRef>(null);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      }}
    >
      <TabGroup wrappedRef={ref}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
        <Tab>Tab 3</Tab>
      </TabGroup>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center"
        }}
      >
        <button
          onClick={() => {
            ref?.current?.setTab(0);
          }}
        >
          Select Tab 1
        </button>
        <button
          onClick={() => {
            ref?.current?.setTab(1);
          }}
        >
          Select Tab 2
        </button>
        <button
          onClick={() => {
            ref?.current?.setTab(2);
          }}
        >
          Select Tab 3
        </button>
      </div>
    </div>
  );
};
