import React from "react";
import { Card } from "antd";
import { useGetUnitByIdQuery } from "../../store/api/Endpoints";
import { useDispatch } from "react-redux";
import { openUnitModal } from "../../store/modules/layout/actions";

interface UnitCardProps {
  id: string;
  onCloseCallback?(): void;
}

function UnitCard({ id, onCloseCallback }: UnitCardProps) {
  const dispatch = useDispatch();

  const { isFetching, isError, data: unit } = useGetUnitByIdQuery(id);

  if (isError) {
    return <div>Erro ao carregar unidade.</div>;
  }

  function handleOpenUnitModal() {
    if (onCloseCallback) {
      onCloseCallback();
    }

    if (unit) {
      dispatch(openUnitModal(unit));
    }
  }

  return (
    <Card
      loading={isFetching}
      size="small"
      hoverable
      onClick={handleOpenUnitModal}
    >
      <h4>{unit?.name}</h4>
      <p>
        <b>Id:</b> <span>{unit?.id}</span>
      </p>
    </Card>
  );
}

export default UnitCard;
