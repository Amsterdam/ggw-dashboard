import styled from "styled-components";
import { Column, Row, themeSpacing, themeColor } from "@amsterdam/asc-ui";
import GWBMap from "../components/GWBMap";

const StyledDiv = styled("div")`
  background-color: ${themeColor("tint", "level2")};
  padding-bottom: ${themeSpacing(5)};
  width: 100%;
  height: 100%;
`;

const ThemeHeader = ({ gwb, themeTitle, Icon }) => {
  return (
    <Row>
      <Column span={12}>
        <StyledDiv>
          <Row>
            <Column span={6}>
              <GWBMap gwb={gwb} />
            </Column>
            <Column span={6}>
              <div>
                <h2>{themeTitle}</h2>
                <Icon />
              </div>
            </Column>
          </Row>
        </StyledDiv>
      </Column>
    </Row>
  );
};

export default ThemeHeader;
