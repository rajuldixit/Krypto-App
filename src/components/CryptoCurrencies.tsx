import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { millify } from "millify";

import { useGetCryptosQuery } from "../services/CryptoApi";
import Loader from "./Loader";

interface PropTypes {
  simplified?: boolean;
}

const CryptoCurrencies = ({ simplified }: PropTypes) => {
  const count = simplified ? 10 : 100;
  const [searchTerm, setSearchTerm] = useState("");
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);

  const style = !simplified
    ? { padding: "24px", "box-sizing": "border-box" }
    : {};

  useEffect(() => {
    const filteredItems = cryptoList?.data?.coins?.filter((coin: any) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredItems);
  }, [cryptoList, searchTerm]);

  if (isFetching) {
    return <Loader />;
  }
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <input
            placeholder="search"
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container" style={style}>
        {cryptos?.map((currency: any) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            key={currency?.uuid}
            className="crypto-card"
          >
            <Link to={`crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    src={currency.iconUrl}
                    alt="icon-url"
                    className="crypto-image"
                  />
                }
                hoverable
              >
                <p>Price : {millify(currency.price)}</p>
                <p>Market Cap : {millify(currency.marketCap)}</p>
                <p>Daily Change : {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
