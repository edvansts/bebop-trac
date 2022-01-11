import React from "react";
import { Card } from "antd";
import { useGetCompanyByIdQuery } from "../../store/api/Endpoints";

interface CompanyCardProps {
  id: string;
}

function CompanyCard({ id }: CompanyCardProps) {
  const { isFetching, isError, data: company } = useGetCompanyByIdQuery(id);

  if (isError) {
    return <div>Erro ao carregar empresa.</div>;
  }

  return (
    <Card loading={isFetching} size="small" hoverable>
      <h4>{company?.name}</h4>
      <p>
        <b>Id:</b> <span>{company?.id}</span>
      </p>
    </Card>
  );
}

export default CompanyCard;
