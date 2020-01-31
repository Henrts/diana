import React, { useState } from "react";
import Tab from "./Tab";
import TabGroup from "./TabGroup";

interface IProps {
  disabled?: boolean;
  selectedTab: string;
}

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
