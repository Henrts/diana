import { IProps as IBaseProps } from "./BaseChip";
import { IProps as IStatusProps } from "./StatusChip";
import { IProps as ICloseableProps } from "./CloseableChip";
import { IProps as IListProps } from "./ChipList";
import { IProps as InputProps } from "./ChipInput";

export { default as BaseChip } from "./BaseChip";
export { default as StatusChip } from "./StatusChip";
export { default as CloseableChip } from "./CloseableChip";
export { default as ChipList } from "./ChipList";
export { default as ChipInput } from "./ChipInput";

export type IBaseChipProps = IBaseProps;
export type IStatusChipProps = IStatusProps;
export type ICloseableChipProps = ICloseableProps;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IChipListProps = IListProps<any>;
export type IChipInputProps = InputProps;
