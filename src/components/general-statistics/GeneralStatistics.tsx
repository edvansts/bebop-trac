import React, { useMemo } from "react";
import { Card, Statistic } from "antd";
import { colors } from "../../static/Styles";
import {
  useGetAssetsQuery,
  useGetCompaniesQuery,
  useGetUnitsQuery,
  useGetUsersQuery,
} from "../../store/api/Endpoints";
import {
  AimOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { percentage } from "../../static/FnUtils";
import useScreenModel from "../../hooks/useScreenModel";

import styles from "./GeneralStatistics.module.scss";

function GeneralStatistics() {
  const isMobile = useScreenModel("mobile");

  const assets = useGetAssetsQuery();
  const users = useGetUsersQuery();
  const companies = useGetCompaniesQuery();
  const units = useGetUnitsQuery();

  const newAssetsThisWeekPercentage = useMemo(() => {
    if (!assets.data) return null;

    return percentage(assets.data.newAssetsThisWeek, assets.data.assets.length);
  }, [assets.data]);

  const assetsInativedThisWeekPercentage = useMemo(() => {
    if (!assets.data) return null;

    return percentage(
      assets.data.assetsInativedThisWeek,
      assets.data.assets.length
    );
  }, [assets.data]);

  return (
    <div className={styles.statisticsContainer}>
      <Card
        title={<Link to="/ativos">Ativos</Link>}
        loading={assets.isLoading}
        style={{ minWidth: "12.5rem", width: isMobile ? "100%" : "auto" }}
      >
        {/* <Row gutter={16} justify="center" style={{ width: "100%" }}> */}
        <div className={styles.assetsCard}>
          <Statistic
            title="Em funcionamento"
            value={assets.data?.inOperation?.length}
            valueStyle={{ color: colors.green }}
          />

          <Statistic
            title="Em alerta"
            value={assets.data?.inAlert?.length}
            valueStyle={{ color: colors.warn }}
          />

          <Statistic
            title="Inativos"
            value={assets.data?.inDowntime?.length}
            valueStyle={{ color: colors.red }}
          />

          {newAssetsThisWeekPercentage ? (
            <Statistic
              title="Novos Ativos na última semana"
              value={newAssetsThisWeekPercentage}
              precision={1}
              valueStyle={{ color: colors.green }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
            />
          ) : null}

          {assetsInativedThisWeekPercentage ? (
            <Statistic
              title="Inativos na última semana"
              value={assets.data?.assetsInativedThisWeek}
              precision={1}
              valueStyle={{ color: colors.red }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
            />
          ) : null}
        </div>
      </Card>

      <Card
        title={<Link to="/usuarios">Usuários</Link>}
        loading={users.isLoading}
        style={{ minWidth: "12.5rem", flex: isMobile ? "1" : "initial" }}
      >
        <Statistic
          title="Usuários ativos"
          value={users.data?.length}
          prefix={<TeamOutlined />}
        />
      </Card>

      <Card
        title={<Link to="/empresas">Empresas</Link>}
        loading={companies.isLoading}
        style={{ minWidth: "12.5rem", flex: isMobile ? "1" : "initial" }}
      >
        <Statistic
          title="Empresas ativas"
          value={companies.data?.length}
          prefix={<ShopOutlined />}
        />
      </Card>

      <Card
        title={<Link to="/unidades">Unidades</Link>}
        loading={units.isLoading}
        style={{ minWidth: "12.5rem", flex: isMobile ? "1" : "initial" }}
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
