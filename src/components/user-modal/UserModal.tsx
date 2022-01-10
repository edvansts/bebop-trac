import React from "react";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { closeUserModal } from "../../store/modules/layout/actions";
import ButtonAnchor from "../../assets/shared/button-anchor/ButtonAnchor";

function UserModal() {
  const dispatch = useDispatch();

  const user = useSelector((state: IState) => state.layout.userModalActived);

  function onClose() {
    dispatch(closeUserModal());
  }

  if (!user) return null;

  return (
    <Modal title={user.name} visible closable onCancel={onClose} footer={null}>
      <p>
        <b>Id:</b> <span>{user.id}</span>
      </p>
      <p>
        <b>Email:</b> <span>{user.email}</span>
      </p>
      <div>
        <ButtonAnchor onClick={() => {}}>
          <b>Unidade:</b> <span>{user.unitId}</span>
        </ButtonAnchor>
      </div>
      <div>
        <ButtonAnchor onClick={() => {}}>
          <b>Empresa:</b> <span>{user.companyId}</span>
        </ButtonAnchor>
      </div>
    </Modal>
  );
}

export default UserModal;
