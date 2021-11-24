import styled from "styled-components";
import { Column, Row, themeSpacing, themeColor } from "@amsterdam/asc-ui";
import GWBMap from "../components/GWBMap";

const StyledDiv = styled.div`
  background-color: ${themeColor("tint", "level2")};
  padding-bottom: ${themeSpacing(5)};
  width: 100%;
  height: 100%;
`;

const CenteredContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
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
              <CenteredContent>
                <h2>{themeTitle}</h2>
                <Icon width="200" height="200" />
              </CenteredContent>
            </Column>
          </Row>
        </StyledDiv>
      </Column>
    </Row>
  );
};

export default ThemeHeader;
