import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from "react";
import {
  StandardProps,
  WithStylesProps,
  ThemeStyleSheetFactory
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";

export interface IRadioGroupGroupRef {
  setSelectedValue: (newValue: string) => void;
}

export interface IProps extends StandardProps<"div"> {
  children: JSX.Element[];
  disabled?: boolean;
  hasError?: boolean;
  initialValue?: string;
  name: string;
  selectedValue?: string;
  onValueSelect?: (selectedValue: string) => void;
}

const styleSheet: ThemeStyleSheetFactory = () => ({
  radioGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
});

const RadioGroup: React.FC<IProps & WithStylesProps> = ({
  className,
  children,
  cx,
  disabled,
  initialValue,
  selectedValue,
  styles,
  onValueSelect,
  wrappedRef,
  ...props
}) => {
  const [selected, setSelected] = useState(initialValue);

  // state is being controlled by the parent component
  useEffect(() => {
    if (typeof selectedValue !== "undefined") {
      setSelected(selectedValue);
    }
  }, [selectedValue]);

  const handleValueSelect = useCallback(
    newValue => {
      // state is being controlled internally
      if (selectedValue === undefined) {
        setSelected(newValue);
      }

      if (onValueSelect) {
        onValueSelect(newValue);
      }
    },
    [onValueSelect, selectedValue]
  );

  useImperativeHandle<IRadioGroupGroupRef, IRadioGroupGroupRef>(
    wrappedRef,
    () => ({
      setSelectedValue: newValue => setSelected(newValue)
    })
  );

  return (
    <div className={cx(styles.radioGroup, className)}>
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          disabled: child.props.disabled ?? disabled,
          selectedValue: selected,
          onValueSelect: handleValueSelect,
          ...props
        })
      )}
    </div>
  );
};

export default withStyles(styleSheet)(RadioGroup);
