import { useMemo } from "react";
import { Layout, Menu, Image } from "antd";
import { values } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PAGES } from "../../static/Pages";
import { IState } from "../../store";
import logo from "../../assets/cutted/logo_white.png";
import useScreenModel from "../../hooks/useScreenModel";

import styles from "./Topbar.module.scss";

function Topbar() {
  const navigate = useNavigate();

  const pageActive = useSelector((state: IState) => state.layout.pageActive);

  const isMobile = useScreenModel("custom", "(max-width: 530px)");

  const pages = useMemo(() => {
    if (!isMobile || pageActive.key === PAGES.home.key) return values(PAGES);

    const pageChoosed = values(PAGES).find(
      (page) => page.key === pageActive.key
    );

    const newPages = [
      pageChoosed!,
      ...values(PAGES).filter((page) => page.key !== pageActive.key),
    ];

    return newPages;
  }, [pageActive, isMobile]);

  return (
    <Layout.Header style={{ padding: "0 1.25rem" }}>
      <div className={`${styles.topbar}`}>
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="logo"
            preview={false}
            height="3.125rem"
            onClick={() => navigate("/")}
          />
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[pageActive.key]}
          className={styles.menu}
          activeKey={pageActive.key}
        >
          {pages.map((page) => (
            <Menu.Item
              onClick={() => navigate(page.route)}
              key={page.key}
              icon={page.icon}
            >
              {page.title}
            </Menu.Item>
          ))}
        </Menu>
      </div>
    </Layout.Header>
  );
}

export default Topbar;
