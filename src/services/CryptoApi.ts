import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoHeaders = {
  "x-rapidapi-key": "d8e68a1e5emshef349cd27972941p17781djsn0cea6e280d4b",
  "x-rapidapi-host": "coinranking1.p.rapidapi.com"
};

const baseUrl = "https://coinranking1.p.rapidapi.com/";

const createRequest = (url: string) => ({ url, headers: cryptoHeaders });

export const cryptoAPI = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<any, number>({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptosDetails: builder.query<any, string>({
      query: (coinId) => createRequest(`/coin/${coinId}`)
    }),
    getCryptoHistory: builder.query<any, any>({
      query: ({ coinId, timeperiod }) =>
        createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`)
    })
  })
});

export const {
  useGetCryptosQuery,
  useGetCryptosDetailsQuery,
  useGetCryptoHistoryQuery
} = cryptoAPI;
