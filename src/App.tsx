/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from "antd";
import { values } from "lodash";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";

// import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./features/topbar/Topbar";
import GlobalModals from "./features/global-modals/GlobalModals";
import { PAGES, searchPage } from "./static/Pages";
import { changePageActive } from "./store/modules/layout/actions";

function App() {
  const dispatch = useDispatch();

  const location = useLocation();

  const routeKey = useMemo(() => {
    return location.key;
  }, [location.pathname]);

  useEffect(() => {
    const newPageActive = searchPage(values(PAGES), location) || PAGES.home;

    dispatch(changePageActive(newPageActive));
  }, [dispatch, location]);

  return (
    <Layout style={{ minHeight: "100vh", paddingBottom: "2.5rem" }}>
      {/* <Sidebar /> */}

      <Topbar />

      <Routes>
        {values(PAGES).map((page) => {
          const Component = page.component;
          return (
            <Route
              key={page.key}
              path={page.path}
              element={<Component key={routeKey} />}
            />
          );
        })}
      </Routes>

      <GlobalModals />
    </Layout>
  );
}

export default App;
