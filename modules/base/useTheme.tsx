import { useTheme as aesUseTheme } from "aesthetic-react";
import { Theme } from "@diana-ui/types";

const useTheme = () => aesUseTheme<Theme>();

export default useTheme;
