import { Image, Layout } from "antd";

import logo from "../../assets/logo.png";

function Topbar() {
  return (
    <Layout.Header style={{ padding: '0.625rem 1.25rem' }}>
      <Image
        src={logo}
        alt="logo"
        preview={false}
        width="calc(height * 2.5)"
        height="100%"
      />
    </Layout.Header>
  );
}

export default Topbar;
