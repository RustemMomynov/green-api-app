import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "WhatsAppApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.green-api.com",
  }),
  endpoints: () => ({}),
  tagTypes: [],
});
