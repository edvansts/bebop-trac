import { Asset } from ".";

export interface AssetsList {
  assets: Asset[];
  inAlert: Asset[];
  inDowntime: Asset[];
  inOperation: Asset[];
}
