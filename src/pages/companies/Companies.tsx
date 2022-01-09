import { useState } from "react";
import { Card, Col, Divider, Layout, Row, Spin } from "antd";
import InfoModal from "../../features/info-modal/InfoModal";
import { useGetCompaniesQuery } from "../../store/api/Endpoints";
import { Company } from "../../types";

function Companies() {
  const {
    isFetching,
    isLoading,
    data: companies,
  } = useGetCompaniesQuery(undefined, { refetchOnMountOrArgChange: true });

  const [companyActive, setCompanyActive] = useState<Company>();

  function handleClickCard(company: Company) {
    setCompanyActive(company);
  }

  function handleCloseCompanyModal() {
    setCompanyActive(undefined);
  }

  return (
    <Layout.Content style={{ margin: 40 }}>
      <Divider orientation="left">Empresas</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        <Row gutter={[20, 20]}>
          {companies?.map((company) => (
            <Col
              key={company.id}
              span={8}
              onClick={() => handleClickCard(company)}
            >
              <Card bordered hoverable>
                <Card.Meta title={company.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>

      {companyActive ? (
        <InfoModal onClose={handleCloseCompanyModal} object={companyActive} />
      ) : null}
    </Layout.Content>
  );
}

export default Companies;
