import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoNewsHeaders = {
    "x-bingapis-sdk": "true",
	"x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
	"x-rapidapi-key": "72fd21d9bdmsh94dd23e44548b09p1e33e4jsneea1f179badc"
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({
    url, headers: cryptoNewsHeaders
  })

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({baseUrl} ),
  //fetch data from the endpoints
  endpoints: (builder)=> ({
    getCryptosNews: builder.query({
      query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })
})

export const {useGetCryptoNewsQuery} = cryptoNewsApi;
