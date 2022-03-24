import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    "x-bingapis-sdk": "true",
	"x-rapidapi-host": process.env.CRYPTO__NEWS_URL,
	"x-rapidapi-key": process.env.CRYPTO_NEWS_API_KEY
}

const createRequest = (url) => ({
    url, headers: cryptoNewsHeaders
  })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery(process.env.CRYPTO_NEWS_URL),
  //fetch data from the endpoints
  endpoints: (builder)=> ({
    getCryptoNews: builder.query({
      query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi;
