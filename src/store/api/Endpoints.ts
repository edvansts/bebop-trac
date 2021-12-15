import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../static/constants";
import { Asset, Unit } from "../../types";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ["assets", "units"],
  keepUnusedDataFor: 120,
  endpoints: (builder) => ({
    getAssets: builder.query<Asset[], void>({
      query: () => `/assets`,
      transformResponse: (response: Asset[]) => response,
      providesTags: ["assets"],
    }),
    getUnits: builder.query<Unit[], void>({
      query: () => `/units`,
      transformResponse: (response: Unit[]) => response,
      providesTags: ["units"],
    }),
  }),
});

export const { useGetAssetsQuery, useGetUnitsQuery } = mainApi;
