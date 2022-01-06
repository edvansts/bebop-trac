import { useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import { MediaQueryMobile } from "../static/constants";

type Screens = "mobile" ;

function useScreenModel(screenType: Screens) {
  const queryType = useMemo(() => {
    switch (screenType) {
      case "mobile":
        return MediaQueryMobile;
      default:
        return MediaQueryMobile;
    }
  }, [screenType]);

  const isScreenType = useMediaQuery({ query: queryType });

  return isScreenType;
}

export default useScreenModel;
