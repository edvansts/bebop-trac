import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { MediaQueryMobile } from "../static/constants";

type Screens = "mobile" | "custom";

function useScreenModel(screenType: Screens, customModel?: string) {
  const queryType = useMemo(() => {
    switch (screenType) {
      case "mobile":
        return MediaQueryMobile;
      case "custom":
        return customModel;
      default:
        return MediaQueryMobile;
    }
  }, [screenType, customModel]);

  const isScreenType = useMediaQuery({ query: queryType });

  return isScreenType;
}

export default useScreenModel;
