import styled from "styled-components";
import { Alert, Column, Link, Row, themeSpacing } from "@amsterdam/asc-ui";

import DataTable from "../components/DataTable";
import ThemeHeader from "../components/ThemeHeader";
import LegendTable from "../components/LegendTable";
import Pano from "../components/Pano";
import { useGWBSelection } from "../components/context/GWBContext";

import gebiedInHetKortConfig from "../static/links/gebiedinhetkort_tabel.json";
import InwonersNaarLeeftijdStackedBar from "../components/charts/InwonersNaarLeeftijdStackedBar";
import WoningVoorraadStackedBar from "../components/charts/WoningVoorraadStackedBar";
import SociaalEconomischeScoreStackedBar from "../components/charts/SociaalEconomischeScoreStackedBar";
import TextStatistic from "../components/TextStatistic";
import { IN_HET_KORT } from "../services/themaNames";
import HeaderRow from "../components/layout/HeaderRow";
import GebiedInHetKortIcon from "../components/Icons/GebiedInHetKort";
import DuurzaamheidThema from "../components/Icons/DuurzaamheidThema";
import EconomieThema from "../components/Icons/EconomieThema";
import BevolkingGezin from "../components/Icons/BevolkingGezin";

const SpacingDiv = styled.div`
  padding-top: ${themeSpacing(4)};
  padding-bottom: ${themeSpacing(4)};

  width: 100%;
`;

const GebiedInHetKort = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={IN_HET_KORT} Icon={GebiedInHetKortIcon} WithExtraInfo />
      <Row>
        <Column span={12}>
          <Alert level="warning">
            Deze website verdwijnt eind 2023. De kerncijfers zijn vanaf heden ook te vinden op het{" "}
            <Link
              href="https://onderzoek.amsterdam.nl/interactief/dashboard-kerncijfers?tab=gebied&thema=overzicht&gebied=STAD&taal=nl"
              variant="inline"
            >
              dashboard kerncijfers van Onderzoek en Statistiek
            </Link>
            .
          </Alert>
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <HeaderRow title={`Gebied in het kort ${gwb?.naam}`} withColorLink={false} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <Pano gwb={gwb} />
        </Column>
        <Column span={6}>
          <div>
            <TextStatistic title="inwoners" gwb={gwb} indicatorId="BEVTOTAAL" Icon={BevolkingGezin} titleLeft={false} />

            <InwonersNaarLeeftijdStackedBar gwb={gwb} />
          </div>
        </Column>
      </Row>

      <SpacingDiv />

      <Row>
        <Column span={6}>
          <TextStatistic
            title="woningen"
            gwb={gwb}
            indicatorId="WVOORRBAG"
            titleLeft={false}
            Icon={DuurzaamheidThema}
          />
        </Column>
        <Column span={6}>
          <TextStatistic
            title="gemiddeld besteedbaar huishoudinkomen: &euro;"
            gwb={gwb}
            indicatorId="IHHINK_GEM"
            titleLeft
            Icon={EconomieThema}
          />
        </Column>
      </Row>

      <Row>
        <Column span={6}>
          <WoningVoorraadStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <SociaalEconomischeScoreStackedBar gwb={gwb} />
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`De positie van ${gwb?.naam} in Amsterdam`} />
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <SpacingDiv>
            <LegendTable gwb={gwb} config={gebiedInHetKortConfig} />
          </SpacingDiv>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <SpacingDiv>
            <DataTable gwb={gwb} config={gebiedInHetKortConfig} />
          </SpacingDiv>
        </Column>
      </Row>
    </>
  );
};

export default GebiedInHetKort;
