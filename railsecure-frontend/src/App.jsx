import React, { useState } from "react";

import Nav from "./components/Nav";
import { Header } from "./components/Common";
import Dashboard from "./components/Dashboard";
import Tickets from "./components/Tickets";
import Tracking from "./components/Tracking";
import Marketplace from "./components/Marketplace";
import GroupTravel from "./components/GroupTravel";
import GenericPage from "./components/GenericPage";

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [dark, setDark] = useState(false);

  const content = {
    Dashboard: <Dashboard setPage={setPage} />,
    "My Tickets": <Tickets />,
    "Live Tracking": <Tracking />,
    Marketplace: <Marketplace />,
    "Group Travel": <GroupTravel />,
  };

  return (
    <div className={dark ? "app dark" : "app"}>
      <Nav page={page} setPage={setPage} />

      <div className="content">
        <Header
          title={page}
          dark={dark}
          setDark={setDark}
        />

        {content[page] || <GenericPage page={page} />}
      </div>
    </div>
  );
}