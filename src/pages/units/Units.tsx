import { useState } from "react";
import { Card, Col, Divider, Layout, Row, Spin } from "antd";
import InfoModal from "../../components/info-modal/InfoModal";
import { useGetUnitsQuery } from "../../store/api/Endpoints";
import { Unit } from "../../types";

function Units() {
  const {
    isFetching,
    isLoading,
    data: units,
  } = useGetUnitsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [unitActive, setUnitActive] = useState<Unit>();

  function handleClickCard(unit: Unit) {
    setUnitActive(unit);
  }

  function handleCloseUnitModal() {
    setUnitActive(undefined);
  }

  return (
    <Layout.Content style={{ margin: 40 }}>
      <Divider orientation="left">Unidades</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        <Row gutter={[20, 20]}>
          {units?.map((unit) => (
            <Col key={unit.id} span={8} onClick={() => handleClickCard(unit)}>
              <Card bordered hoverable>
                <Card.Meta title={unit.name} />
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>

      {unitActive ? (
        <InfoModal onClose={handleCloseUnitModal} object={unitActive} />
      ) : null}
    </Layout.Content>
  );
}

export default Units;
