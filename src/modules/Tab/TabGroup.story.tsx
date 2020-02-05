import React, { useState } from "react";
import TabGroup, { IProps } from "./TabGroup";
import Tab from "./Tab";

const TabGroupExample: React.FC<IProps> = ({ selectedTab, ...props }) => {
  const [selected, setSelected] = useState(selectedTab);

  return (
    <TabGroup
      selectedTab={selected}
      onTabClick={newTab => setSelected(newTab)}
      {...props}
    >
      <Tab id="tab1">Tab 1</Tab>
      <Tab id="tab2">Tab 2</Tab>
      <Tab id="tab3">Tab 3</Tab>
    </TabGroup>
  );
};

export { TabGroupExample };
