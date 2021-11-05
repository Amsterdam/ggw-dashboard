import styled from "styled-components";
import { Column, Row, themeColor, themeSpacing } from "@amsterdam/asc-ui";
import GebiedInHetKort from "../../themas/GebiedInHetKort";
import GWBMap from "../GWBMap";
import ColorLegend from "../ColorLegend";
import ThemaSelector from "../ThemaSelector";

const StyledDiv = styled("div")`
  background-color: ${themeColor("tint", "level2")};
  margin-top: ${themeSpacing(3)};
  width: 100%;
  height: 100%;
`;

const DashboardDiv = styled("div")`
  padding-top: ${themeSpacing(8)};
`;

const Dashboard = ({ gwb }) => {
  return (
    <DashboardDiv>
      <Row>
        <Column span={4}>
          {/* <GWBSelector gwb={gwb} setGWB={setGWB} /> */}
        </Column>
        <Column span={4}>
          <GWBMap gwb={gwb} />
        </Column>
        <Column span={4}>
          <ThemaSelector />
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <StyledDiv>
            <Row>
              <Column span={6}>
                <GWBMap gwb={gwb} />
              </Column>
              <Column span={6}>
                <ColorLegend />
              </Column>
            </Row>
          </StyledDiv>
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <GebiedInHetKort gwb={gwb} />
        </Column>
      </Row>
    </DashboardDiv>
  );
};

export default Dashboard;
