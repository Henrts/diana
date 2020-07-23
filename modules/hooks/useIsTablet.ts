import { useTheme } from "@diana-ui/base";
import { EBreakpoints } from "@diana-ui/types";
import useCheckWindowSize from "./useCheckWindowSize";

const useIsTablet = () => {
  const { breakpoints } = useTheme();

  return useCheckWindowSize(breakpoints[EBreakpoints.TABLET1], breakpoints[EBreakpoints.MOBILE2]);
};

export default useIsTablet;
