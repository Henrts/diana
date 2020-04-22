// import React, { useMemo, useState, useRef, useEffect } from "react";
// import { ChipInput } from "@diana-ui/chip";
// import { Dropdown, IDropdownItem } from "@diana-ui/dropdown";
// import { Icon } from "@diana-ui/icon";
// import "./select.scss";
// import { ThemeStyleSheetFactory, Theme } from "@diana-ui/types";

// export interface IObjectOption extends IDropdownItem {
//   render?: () => React.ReactNode;
// }

// type SelectOption = IObjectOption;

// export interface IProps extends React.ComponentProps<typeof ChipInput> {
//   options: SelectOption[];
//   onOptionSelected: (option?: SelectOption | string) => void;
//   selectedOption?: SelectOption;
//   visible?: boolean;
//   label?: string;
//   placeholder?: string;
//   className?: string;
//   search?: boolean;
//   onShow?: () => void;
//   onHide?: () => void;
//   onFilter?: (option: SelectOption, text: string) => boolean;
//   onChangeText?: (text: string) => void;
//   onClear?: () => void;
// }

// function isIObjectOption(option: SelectOption): option is IObjectOption {
//   return (option as IObjectOption).id !== undefined;
// }
// const optionId = (option: SelectOption) =>
//   isIObjectOption(option) ? option.id : option;
// const optionText = (option: SelectOption) =>
//   isIObjectOption(option) ? option.text : option;
// const optionRender = (option: SelectOption) =>
//   isIObjectOption(option) && option.render
//     ? option.render()
//     : optionText(option);

// const stylesheet: ThemeStyleSheetFactory = (theme: Theme) => ({
//   select: {
//     cursor: "pointer",
//     display: "flex"
//   },
//   icon: {
//     marginLeft: theme.spaceUnit.xs
//   },
//   searchIcon: {
//     height: theme.spaceUnit.md,
//     width: theme.spaceUnit.md,
//     marginLeft: 0
//   },
//   selectLabel: {
//     fontWeight: "bold",
//     margin: `0px ${theme.spaceUnit.xs} 0px 0px`
//   }
// });

// function Select(propsT: IProps) {
//   const {
//     selectedOption,
//     onOptionSelected,
//     visible = false,
//     label,
//     placeholder,
//     className,
//     search,
//     style,
//     onShow,
//     onHide,
//     onFilter,
//     onChangeText,
//     onClear,
//     ...props
//   } = propsT;
//   const { options } = props;
//   const [show, setShow] = useState(visible);
//   const [text, setText] = useState<string>(
//     selectedOption ? optionText(selectedOption) || "" : ""
//   );
//   const toggleShow = () => setShow(!show);
//   const isValidOption = (option: T) =>
//     options.find(o => optionId(o) === optionId(option)) !== undefined;

//   useEffect(() => onChangeText?.(text), [text, onChangeText]);

//   const handleOptionClick = (option?: T) => {
//     setText(option ? optionText(option) : text);
//     onOptionSelected(option && isValidOption(option) ? option : text);
//     setShow(false);
//   };
//   const ref = useRef(null);
//   //   useOnClickOutside(ref, () => {
//   //     if (!show) {
//   //       return;
//   //     }
//   //     if (!selectedOption || optionId(selectedOption) !== text) {
//   //       onOptionSelected(text);
//   //     }
//   //     setShow(false);
//   //   });
//   useEffect(() => {
//     if (show && onShow) {
//       onShow();
//     } else if (!show && onHide) {
//       onHide();
//     }
//   }, [onHide, onShow, show]);

//   const inputRef = useRef<HTMLInputElement>(null);
//   const [suggestionIndex, setSuggestionIndex] = useState(0);
//   useEffect(() => {
//     setSuggestionIndex(0);
//   }, [text]);
//   useEffect(() => {
//     setText(selectedOption ? optionText(selectedOption) || "" : text);
//   }, [selectedOption, text]);

//   const availableOptions = useMemo(
//     () =>
//       search
//         ? options.filter(o =>
//             onFilter
//               ? onFilter(o, text)
//               : !text ||
//                 optionText(o)
//                   .toLowerCase()
//                   .startsWith(text.toLowerCase())
//           )
//         : options.filter(o => o !== selectedOption),
//     [search, options, onFilter, text, selectedOption]
//   );
//   const suggestion = useMemo(
//     () => (text ? availableOptions[suggestionIndex] : undefined),
//     [text, availableOptions, suggestionIndex]
//   );

//   const handleKey = (key: number) => {
//     switch (key) {
//       case 13: // enter
//         handleOptionClick(suggestion);
//         if (inputRef.current) {
//           inputRef.current.blur();
//         }
//         break;
//       case 39: // right
//         setText(suggestion ? optionText(suggestion) : text);
//         break;
//       case 40: // down
//         setSuggestionIndex((suggestionIndex + 1) % availableOptions.length);
//         break;
//       case 38: // up
//         setSuggestionIndex(
//           suggestionIndex === 0
//             ? availableOptions.length - 1
//             : suggestionIndex - 1
//         );
//         break;
//       default:
//         break;
//     }
//   };

//   const defaultHeader = (
//     <>
//       {selectedOption ? (
//         <div className="select-title">{selectedOption}</div>
//       ) : (
//         <div className="select-placeholder">{placeholder}</div>
//       )}
//       <Icon name="arrow-down" />
//     </>
//   );

//   const TextInputHeader = (
//     <ChipInput
//       {...props}
//       className="select-search-input"
//       label={label}
//       id="select-search-input"
//       value={[text]}
//       onChange={event => {
//         setText(event.target.value);
//       }}
//       onKeyUp={event => handleKey(event.keyCode)}
//       suffixIcon={
//         !show && text ? (
//           <Icon
//             name="close"
//             onClick={() => {
//               setText("");
//               if (onClear) {
//                 onClear();
//               }
//             }}
//             className="select-search-close"
//           />
//         ) : (
//           undefined
//         )
//       }
//     />
//   );

//   const header = search ? TextInputHeader : defaultHeader;

//   return (
//     <Dropdown items={availableOptions} onItemSelected={handleOptionClick} />
//     //   <div
//     //     className="select-content"
//     //     onClick={() => !(search && show) && toggleShow()}
//     //   >
//     //     <div
//     //       className={classnames(
//     //         "select-header",
//     //         selectedOption && "selected",
//     //         error && "error"
//     //       )}
//     //     >
//     //       {header}
//     //     </div>
//     //     {availableOptions.length > 0 && (
//     //       <div className={classnames("select-options", show && "visible")}>
//     //         {availableOptions.map(option => (
//     //           <div
//     //             className={classnames(
//     //               "select-options-item",
//     //               search && option === suggestion && "suggested",
//     //               option === selectedOption && "selected"
//     //             )}
//     //             key={optionId(option)}
//     //             onClick={() => handleOptionClick(option)}
//     //           >
//     //             {optionRender(option)}
//     //           </div>
//     //         ))}
//     //       </div>
//     //     )}
//     //   </div>
//     // </div>
//   );
// }

// export default Select;
