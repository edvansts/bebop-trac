import { Card, Col, Divider, Layout, Row, Spin } from "antd";
import { useGetCompaniesQuery } from "../../store/api/Endpoints";
import { Company } from "../../types";
import { useDispatch } from "react-redux";
import { openCompanyModal } from "../../store/modules/layout/actions";
import useScreenModel from "../../hooks/useScreenModel";

function Companies() {
  const dispatch = useDispatch();

  const isTablet = useScreenModel("tablet");

  const {
    isFetching,
    isLoading,
    data: companies,
  } = useGetCompaniesQuery(undefined, { refetchOnMountOrArgChange: true });

  function handleClickCard(company: Company) {
    dispatch(openCompanyModal(company));
  }

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 0" : "1.25rem 2.5rem 0",
      }}
    >
      <Divider orientation="left">Empresas</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        <Row gutter={[20, 20]}>
          {companies?.map((company) => (
            <Col
              key={company.id}
              xs={24}
              sm={12}
              md={8}
              xl={6}
              xxl={4}
              onClick={() => handleClickCard(company)}
            >
              <Card bordered hoverable>
                <Card.Meta title={company.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </Layout.Content>
  );
}

export default Companies;
