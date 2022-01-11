import React from "react";
import { Descriptions, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { closeUserModal } from "../../store/modules/layout/actions";
import CompanyCard from "../company-card/CompanyCard";
import UnitCard from "../unit-card/UnitCard";

function UserModal() {
  const dispatch = useDispatch();

  const user = useSelector((state: IState) => state.layout.userModalActived);

  function onClose() {
    dispatch(closeUserModal());
  }

  if (!user) return null;

  return (
    <Modal title={user.name} visible closable onCancel={onClose} footer={null}>
      <Descriptions
        title="Informação do usuário"
        layout="vertical"
        bordered
        column={{ sm: 8, md: 12 }}
      >
        <Descriptions.Item label={<h4>Id</h4>} span={4}>
          {user.id}
        </Descriptions.Item>
        <Descriptions.Item label={<h4>Email</h4>} span={12}>
          {user.email}
        </Descriptions.Item>
        <Descriptions.Item label={<h4>Unidade</h4>} span={12}>
          <UnitCard id={`${user.unitId}`} onCloseCallback={onClose} />
        </Descriptions.Item>
        <Descriptions.Item label={<h4>Empresa</h4>} span={12}>
          <CompanyCard id={`${user.companyId}`} onCloseCallback={onClose} />
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
}

export default UserModal;
