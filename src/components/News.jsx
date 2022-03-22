import React, { useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import Loader from "./Loader";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 10 : 100,
  });
  //console.log(cryptoNews);

  //Main logic: fetching data from Crypto News API from Bings
  // Inside Select component onChange func set the search Term (search Term contained in API news query)
  // query looks like this /news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}
  // useState update that newsCategory
  // then filterOption filter out the options (option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0})

  if (!cryptoNews?.value) return <Loader />;
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder='Select a crypto'
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >

               <Option value="Cryptocurency">Cryptocurrency</Option>
               {/*Note, data below belongs to Crypto API fetching request*/}
               {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
            </Select>
          </Col>
        )}

        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{maxWidth:'200px', maxHeight:'100px'}}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt=""
                  />
                </div>
                <p>
                  {news.description.length > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt=""
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf("ss").fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
