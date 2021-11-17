import styled from "styled-components";
import { Footer, FooterTop, Row, Column, FooterSection, List, ListItem, Link, themeSpacing } from "@amsterdam/asc-ui";

import meerInformatie from "../../static/links/meer_informatie.json";
import meerCijfers from "../../static/links/meer_cijfers.json";

const SpacerDiv = styled.div`
  margin-top: ${themeSpacing(18)};
`;

const GGWFooter = () => {
  return (
    <SpacerDiv>
      <Footer>
        <FooterTop>
          <Row>
            <Column span={6}>
              <FooterSection title="Meer informatie">
                <List>
                  {meerInformatie.map((link) => (
                    <ListItem key={link.label}>
                      <Link darkBackground href={link.url} inList>
                        {link.label}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </FooterSection>
            </Column>
            <Column span={6}>
              <FooterSection title="Meer cijfers">
                <List>
                  {meerCijfers.map((link) => (
                    <ListItem key={link.label}>
                      <Link darkBackground href={link.url} inList>
                        {link.label}
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </FooterSection>
            </Column>
          </Row>
        </FooterTop>
      </Footer>
    </SpacerDiv>
  );
};

export default GGWFooter;
