import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Column, Row, themeColor } from "@amsterdam/asc-ui";

import "./App.scss";
import Dashboard from "./components/layout/Dashboard";
import GGWFooter from "./components/layout/GGWFooter";
import { GWBProvider } from "./components/context/GWBContext";

import { THEMAS } from "./services/thema";
import util from "./services/util";

const OuterWrapper = styled.div`
  background-color: ${themeColor("tint", "level3")};
`;

const InnerWrapper = styled.div`
  background-color: ${themeColor("tint", "level1")};
`;

function App() {
  util.setVegaLocale();

  return (
    <OuterWrapper>
      <Row>
        <Column span={12}>
          <InnerWrapper>
            <GWBProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Dashboard thema={THEMAS[0]} />}>
                    <Route path="/:thema" element={<Dashboard />} />
                  </Route>
                </Routes>
              </Router>
            </GWBProvider>
            <GGWFooter />
          </InnerWrapper>
        </Column>
      </Row>
    </OuterWrapper>
  );
}

export default App;
