import { Column, Row } from "@amsterdam/asc-ui";
import { ExternalLink } from "@amsterdam/asc-assets";
import HeaderRow from "./layout/HeaderRow";

const GGWInformation = () => {
  return (
    <>
      <Row>
        <Column span={12}>
          <HeaderRow title="Meer cijfers en informatie" />
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
            <a href="#a">
              <ExternalLink width="18" height="18" />
              Gebiedsanalyses 2017
            </a>

            <p>
              Alle cijfers op Gebied in Beeld zijn afkomstig uit het Basisbestand Gebieden Amsterdam (BBGA) van OIS. In
              dit bestand zijn nog meer indicatoren, gebiedsindelingen en jaren opgenomen. Met de volgende applicaties
              maakt u makkelijk zelf een tabel, kaart of grafiek van de gegevens in het BBGA:
            </p>
            <a href="#a">
              <ExternalLink width="18" height="18" />
              Tabel maken
            </a>
            <a href="#a">
              <ExternalLink width="18" height="18" />
              Grafiek maken
            </a>
            <a href="#a">
              <ExternalLink width="18" height="18" />
              Kaart maken
            </a>
            <a href="#a">
              <ExternalLink width="18" height="18" />
              Het BBGA downloaden
            </a>
          </div>
        </Column>
      </Row>
    </>
  );
};

export default GGWInformation;
