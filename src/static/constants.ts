import { AssetStatus } from "../types";
import { colors } from "./Styles";

export const API_URL = process.env.REACT_APP_API_URL;

export interface StatusObj {
  text: string;
  color: string;
}

export const ASSET_STATUS: Record<AssetStatus, StatusObj> = {
  inAlert: {
    text: "Em alerta",
    color: colors.warn,
  },
  inDowntime: {
    text: "Inativo",
    color: colors.red,
  },
  inOperation: {
    text: "Em operação",
    color: colors.green,
  },
};
