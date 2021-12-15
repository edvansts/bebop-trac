import {
  AimOutlined,
  DatabaseOutlined,
  HomeOutlined,
  ShopOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { find } from "lodash";
import { ReactElement, ReactNode } from "react";

import Assets from "../pages/assets/Assets";
import Units from "../pages/units/Units";

export interface IPage {
  title: string;
  key: string;
  route: string;
  icon: ReactNode;
  component: ReactElement;
  path: string;
  subPages?: IPage[];
}

export const PAGES: Record<string, IPage> = {
  home: {
    key: "home",
    route: "/",
    title: "Home",
    path: "/",
    icon: <HomeOutlined />,
    component: <div>hello world</div>,
  },
  ativos: {
    key: "ativos",
    route: "/ativos",
    title: "Ativos",
    path: "ativos/*",
    icon: <DatabaseOutlined />,
    component: <Assets />,
  },
  empresas: {
    key: "empresas",
    route: "/empresas",
    title: "Empresas",
    path: "empresas/*",
    icon: <ShopOutlined />,
    component: <div>hello empresas</div>,
  },
  Unidades: {
    key: "unidades",
    route: "/unidades",
    title: "Unidades",
    path: "unidades/*",
    icon: <AimOutlined />,
    component: <Units />,
  },
  usuarios: {
    key: "usuarios",
    route: "/usuarios",
    title: "Usuários",
    path: "usuarios/*",
    icon: <TeamOutlined />,
    component: <div>hello usuarios</div>,
  },
};

export function searchPage(
  pages: IPage[],
  location: Partial<Location>
): IPage | null {
  let pageSearched: IPage | null = null;

  find(pages, (page) => {
    if (page.subPages) {
      const subPageSearched = searchPage(page.subPages, location);

      if (subPageSearched) {
        pageSearched = subPageSearched;
        return true;
      }
    }

    if (page.route === location.pathname) {
      pageSearched = page;
      return true;
    }
  });

  return pageSearched;
}
