import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

//Redux toolkit simplify redux work.
const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': '72fd21d9bdmsh94dd23e44548b09p1e33e4jsneea1f179badc'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({
  url, headers: cryptoApiHeaders
})

//note: endpoints is the endpoints of the API 
export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl} ),
  //fetch data from the endpoints
  endpoints: (builder)=> ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    })
  })
})

export const {useGetCryptosQuery, useGetCryptoDetailsQuery} = cryptoApi;