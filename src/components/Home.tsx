import { Col, Row, Statistic, Typography } from "antd";
import { useEffect, useLayoutEffect } from "react";
import { useGetCryptosQuery } from "../services/CryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

import { CryptoCurrencies } from "./index";
import Loader from "./Loader";

const Home = () => {
  const { data, isFetching, isLoading, isError, isSuccess } =
    useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  useEffect(() => {
    gsap.to("#title", {
      delay: 1.5,
      opacity: 1,
      marginTop: "-5px"
    });

    gsap.to("#head-row", {
      delay: 1.5,
      opacity: 1,
      marginTop: "-5px"
    });
  }, [isSuccess]);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <>
      <div style={{ padding: "24px", boxSizing: "border-box" }}>
        <Typography.Title
          level={2}
          id="title"
          style={{
            opacity: 0
          }}
        >
          Global Crypto Stats
        </Typography.Title>
        <Row id="head-row">
          <Col span={12}>
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats?.total}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Exchanges"
              value={millify(globalStats?.totalExchanges)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Market Cap"
              value={millify(globalStats?.totalMarketCap)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total 24th Volume"
              value={millify(globalStats?.total24hVolume)}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Total Markets"
              value={millify(globalStats?.totalMarkets)}
            />
          </Col>
        </Row>
        <div className="home-heading-container">
          <Typography.Title className="home-title" level={4}>
            Top 10 Cryptocurrencies in the world
          </Typography.Title>
          <Typography.Title className="show-more" level={5}>
            <Link to="/cryptocurrencies">show more</Link>
          </Typography.Title>
        </div>
        <CryptoCurrencies simplified />
      </div>
    </>
  );
};

export default Home;
