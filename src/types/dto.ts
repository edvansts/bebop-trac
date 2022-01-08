import { Asset } from ".";

export interface AssetsList {
  assets: Asset[];
  inAlert: Asset[];
  inDowntime: Asset[];
  inOperation: Asset[];
  newAssetsThisWeek: number;
  assetsInativedThisWeek: number;
  lastWeekInfo: DayInfo[];
}

export interface DayInfo {
  day: Date;
  assetsInAlert: number;
  assetsInOperation: number;
  assetsInDowntime: number;
}
