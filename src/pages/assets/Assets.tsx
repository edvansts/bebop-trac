/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Layout, Row, Col, Card, Divider, Spin, Image } from "antd";
import { useGetAssetsQuery } from "../../store/api/Endpoints";
import { Asset } from "../../types";
import useScreenModel from "../../hooks/useScreenModel";
import { useDispatch } from "react-redux";
import { openAssetModal } from "../../store/modules/layout/actions";
import { toDate, format } from "../../static/DateFn";
import { ASSET_STATUS } from "../../static/constants";
import HealthScore from "../../assets/shared/health-score/HealthScore";
import { isArray, isEmpty } from "lodash";
import styles from "./Assets.module.scss";
import AssetsListForm, {
  IAssetsListForm,
} from "../../features/assets-list-form/AssetsListForm";

type AssetsFilters = IAssetsListForm;

function Ativos() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<AssetsFilters>();

  const {
    isFetching,
    refetch,
    data: assets,
    isLoading,
  } = useGetAssetsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ isFetching, isLoading, data }) => {
      if (!filters || isEmpty(filters)) {
        return { isFetching, isLoading, data: data?.assets };
      }

      const filteredAssets = data?.assets.filter((asset) => {
        if (filters.companySelected) {
          if (String(asset.companyId) !== filters.companySelected) {
            return false;
          }
        }

        if (filters.unitSelected) {
          if (String(asset.companyId) !== filters.unitSelected) {
            return false;
          }
        }

        if (
          !isEmpty(filters.statusSelected) &&
          isArray(filters.statusSelected)
        ) {
          if (
            !filters.statusSelected.some((status) => status === asset.status)
          ) {
            return false;
          }
        }

        return true;
      });

      return { isFetching, isLoading, data: filteredAssets };
    },
  });

  useEffect(() => {
    if (filters) {
      refetch();
    }
  }, [filters]);

  const isTablet = useScreenModel("tablet");

  function handleClickCard(asset: Asset) {
    dispatch(openAssetModal(asset));
  }

  function handleSearchAssets(filters: AssetsFilters) {
    setFilters(filters);
  }

  function renderDescription(asset: Asset) {
    const status = ASSET_STATUS[asset.status];
    return (
      <div>
        <h3 style={{ color: status.color }}>{status.text}</h3>
        <p>
          Status da saúde: <HealthScore healthScore={asset.healthscore} />
        </p>
        <p>
          Última atualização:{" "}
          {format(toDate(asset.metrics.lastUptimeAt), "dd/MM/yyyy HH:mm")}
        </p>
      </div>
    );
  }

  return (
    <Layout.Content
      style={{
        margin: isTablet ? "1.25rem 1.25rem 0" : "1.25rem 2.5rem 0",
      }}
    >
      <AssetsListForm
        handleSearchAssets={handleSearchAssets}
        isFetching={isFetching}
      />

      <Divider orientation="left">Ativos</Divider>

      <Spin size="large" spinning={isLoading || isFetching}>
        {assets && !isEmpty(assets) ? (
          <Row gutter={[20, 20]}>
            {assets.map((asset) => (
              <Col
                xs={24}
                sm={12}
                md={8}
                xl={6}
                xxl={4}
                key={asset.id}
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
                        height="14.0625rem"
                      />
                    </div>
                  }
                >
                  <Card.Meta
                    title={<h2>{asset.name}</h2>}
                    description={renderDescription(asset)}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <h3>Nenhum ativo encontrado.</h3>
        )}
      </Spin>
    </Layout.Content>
  );
}

export default Ativos;
