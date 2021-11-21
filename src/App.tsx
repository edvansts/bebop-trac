import { Layout } from "antd";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";

function App() {
  return (
    <Layout style={{ height: "100vh" }}>
      <Sidebar />
      <Layout>
        <Topbar />
      </Layout>
    </Layout>
  );
}

export default App;
