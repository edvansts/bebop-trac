import { useState } from "react";
import { Layout, Row, Col, Card, Divider, Spin, Image } from "antd";

import { useGetAssetsQuery } from "../../store/api/Endpoints";
import { Asset, AssetStatus } from "../../types";
import AssetModal from "../../features/assetModal/AssetModal";
import useScreenModel from "../../hooks/useScreenModel";

import styles from "./Assets.module.scss";

const STATUS: Record<AssetStatus, string> = {
  inAlert: "Em alerta",
  inDowntime: "Inativo",
  inOperation: "Em operação",
};

function Ativos() {
  const { isFetching, isLoading, data } = useGetAssetsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const isTablet = useScreenModel("tablet");
  const isMobile = useScreenModel("mobile");

  const [assetActive, setAssetActive] = useState<Asset>();

  function handleClickCard(asset: Asset) {
    setAssetActive(asset);
  }

  function handleCloseAssetModal() {
    setAssetActive(undefined);
  }

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 0" : "1.25rem 2.5rem 0",
      }}
    >
      <Divider orientation="left">Ativos</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        <Row gutter={[20, 20]}>
          {data?.assets?.map((asset) => (
            <Col
              key={asset.id}
              span={isMobile ? 24 : isTablet ? 12 : 8}
              onClick={() => handleClickCard(asset)}
            >
              <Card
                style={{ height: "100%" }}
                bordered
                hoverable
                cover={
                  <div className={styles.cardImageContainer}>
                    <Image
                      onClick={(event) => event.stopPropagation()}
                      alt={asset.name}
                      src={asset.image}
                      width="auto"
                      height="15.625rem"
                    />
                  </div>
                }
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
