import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../static/constants";
import { Asset, Company, Unit, User } from "../../types";
import { AssetsList, DayInfo } from "../../types/dto";
import { subDays, addDays } from "date-fns";
import { toDate } from "../../static/DateFn";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: [
    "assets",
    "units",
    "users",
    "companies",
    "assetId",
    "unitId",
    "userId",
    "companyId",
  ],
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    /* --------------------------------- Assets --------------------------------- */
    getAssets: builder.query<AssetsList, void>({
      query: () => `/assets`,
      transformResponse: (response: Asset[]) => {
        const inAlert = response.filter((asset) => asset.status === "inAlert");
        const inDowntime = response.filter(
          (asset) => asset.status === "inDowntime"
        );
        const inOperation = response.filter(
          (asset) => asset.status === "inOperation"
        );

        const newAssetsThisWeek = Math.ceil(Math.random() * response.length);

        const assetsInativedThisWeek = Math.ceil(
          (Math.random() * response.length) / 2
        );

        const initialDate = subDays(toDate(), 7);
        let lastWeekInfo: DayInfo[] = [];

        for (let i = 0; i < 7; i++) {
          const info = {
            day: addDays(initialDate, i),
            assetsInAlert:
              Math.round(Math.random() * inAlert.length) +
              Math.ceil(Math.random() * 10),
            assetsInOperation:
              Math.round(Math.random() * inOperation.length) +
              Math.ceil(Math.random() * 10),
            assetsInDowntime:
              Math.round(Math.random() * inDowntime.length) +
              Math.ceil(Math.random() * 10),
          };

          lastWeekInfo = [...lastWeekInfo, info];
        }

        return {
          assets: response,
          inAlert,
          inDowntime,
          inOperation,
          newAssetsThisWeek,
          assetsInativedThisWeek,
          lastWeekInfo,
        };
      },
      providesTags: ["assets"],
    }),

    getAssetById: builder.query<Asset, string>({
      query: (id) => `/assets/${id}`,
      providesTags: ["assets", "assetId"],
    }),

    /* ---------------------------------- Units --------------------------------- */
    getUnits: builder.query<Unit[], void>({
      query: () => `/units`,
      transformResponse: (response: Unit[]) => response,
      providesTags: ["units"],
    }),

    getUnitById: builder.query<Unit, string>({
      query: (id) => `/units/${id}`,
      providesTags: ["units", "unitId"],
    }),

    /* ---------------------------------- Users --------------------------------- */
    getUsers: builder.query<User[], void>({
      query: () => `/users`,
      transformResponse: (response: User[]) => response,
      providesTags: ["users"],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["users", "userId"],
    }),

    /* ---------------------------------- Companies --------------------------------- */
    getCompanies: builder.query<Company[], void>({
      query: () => `/companies`,
      transformResponse: (response: Company[]) => response,
      providesTags: ["companies"],
    }),

    getCompanyById: builder.query<Company, string>({
      query: (id) => `/companies/${id}`,
      providesTags: ["companies", "companyId"],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetUnitsQuery,
  useGetUsersQuery,
  useGetCompaniesQuery,
  useGetAssetByIdQuery,
  useGetUnitByIdQuery,
  useGetCompanyByIdQuery,
  useGetUserByIdQuery,
} = mainApi;
