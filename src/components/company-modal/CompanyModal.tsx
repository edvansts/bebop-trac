import React from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { closeCompanyModal } from "../../store/modules/layout/actions";
import { Link } from "react-router-dom";

function CompanyModal() {
  const dispatch = useDispatch();

  const company = useSelector(
    (state: IState) => state.layout.companyModalActived
  );

  function onClose() {
    dispatch(closeCompanyModal());
  }

  if (!company) return null;

  return (
    <Modal
      title={company.name}
      visible
      closable
      onCancel={onClose}
      footer={null}
    >
      <p>
        <b>Id:</b> <span>{company.id}</span>
      </p>

      <div>
        <Link to={`/ativos?companySelected=${company.id}`} onClick={onClose}>
          <Button type="link" style={{ padding: 0 }}>
            <b>Ver Ativos</b>
          </Button>
        </Link>
      </div>

      <div>
        <Link to={`/usuarios?companySelected=${company.id}`} onClick={onClose}>
          <Button type="link" style={{ padding: 0 }}>
            <b>Ver Usuários</b>
          </Button>
        </Link>
      </div>

      <div>
        <Link to={`/unidades?companySelected=${company.id}`} onClick={onClose}>
          <Button type="link" style={{ padding: 0 }}>
            <b>Ver Unidades</b>
          </Button>
        </Link>
      </div>
    </Modal>
  );
}

export default CompanyModal;
