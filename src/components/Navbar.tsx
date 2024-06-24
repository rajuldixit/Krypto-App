import { Link } from "react-router-dom";
import { Button, Typography, Avatar, Menu, MenuProps } from "antd";
import {
  HomeOutlined,
  FundOutlined,
  MenuOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import { useState, useEffect } from "react";

import icon from "../assets/images/cryptoimagen.png";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(0);

  const items: MenuProps["items"] = [
    {
      label: <Link to="/">Home</Link>,
      icon: <HomeOutlined />,
      key: "home"
    },
    {
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
      icon: <FundOutlined />,
      key: "cryptocurrencies"
    }
  ];

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size={"large"} />
        <Typography.Title level={2} className="logo">
          <Link to={"/"}>Crypto App</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuFoldOutlined />
        </Button>
      </div>
      {activeMenu && <Menu theme="dark" items={items} />}
    </div>
  );
};

export default Navbar;
