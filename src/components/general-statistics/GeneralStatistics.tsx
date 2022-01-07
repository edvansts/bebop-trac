import React from "react";

import { Card, Col, Row, Statistic } from "antd";
import useAssetsInfo from "../../hooks/useAssetsInfo";
import { colors } from "../../static/colors";
import {
  useGetCompaniesQuery,
  useGetUnitsQuery,
  useGetUsersQuery,
} from "../../store/api/Endpoints";
import { AimOutlined, ShopOutlined, TeamOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import styles from "./GeneralStatistics.module.scss";

function GeneralStatistics() {
  const assets = useAssetsInfo();
  const users = useGetUsersQuery();
  const companies = useGetCompaniesQuery();
  const units = useGetUnitsQuery();

  return (
    <div className={styles.statisticsContainer}>
      <Card
        title={<Link to="/ativos">Ativos</Link>}
        loading={assets.isFetching || assets.isLoading}
        style={{ width: "25rem" }}
      >
        <Row gutter={16} justify="center">
          <Col span={8}>
            <Statistic
              title="Operando"
              value={assets.inOperation?.length}
              valueStyle={{ color: colors.green }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Em alerta"
              value={assets.inAlert?.length}
              valueStyle={{ color: colors.warn }}
            />
          </Col>
          <Col span={8}>
            <Statistic
              title="Inativos"
              value={assets.inDowntime?.length}
              valueStyle={{ color: colors.red }}
            />
          </Col>
        </Row>
      </Card>

      <Card
        title={<Link to="/usuarios">Usuários</Link>}
        loading={users.isFetching || users.isLoading}
        style={{ width: "12.5rem" }}
      >
        <Statistic
          title="Usuários ativos"
          value={users.data?.length}
          prefix={<TeamOutlined />}
        />
      </Card>

      <Card
        title={<Link to="/empresas">Empresas</Link>}
        loading={companies.isFetching || companies.isLoading}
        style={{ width: "12.5rem" }}
      >
        <Statistic
          title="Empresas ativas"
          value={companies.data?.length}
          prefix={<ShopOutlined />}
        />
      </Card>

      <Card
        title={<Link to="/unidades">Unidades</Link>}
        loading={units.isFetching || units.isLoading}
        style={{ width: "12.5rem" }}
      >
        <Statistic
          title="Unidades ativas"
          value={units.data?.length}
          prefix={<AimOutlined />}
        />
      </Card>
    </div>
  );
}

export default GeneralStatistics;
