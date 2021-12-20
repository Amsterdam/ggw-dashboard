import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Column, Row, themeColor } from "@amsterdam/asc-ui";

import Dashboard from "./components/pages/Dashboard";
import { GWBProvider } from "./components/context/GWBContext";

import { THEMAS } from "./services/thema";
import util from "./services/util";
import ColorDetails from "./components/pages/ColorDetails";

import "./App.scss";
import "leaflet/dist/leaflet.css";
import "./static/leaflet_override.css";

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
                  <Route path="/kleuren-legenda" element={<ColorDetails />} />
                  <Route path="/" element={<Dashboard thema={THEMAS[0]} />}>
                    <Route path="/:thema" element={<Dashboard />} />
                  </Route>
                </Routes>
              </Router>
            </GWBProvider>
          </InnerWrapper>
        </Column>
      </Row>
    </OuterWrapper>
  );
}

export default App;
