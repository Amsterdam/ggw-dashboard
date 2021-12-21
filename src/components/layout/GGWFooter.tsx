import styled from "styled-components";
import { Footer, FooterTop, Row, Column, FooterSection, themeSpacing } from "@amsterdam/asc-ui";

const StyledFooter = styled(Footer)`
  margin-top: ${themeSpacing(18)};

  @media print {
    display: none;
  }
`;

const GGWFooter = () => {
  return (
    <StyledFooter>
      <FooterTop>
        <Row>
          <Column span={12}>
            <FooterSection title="Colofoon">
              <p>
                Gebied in Beeld is gemaakt door OIS in opdracht van de samenwerkende stadsdelen. Contact:{" "}
                <a href="mailto:algemeen.OIS@amsterdam.nl">algemeen.OIS@amsterdam.nl</a>
              </p>
            </FooterSection>
          </Column>
          <Column span={12}>
            <FooterSection title="Disclaimer">
              <p>
                De inhoud van Gebied in Beeld is met uiterste zorgvuldigheid tot stand gebracht. De inhoud wordt
                regelmatig gecontroleerd en geactualiseerd. OIS kan echter niet aansprakelijk worden gesteld voor de
                juistheid, volledigheid en actualiteit van de website. OIS kan in het bijzonder niet aansprakelijk
                worden gesteld voor eventuele schade of consequenties ontstaan door direct of indirect gebruik van de
                inhoud van de website.
              </p>

              <p>
                Alle informatie op Gebied in Beeld valt onder Copyright © van OIS, tenzij een andere bron is vermeld.
                Het overnemen van gegevens is met de volgende bronvermelding toegestaan: OIS Amsterdam.
              </p>

              <p>
                Wilt u informatie hergebruiken, neem dan even contact op met OIS via{" "}
                <a href="mailto:algemeen.OIS@amsterdam.nl">algemeen.OIS@amsterdam.nl</a>.
              </p>
            </FooterSection>
          </Column>
        </Row>
      </FooterTop>
    </StyledFooter>
  );
};

export default GGWFooter;
