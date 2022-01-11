import React from "react";
import { Card } from "antd";
import { useGetCompanyByIdQuery } from "../../store/api/Endpoints";
import { useDispatch } from "react-redux";
import { openCompanyModal } from "../../store/modules/layout/actions";

interface CompanyCardProps {
  id: string;
  onCloseCallback?(): void;
}

function CompanyCard({ id, onCloseCallback }: CompanyCardProps) {
  const dispatch = useDispatch();

  const { isFetching, isError, data: company } = useGetCompanyByIdQuery(id);

  if (isError) {
    return <div>Erro ao carregar empresa.</div>;
  }

  function handleOpenCompanyModal() {
    if (onCloseCallback) {
      onCloseCallback();
    }

    if (company) {
      dispatch(openCompanyModal(company));
    }
  }

  return (
    <Card
      loading={isFetching}
      size="small"
      hoverable
      onClick={handleOpenCompanyModal}
    >
      <h4>{company?.name}</h4>
      <p>
        <b>Id:</b> <span>{company?.id}</span>
      </p>
    </Card>
  );
}

export default CompanyCard;
