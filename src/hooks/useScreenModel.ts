import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { MediaQueryMobile, MediaQueryTablet } from "../static/Styles";

type Screens = "mobile" | "custom" | "tablet";

function useScreenModel(screenType: Screens, customModel?: string) {
  const queryType = useMemo(() => {
    switch (screenType) {
      case "mobile":
        return MediaQueryMobile;
      case "custom":
        return customModel;
      case "tablet":
        return MediaQueryTablet;
      default:
        return MediaQueryMobile;
    }
  }, [screenType, customModel]);

  const isScreenType = useMediaQuery({ query: queryType });

  return isScreenType;
}

export default useScreenModel;
