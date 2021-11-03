import styled from "styled-components";
import {
  Footer,
  FooterTop,
  Row,
  Column,
  FooterSection,
  List,
  ListItem,
  Link,
  Paragraph,
  themeSpacing,
} from "@amsterdam/asc-ui";

import meerInformatie from "../../static/links/meer_informatie.json";
import meerCijfers from "../../static/links/meer_cijfers.json";

const SpacerDiv = styled("div")`
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
            <Column span={12}>
              <div>
                <FooterSection title="Colofon?">
                  <p>
                    Gebied in Beeld is gemaakt door OIS in opdracht van de
                    samenwerkende stadsdelen.
                    <br />
                    Contact:{" "}
                    <a href="mailto:algemeen.OIS@amsterdam.nl">
                      algemeen.OIS@amsterdam.nl
                    </a>
                  </p>
                </FooterSection>

                <FooterSection title="Disclaimer">
                  <p>
                    De inhoud van Gebied in Beeld is met uiterste zorgvuldigheid
                    tot stand gebracht. De inhoud wordt regelmatig gecontroleerd
                    en geactualiseerd. OIS kan echter niet aansprakelijk worden
                    gesteld voor de juistheid, volledigheid en actualiteit van
                    de website. OIS kan in het bijzonder niet aansprakelijk
                    worden gesteld voor eventuele schade of consequenties
                    ontstaan door direct of indirect gebruik van de inhoud van
                    de website.
                  </p>
                  <p>
                    Alle informatie op Gebied in Beeld valt onder Copyright
                    &copy; van OIS, tenzij een andere bron is vermeld.
                    <br />
                    Het overnemen van gegevens is met de volgende bronvermelding
                    toegestaan: <b>OIS Amsterdam</b>.
                  </p>
                  <p>
                    Wilt u informatie hergebruiken, neem dan even contact op met
                    OIS via{" "}
                    <a href="mailto:algemeen.OIS@amsterdam.nl">
                      algemeen.OIS@amsterdam.nl
                    </a>
                    .
                  </p>
                </FooterSection>
              </div>
            </Column>
          </Row>
        </FooterTop>
      </Footer>
    </SpacerDiv>
  );
};

export default GGWFooter;
