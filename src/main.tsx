import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Afk from "./Afk.tsx";
import Text from "./Components/Text.tsx";
import Da from "./Da.tsx";
import Dnd from "./Dnd.tsx";
import Essen from "./Essen.tsx";
import Rauchen from "./Rauchen.tsx";
import Tel from "./Tel.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container">
        <div style={{ display: "flex" }}>
          <Text text="Johannes" />
          <Text text="Status:" />
        </div>

        <Routes>
          <Route path="/" element={<Da />} />
          <Route path="/Da" element={<Da />} />
          <Route path="/AFK" element={<Afk />} />
          <Route path="/DND" element={<Dnd />} />
          <Route path="/Tel" element={<Tel />} />
          <Route path="/Mittag" element={<Essen />} />
          <Route path="/Rauchen" element={<Rauchen />} />
        </Routes>
      </div>
      <div className="scanlines"></div>
    </BrowserRouter>
  </React.StrictMode>
);
