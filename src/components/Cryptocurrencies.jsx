import React, { useEffect, useState } from 'react';
import millify from 'millify'; //convert big number to easy to read number 
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  
  const {data:cryptosList, isFetching} = useGetCryptosQuery();
  const [cryptos, setCryptos] = useState(cryptosList?.data.coins)
  console.log(cryptos)

  if (isFetching) return <Loader />;
  return (
    <>
      <Row gutter={[32,32]} className='crypto-card-container'>
        {/*cryptos become list of currencies then use map to roll over the objects and get info we want*/}
        {cryptos.map((currency)=>(
          <Col xs={24}
               sm={12}
               lg={6}
               className="crypto-card"
               key={currency.uuid}>

            <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
              {/*Antd design*/}
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change}%</p>
              </Card>
            </Link>

          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies