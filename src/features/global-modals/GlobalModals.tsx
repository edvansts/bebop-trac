import React from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { IState } from "../../store";
import AssetModal from "../asset-modal/AssetModal";

function GlobalModals() {
  const assetModalActived = useSelector(
    (state: IState) => !isEmpty(state.layout.assetModalActived)
  );

  return <>{assetModalActived ? <AssetModal /> : null}</>;
}

export default GlobalModals;
