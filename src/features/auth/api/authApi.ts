import { baseApi } from "../../../app/baseApi";
import { InstanceAuth } from "../../../common/types";
import { GetAccountSettingsResponse } from "./types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccountSettings: builder.query<GetAccountSettingsResponse, InstanceAuth>(
      {
        query: ({ apiTokenInstance, idInstance }) => ({
          url: `/waInstance${idInstance}/getSettings/${apiTokenInstance}`,
        }),
      }
    ),
  }),
});

export const { useLazyGetAccountSettingsQuery } = authApi;
