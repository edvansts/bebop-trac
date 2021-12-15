import { useState } from "react";
import { Layout, Row, Col, Card, Divider, Spin } from "antd";

import { useGetAssetsQuery } from "../../store/api/Endpoints";
import { Asset, AssetStatus } from "../../types";
import AssetModal from "../../features/assetModal/AssetModal";

const STATUS: Record<AssetStatus, string> = {
  inAlert: "Em alerta",
  inDowntime: "Inativo",
  inOperation: "Em operação",
};

function Ativos() {
  const {
    isFetching,
    isLoading,
    data: assets,
  } = useGetAssetsQuery(undefined, { refetchOnMountOrArgChange: true });

  const [assetActive, setAssetActive] = useState<Asset>();

  function handleClickCard(asset: Asset) {
    setAssetActive(asset);
  }

  function handleCloseAssetModal() {
    setAssetActive(undefined);
  }

  return (
    <Layout.Content style={{ margin: 40 }}>
      <Divider orientation="left">Ativos</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        <Row gutter={[20, 20]}>
          {assets?.map((asset) => (
            <Col key={asset.id} span={8} onClick={() => handleClickCard(asset)}>
              <Card
                bordered
                hoverable
                cover={<img alt={asset.name} src={asset.image} />}
              >
                <Card.Meta
                  title={asset.name}
                  description={STATUS[asset.status]}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Spin>

      {assetActive ? (
        <AssetModal onClose={handleCloseAssetModal} asset={assetActive} />
      ) : null}
    </Layout.Content>
  );
}

export default Ativos;
