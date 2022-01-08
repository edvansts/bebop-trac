import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../static/constants";
import { Asset, Company, Unit, User } from "../../types";
import { AssetsList } from "../../types/dto";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["assets", "units", "users", "companies"],
  keepUnusedDataFor: 120,
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

        return {
          assets: response,
          inAlert,
          inDowntime,
          inOperation,
          newAssetsThisWeek,
          assetsInativedThisWeek,
        };
      },
      providesTags: ["assets"],
    }),

    /* ---------------------------------- Units --------------------------------- */
    getUnits: builder.query<Unit[], void>({
      query: () => `/units`,
      transformResponse: (response: Unit[]) => response,
      providesTags: ["units"],
    }),

    /* ---------------------------------- Users --------------------------------- */
    getUsers: builder.query<User[], void>({
      query: () => `/users`,
      transformResponse: (response: User[]) => response,
      providesTags: ["users"],
    }),

    /* ---------------------------------- Companies --------------------------------- */
    getCompanies: builder.query<Company[], void>({
      query: () => `/companies`,
      transformResponse: (response: Company[]) => response,
      providesTags: ["companies"],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetUnitsQuery,
  useGetUsersQuery,
  useGetCompaniesQuery,
} = mainApi;
