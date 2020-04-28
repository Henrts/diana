import React, { useState } from "react";
import { withStyles } from "@diana-ui/base";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "@diana-ui/types";

// @ts-ignore
export interface IProps extends StandardProps<"div"> {
  allowMultipleExpandedPanels?: boolean;
  children: JSX.Element[];
  disabled?: boolean;
  initialExpandedPanelIndex?: number;
  onClick?: (expandedPanelIndex: number, isExpanded: boolean) => void;
}

const stylesheet: ThemeStyleSheetFactory = () => ({
  panels: {}
});

const ExpandablePanels: React.FC<IProps & WithStylesProps> = ({
  allowMultipleExpandedPanels = true,
  children,
  className,
  cx,
  disabled,
  initialExpandedPanelIndex,
  onClick,
  styles
}) => {
  const [expandedPanelIndex, setExpandedPanelIndex] = useState(
    initialExpandedPanelIndex === undefined ? -1 : initialExpandedPanelIndex
  );

  const handleClick = (index: number, isExpanded: boolean) => {
    if (disabled) {
      return;
    }

    // children's state is handled here
    if (!allowMultipleExpandedPanels) {
      setExpandedPanelIndex(index === expandedPanelIndex ? -1 : index);
    }

    // eslint-disable-next-line mdx/no-unused-expressions
    onClick?.(index, isExpanded);
  };

  return (
    <div className={cx(className, styles.panels)}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          disabled: disabled || child.props.disabled,
          expanded: allowMultipleExpandedPanels
            ? undefined // children handle their own state
            : expandedPanelIndex === index,
          initialExpanded: allowMultipleExpandedPanels
            ? initialExpandedPanelIndex === index || child.props.initialExpanded
            : initialExpandedPanelIndex === index,
          onClick: (isExpanded: boolean) => handleClick(index, isExpanded)
        })
      )}
    </div>
  );
};

export default withStyles(stylesheet)(ExpandablePanels);
