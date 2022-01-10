import React from "react";
import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { IState } from "../../store";
import AssetModal from "../../components/asset-modal/AssetModal";
import CompanyModal from "../../components/company-modal/CompanyModal";
import UnitModal from "../../components/unit-modal/UnitModal";
import UserModal from "../../components/user-modal/UserModal";

function GlobalModals() {
  const assetModalActived = useSelector(
    (state: IState) => !isEmpty(state.layout.assetModalActived)
  );

  const companyModalActived = useSelector(
    (state: IState) => !isEmpty(state.layout.companyModalActived)
  );

  const userModalActived = useSelector(
    (state: IState) => !isEmpty(state.layout.userModalActived)
  );

  const unitModalActived = useSelector(
    (state: IState) => !isEmpty(state.layout.unitModalActived)
  );

  return (
    <>
      {assetModalActived ? <AssetModal /> : null}
      {companyModalActived ? <CompanyModal /> : null}
      {unitModalActived ? <UnitModal /> : null}
      {userModalActived ? <UserModal /> : null}
    </>
  );
}

export default GlobalModals;
