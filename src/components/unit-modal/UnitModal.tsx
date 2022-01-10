import React from "react";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store";
import { closeUnitModal } from "../../store/modules/layout/actions";
import { Link } from "react-router-dom";
import ButtonAnchor from "../../assets/shared/button-anchor/ButtonAnchor";

function UnitModal() {
  const dispatch = useDispatch();

  const unit = useSelector((state: IState) => state.layout.unitModalActived);

  function onClose() {
    dispatch(closeUnitModal());
  }

  if (!unit) return null;

  return (
    <Modal title={unit.name} visible closable onCancel={onClose} footer={null}>
      <p>
        <b>Id:</b> <span>{unit.id}</span>
      </p>
      <div>
        <ButtonAnchor onClick={() => {}}>
          <b>Empresa:</b> <span>{unit.companyId}</span>
        </ButtonAnchor>
      </div>

      <div>
        <Link to={`/ativos?unitId=${unit.id}`} onClick={onClose}>
          <Button type="link" style={{ padding: 0 }}>
            <b>Ver Ativos</b>
          </Button>
        </Link>
      </div>

      <div>
        <Link to={`/usuarios?unitId=${unit.id}`} onClick={onClose}>
          <Button type="link" style={{ padding: 0 }}>
            <b>Ver Usuários</b>
          </Button>
        </Link>
      </div>
    </Modal>
  );
}

export default UnitModal;
