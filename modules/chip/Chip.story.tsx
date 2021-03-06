import React, { useState } from "react";
import { ThemeStyleSheetFactory } from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import { useStyles } from "@diana-ui/base";
import { IconNames } from "@diana-ui/icon";
import ChipInput from "./ChipInput";
import ChipList from "./ChipList";
import CloseableChip from "./CloseableChip";

const styleSheet: ThemeStyleSheetFactory = theme => ({
  iconLeft: {
    marginRight: "8px"
  },
  iconRight: {
    marginLeft: "8px"
  }
});
export const ChipIcon: React.FC<{
  name: IconNames;
  type: "left" | "right";
}> = ({ children, type, name, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <Icon
      size={16}
      name={name}
      className={cx(type === "left" && styles.iconLeft, type === "right" && styles.iconRight)}
    />
  );
};

export const ChipListStory = () => {
  CloseableChip.extendStyles(
    () => ({
      chip: { borderColor: "yellow" }
    }),
    { register: true }
  );
  return <ChipList list={["test", "test2", "test3"]} />;
};

export const ChipInputDuplicateStory = () => {
  const [chips, setChips] = useState<string[]>(["1", "2"]);
  return (
    <ChipInput
      chips={chips}
      onChangeChips={setChips}
      allowDuplicates={true}
      placeholder="Placeholder"
    />
  );
};

export const ChipInputStory = () => {
  const [chips, setChips] = useState<string[]>([]);
  return <ChipInput chips={chips} onChangeChips={setChips} label="Label" singleChip />;
};
