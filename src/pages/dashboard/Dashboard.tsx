import React from "react";
import { Divider, Layout } from "antd";
import AssetsInfo from "../../features/assetsInfo/AssetsInfo";

function Dashboard() {
  return (
    <Layout.Content style={{ margin: 40 }}>
      <Divider orientation="left">Dashboard</Divider>

      <AssetsInfo />
    </Layout.Content>
  );
}

export default Dashboard;
