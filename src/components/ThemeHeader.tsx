import styled from "styled-components";
import { Column, Row, themeSpacing, themeColor, Heading } from "@amsterdam/asc-ui";
import GWBMap from "../components/GWBMap";

const StyledDiv = styled.div`
  background-color: ${themeColor("tint", "level2")};
  padding-bottom: ${themeSpacing(5)};
  padding-top: ${themeSpacing(2)};
  width: 100%;
  height: 100%;
`;

const CenteredContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ThemeHeader = ({ gwb, themeTitle, Icon, WithExtraInfo = false }) => {
  return (
    <Row>
      <Column span={12}>
        <StyledDiv>
          <Row>
            <Column span={WithExtraInfo ? 4 : 6}>
              <GWBMap gwb={gwb} />
            </Column>
            {WithExtraInfo && (
              <Column span={4}>
                <div>
                  <p>
                    Op <b>Gebied in Beeld</b> vindt u:
                  </p>
                  <ul>
                    <li>kerncijfers</li>
                    <li>over diverse thema’s</li>
                    <li>voor Amsterdam en alle stadsdelen, gebieden, wijken en buurten.</li>
                  </ul>
                </div>
              </Column>
            )}
            <Column span={WithExtraInfo ? 4 : 6}>
              <CenteredContent>
                <Heading as="h2">Thema {themeTitle}</Heading>
                <Icon width="150" height="150" />
              </CenteredContent>
            </Column>
          </Row>
        </StyledDiv>
      </Column>
    </Row>
  );
};

export default ThemeHeader;
