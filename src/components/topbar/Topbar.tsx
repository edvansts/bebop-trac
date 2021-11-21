import { Image, Layout, Button } from "antd";

import logo from "../../assets/logo.png";

import styles from "./Topbar.module.scss";

function Topbar() {
  return (
    <Layout.Header>
      <div className={styles.innerHeader}>
        <Image
          src={logo}
          alt="logo"
          preview={false}
          className={styles.logo}
          height="100%"
        />

        <ul className={styles.navigation}>
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
        </ul>
      </div>
    </Layout.Header>
  );
}

export default Topbar;
