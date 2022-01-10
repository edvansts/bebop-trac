import React from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { IState } from "../../store";
import AssetModal from "../../components/asset-modal/AssetModal";
import CompanyModal from "../../components/company-modal/CompanyModal";

function GlobalModals() {
  const assetModalActived = useSelector(
    (state: IState) => !isEmpty(state.layout.assetModalActived)
  );

  const companyModalActived = useSelector(
    (state: IState) => !isEmpty(state.layout.companyModalActived)
  );

  // const userModalActived = useSelector(
  //   (state: IState) => !isEmpty(state.layout.userModalActived)
  // );

  // const unitModalActived = useSelector(
  //   (state: IState) => !isEmpty(state.layout.unitModalActived)
  // );

  return (
    <>
      {assetModalActived ? <AssetModal /> : null}
      {companyModalActived ? <CompanyModal /> : null}
    </>
  );
}

export default GlobalModals;
