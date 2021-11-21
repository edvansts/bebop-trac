import styles from "./Sidebar.module.scss";

import { Layout, Image, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { IState } from "../../store";
import { toggleSidebar } from "../../store/modules/layout/actions";
import logo from "../../assets/email.jpg";

function Sidebar() {
  const dispatch = useDispatch();
  const collapsed = useSelector((state: IState) => state.layout.collapsed);

  function toggleCollapsed() {
    dispatch(toggleSidebar());
  }

  return (
    <Layout.Sider
      collapsed={collapsed}
      collapsible
      onCollapse={toggleCollapsed}
    >
      <div className={styles.sider}>
        <div className={styles.logoContainer}>
          <Image src={logo} alt="logo" preview={false} height="100%" />
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
        </Menu>

        {/* <ul>
          <Button type="link" href="/">
            <li>Home</li>
          </Button>
          <Button type="link" href="/ativos">
            <li>Ativos</li>
          </Button>
          <Button type="link" href="/empresas">
            <li>Empresas</li>
          </Button>
          <Button type="link" href="/unidades">
            <li>Unidades</li>
          </Button>
          <Button type="link" href="/usuarios">
            <li>Usuários</li>
          </Button>
        </ul> */}
      </div>
    </Layout.Sider>
  );
}

export default Sidebar;
