import { Card, Col, Divider, Layout, Row, Spin } from "antd";
import { useGetUnitsQuery } from "../../store/api/Endpoints";
import { Unit } from "../../types";
import { useDispatch } from "react-redux";
import useScreenModel from "../../hooks/useScreenModel";
import { openUnitModal } from "../../store/modules/layout/actions";

function Units() {
  const dispatch = useDispatch();

  const isTablet = useScreenModel("tablet");

  const {
    isFetching,
    isLoading,
    data: units,
  } = useGetUnitsQuery(undefined, { refetchOnMountOrArgChange: true });

  function handleClickCard(unit: Unit) {
    dispatch(openUnitModal(unit));
  }

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 0" : "1.25rem 2.5rem 0",
      }}
    >
      <Divider orientation="left">Unidades</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        <Row gutter={[20, 20]}>
          {units?.map((unit) => (
            <Col
              key={unit.id}
              xs={24}
              sm={12}
              md={8}
              xl={6}
              xxl={4}
              onClick={() => handleClickCard(unit)}
            >
              <Card bordered hoverable>
                <Card.Meta title={unit.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>
    </Layout.Content>
  );
}

export default Units;
