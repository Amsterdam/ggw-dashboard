import { useLayoutEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Button, Column, Row, themeColor, themeSpacing } from "@amsterdam/asc-ui";

import Dashboard from "./components/pages/Dashboard";
import { GWBProvider } from "./components/context/GWBContext";
import ColorDetails from "./components/pages/ColorDetails";
import Modal from "./components/Modal";

import { THEMAS } from "./services/thema";
import util from "./services/util";

import "./App.scss";
import "leaflet/dist/leaflet.css";
import "./static/leaflet_override.css";

const OuterWrapper = styled.div`
  background-color: ${themeColor("tint", "level3")};

  @media print {
    background-color: ${themeColor("tint", "level1")};
  }
`;

const InnerWrapper = styled.div`
  background-color: ${themeColor("tint", "level1")};
`;

const PrintRow = styled(Row)`
  @media print {
    margin: 0;
    padding: 0;
  }
`;

const StyledButton = styled(Button)`
  display: initial;
  margin-top: ${themeSpacing(3)};
`;

function App() {
  const [showModal, setShowModal] = useState(false);
  util.setVegaLocale();

  useLayoutEffect(() => {
    setShowModal(true);
  }, []);

  return (
    <OuterWrapper>
      <PrintRow>
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
      </PrintRow>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <h3>Nieuwe gebiedsindeling</h3>
        <p>
          Amsterdam heeft sinds 24 maart 2022 een nieuwe gebiedsindeling. Over gebieden met gewijzigde grenzen zijn niet
          altijd alle gegevens bekend. Over het nieuwe stadsgebied Weesp worden de eerste cijfers aan het begin van de
          zomer verwacht.
        </p>
        <StyledButton variant="primary" onClick={() => setShowModal(false)}>
          Sluit
        </StyledButton>
      </Modal>
    </OuterWrapper>
  );
}

export default App;
