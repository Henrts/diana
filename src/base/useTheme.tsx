import { useTheme as aesUseTheme } from "aesthetic-react";
import { Theme } from "../types";

const useTheme = () => aesUseTheme<Theme>();

export default useTheme;
