import styles from "./Sidebar.module.scss";

import { Layout, Image, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { values } from "lodash";
import { useNavigate } from "react-router-dom";

import { IState } from "../../store";
import { toggleSidebar } from "../../store/modules/layout/actions";
import logo from "../../assets/logo.jpg";
import { PAGES } from "../../static/Pages";

function Sidebar() {
  const dispatch = useDispatch();
  const collapsed = useSelector((state: IState) => state.layout.collapsed);
  const pageActive = useSelector((state: IState) => state.layout.pageActive);

  const navigate = useNavigate();

  function toggleCollapsed() {
    dispatch(toggleSidebar());
  }

  return (
    <Layout.Sider
      collapsed={collapsed}
      collapsible
      onCollapse={toggleCollapsed}
    >
      <div className={`${styles.sider} ${collapsed ?? styles.collapsed}`}>
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="logo"
            preview={false}
            height="100%"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
      <Menu theme="dark" mode="inline" selectedKeys={[pageActive.key]}>
        {values(PAGES).map((page) => (
          <Menu.Item
            onClick={() => navigate(page.route)}
            key={page.key}
            icon={page.icon}
          >
            {page.title}
          </Menu.Item>
        ))}
      </Menu>
    </Layout.Sider>
  );
}

export default Sidebar;
