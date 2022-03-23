import React from 'react'
import millify from 'millify'; //Converts long numbers into pretty, human-readable strings.
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies';
import News from './News';
import Loader from './Loader';
import { useGetCryptosQuery } from '../services/cryptoApi';

const {Title} = Typography

const Homepage = () => {
  const {data, isFetching} = useGetCryptosQuery(10);
  const globalStats = data?.data.stats;
  console.log(data)
  //console.log(globalStats)

  if (isFetching) return <Loader />;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}><Statistic title="Total Coins" value={globalStats.totalCoins}/></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={globalStats.totalExchanges}/></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
        <Col span={12}><Statistic title="Total Market" value={globalStats.totalMarkets}/></Col>
      </Row>
      {/* display button to crypto detail component */}
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the World</Title>
        <Title level={3} className='show-more'>
          <Link to="/cryptocurrencies">Show more</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified/>
      {/* display button to news component */}
      <div className='home-heading-container'>
        <Title level={2} className='home-title'>Latest Crypto News</Title><Title level={3} className='show-more'>
          <Link to="/news">Show more</Link>
        </Title>
      </div>
      <News simplified/>
    </>
  )
}

export default Homepage