import { useTheme } from "@diana-ui/base";
import { EBreakpoints } from "@diana-ui/types";
import { useWindowSize } from "./useWindowSize";

const useCheckWindowSize = (
  highBreakpoint: string | number = EBreakpoints.MOBILE2,
  lowBreakpoint: string | number = 0
) => {
  const [width] = useWindowSize();
  const theme = useTheme();

  let breakpointToCheck = highBreakpoint;

  if (typeof highBreakpoint === "string") {
    breakpointToCheck = theme.breakpoints[highBreakpoint] || 0;
  }

  return breakpointToCheck < width && width > lowBreakpoint;
};

export default useCheckWindowSize;
