export type AssetStatus = "inAlert" | "inDowntime" | "inOperation";

export interface Asset {
  id: number;
  sensors: string[];
  model: string;
  status: AssetStatus;
  healthscore: number;
  name: string;
  image: string;
  specifications: {
    rpm?: number | null;
    maxTemp?: number;
    power?: number;
  };
  metrics: {
    totalCollectsUptime: number;
    totalUptime: number;
    lastUptimeAt: number;
  };
  unitId: number;
  companyId: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  unitId: number;
  companyId: number;
}

export interface Unit {
  id: number;
  name: string;
  companyId: number;
}

export interface Company {
  id: number;
  name: string;
}
