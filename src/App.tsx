import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { Column, Row, themeColor } from "@amsterdam/asc-ui";

import "./App.scss";
import Dashboard from "./components/layout/Dashboard";
import GGWFooter from "./components/layout/GGWFooter";
import GGWHeader from "./components/layout/GGWHeader";

const OuterWrapper = styled("div")`
  background-color: ${themeColor("tint", "level3")};
`;

const InnerWrapper = styled("div")`
  background-color: ${themeColor("tint", "level1")};
`;

function App() {
  const [gwb, setGWB] = React.useState(null);

  return (
    <OuterWrapper>
      <Row>
        <Column span={12}>
          <InnerWrapper>
            <GGWHeader gwb={gwb} setGwb={setGWB} />
            <Router>
              <Switch>
                <Route path="/">
                  <Dashboard gwb={gwb} />
                </Route>
              </Switch>
            </Router>
            <GGWFooter />
          </InnerWrapper>
        </Column>
      </Row>
    </OuterWrapper>
  );
}

export default App;
