import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../static/constants";
import { Asset } from "../../types";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getAssets: builder.query<Asset[], void>({
      query: () => `assets`,
    }),
  }),
});

export const { useGetAssetsQuery } = mainApi;
