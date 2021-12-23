import styled from "styled-components";
import { Column, Row, themeSpacing } from "@amsterdam/asc-ui";
import { ExternalLink } from "@amsterdam/asc-assets";
import HeaderRow from "./layout/HeaderRow";

const Link = styled.a`
  padding-right: ${themeSpacing(4)};

  > svg {
    padding-right: ${themeSpacing(1)};

    margin-bottom: -${themeSpacing(1)};
  }
`;

const GGWInfoWrapper = styled.div`
  @media print {
    display: none;
  }
`;

const GGWInformation = () => {
  return (
    <GGWInfoWrapper>
      <Row>
        <Column span={12}>
          <HeaderRow title="Meer cijfers en informatie" withColorLink={false} />
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <div>
            <p>
              De website Gebied in Beeld is de digitale bijlage bij de gebiedsanalyses van de gemeente Amsterdam. De
              gebiedsanalyses verschijnen eens in de vier jaar en beschrijven zeer kort de 22 gebieden in de stad op
              basis van statistieken en onderzoekresultaten.
            </p>

            <p>
              Alle cijfers op Gebied in Beeld zijn afkomstig uit het Basisbestand Gebieden Amsterdam (BBGA) van OIS. In
              dit bestand zijn nog meer indicatoren, gebiedsindelingen en jaren opgenomen. Met de volgende applicaties
              maakt u makkelijk zelf een tabel, kaart of grafiek van de gegevens in het BBGA:
            </p>
            <Link
              href="https://public.tableau.com/app/profile/ois.amsterdam/viz/Kerncijfertabel_ggw/Dashtabel"
              target="_blank"
            >
              <ExternalLink width="18" height="18" />
              Tabel maken
            </Link>
            <Link
              href="https://public.tableau.com/app/profile/ois.amsterdam/viz/Kerncijfertijdlijnen_ggw/Dashtijdlijnen"
              target="_blank"
            >
              <ExternalLink width="18" height="18" />
              Grafiek maken
            </Link>
            <Link
              href="https://public.tableau.com/app/profile/ois.amsterdam/viz/Kerncijfersggwkaart/Dashkaart"
              target="_blank"
            >
              <ExternalLink width="18" height="18" />
              Kaart maken
            </Link>
            <Link href="https://onderzoek.amsterdam.nl/dataset/basisbestand-gebieden-amsterdam-bbga" target="_blank">
              <ExternalLink width="18" height="18" />
              Het BBGA downloaden
            </Link>
          </div>
        </Column>
      </Row>
    </GGWInfoWrapper>
  );
};

export default GGWInformation;
