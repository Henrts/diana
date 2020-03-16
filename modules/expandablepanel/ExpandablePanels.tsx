import React, { useState } from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  WithStylesProps,
  Theme,
  ThemeStyleSheetFactory
} from "@diana-ui/types";

// @ts-ignore
export interface IProps extends StandardProps<"div"> {
  allowMultipleExpandedPanels?: boolean;
  children: JSX.Element[];
  disabled?: boolean;
  initialExpandedPanelIndex?: number;
  onClick?: (expandedPanelIndex: number) => void;
}

const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  panels: {
    border: "1px solid black"
  }
});

const ExpandablePanels: React.FC<IProps & WithStylesProps> = ({
  allowMultipleExpandedPanels = true,
  children,
  cx,
  disabled,
  initialExpandedPanelIndex,
  onClick,
  styles
}) => {
  const [expandedPanelIndex, setExpandedPanelIndex] = useState(
    initialExpandedPanelIndex === undefined ? -1 : initialExpandedPanelIndex
  );

  const handleClick = (index: number) => {
    if (disabled) {
      return;
    }

    // Children's state is handled here
    if (!allowMultipleExpandedPanels) {
      setExpandedPanelIndex(index === expandedPanelIndex ? -1 : index);
    }

    // eslint-disable-next-line mdx/no-unused-expressions
    onClick?.(index);
  };

  return (
    <div className={cx(styles.panels)}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          disabled: disabled || child.props.disabled,
          expanded: allowMultipleExpandedPanels
            ? undefined // Children handle their own state
            : expandedPanelIndex === index,
          initialExpanded: allowMultipleExpandedPanels
            ? initialExpandedPanelIndex === index || child.props.initialExpanded
            : initialExpandedPanelIndex === index,
          onClick: () => handleClick(index)
        })
      )}
    </div>
  );
};

export default withStyles(stylesheet)(ExpandablePanels);
