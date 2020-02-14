import { IProps } from "./Dropdown";
import { IMultipleProps } from "./MultipleDropdown";

export { default as Dropdown } from "./Dropdown";
export { default as MultipleDropdown } from "./MultipleDropdown";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IDropdownProps = IProps<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IMultipleDropdownProps = IMultipleProps<any>;
