import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

//Redux toolkit simplify redux work.
const cryptoApiHeaders = {
    'x-rapidapi-host': process.env.CRYPTO_URL,
    'x-rapidapi-key': process.env.CRYPTO_API_KEY,
}

const createRequest = (url) => ({
  url, headers: cryptoApiHeaders
})

//note: endpoints is the endpoints of the API 
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery(process.env.CRYPTO_URL),
  //fetch data from the endpoints, Redux Toolkit makes it easier bcuz u only need to add endpoints
  endpoints: (builder)=> ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query({
      query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  })
})

export const {useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery} = cryptoApi;