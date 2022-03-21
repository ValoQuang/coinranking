import React, { useEffect, useState } from 'react';
import millify from 'millify'; //convert big number to easy to read number 
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10: 100;
  const {data:cryptosList, isFetching} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    setCryptos(cryptosList?.data?.coins)
    const filteredData = cryptosList?.data?.coins.filter((item)=> item.name.toLowerCase().includes(searchTerm))
    setCryptos(filteredData)
  },[cryptosList,searchTerm])

  //console.log(cryptosList)

  if (isFetching) return <Loader />;
  return (
    <>
      {/*if not simplified(the prop in Cryptocurrencies in the homepage components), then hide it, show it in cryptocurrencies component only*/}
      {!simplified && (
        <div className='search-crypto'>
           <Input placeholder='Search cryptos' onChange={(e)=> setSearchTerm(e.target.value)}/>
        </div>
      )}
     
      <Row gutter={[32,32]} className='crypto-card-container'>
        {cryptos?.map((currency)=>(
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