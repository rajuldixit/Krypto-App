import { Outlet } from "react-router-dom";
import { Typography } from "antd";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";
import { GlobalError, Navbar } from "./components";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <ErrorBoundary FallbackComponent={GlobalError}>
          <Outlet />
        </ErrorBoundary>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Krypto App <br /> All rights reserved
          </Typography.Title>
        </div>
      </div>
    </div>
  );
}

export default App;
