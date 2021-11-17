import styled from "styled-components";
import { Column, Row, themeSpacing } from "@amsterdam/asc-ui";

import HorizontalBarChart from "../components/HorizontalBarChart";
import StackedHorizontalBarChart from "../components/StackedHorizontalBarChart";
import VerticalBarChart from "../components/VerticalBarChart";
import DataTable from "../components/DataTable";
import SocialeKlasseStackedBar from "../components/charts/SocialeKlasseStackedBar";
import LeeftijdJeugdStackedBar from "../components/charts/LeeftijdJeudStackedBar";
import ThemeHeader from "../components/ThemeHeader";
import Car from "../components/Icons/Car";
import LegendTable from "../components/LegendTable";

import woningVoorraad from "../static/links/woningvoorraad.json";
import sociaalEconomisch from "../static/links/sociaaleconomisch.json";
import migratieAchtergrond from "../static/links/migratieachtergrond.json";
import gemmInkomen from "../static/links/gemm_besteedbaar_inkomen.json";
import vandalismeSlachtoffers from "../static/links/vandalisme_slachtoffers.json";
import wozWaarde from "../static/links/gemm_woz_waarde.json";
import gebiedInHetKortConfig from "../static/links/gebiedinhetkort_tabel.json";

const SpacingDiv = styled.div`
  padding-top: ${themeSpacing(4)};
  padding-bottom: ${themeSpacing(4)};

  width: 100%;
`;

const GebiedInHetKort = ({ gwb }) => {
  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle="Gebied in het kort" Icon={Car} />
      <Row>
        <Column span={12}>
          <h2>Samenstelling woningvoorraad en bevolking van {gwb?.naam}</h2>
        </Column>
      </Row>
      <Row>
        <Column
          wrap
          span={{
            small: 1,
            medium: 2,
            big: 2,
            large: 6,
            xLarge: 6,
          }}
        >
          <HorizontalBarChart
            title="Woningvoorraad"
            icon="wonen_en_leefomgeving.png"
            config={woningVoorraad}
            gwb={gwb}
          ></HorizontalBarChart>
        </Column>
        <Column
          wrap
          span={{
            small: 1,
            medium: 2,
            big: 2,
            large: 6,
            xLarge: 6,
          }}
        >
          <HorizontalBarChart
            title="Sociaal-economisch"
            icon="werk_en_inkomen.png"
            config={sociaalEconomisch}
            gwb={gwb}
          ></HorizontalBarChart>
        </Column>
      </Row>
      <Row>
        <Column
          wrap
          span={{
            small: 1,
            medium: 2,
            big: 2,
            large: 6,
            xLarge: 6,
          }}
        >
          <LeeftijdJeugdStackedBar gwb={gwb} />
        </Column>
        <Column
          wrap
          span={{
            small: 1,
            medium: 2,
            big: 2,
            large: 6,
            xLarge: 6,
          }}
        >
          <HorizontalBarChart
            title="Migratie-achtergrond"
            icon="locaties.png"
            config={migratieAchtergrond}
            gwb={gwb}
          ></HorizontalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <h2>Samenstelling jeugd in {gwb?.naam}</h2>
        </Column>
        <Column span={6}>
          <div></div>
        </Column>
        <Column span={6}>
          <LeeftijdJeugdStackedBar gwb={gwb} />
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <h2>Samenstelling Werk en Inkomen in {gwb?.naam}</h2>
        </Column>
        <Column span={6}>
          <SocialeKlasseStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <StackedHorizontalBarChart
            title="Inkomen naar landelijke 20% groepen"
            config={gemmInkomen}
            gwb={gwb}
          ></StackedHorizontalBarChart>
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <h2>Demo VerticalBarChart in {gwb?.naam}</h2>
        </Column>
        <Column span={6}>
          <VerticalBarChart
            title="Vandalisme en slachtoffers"
            config={vandalismeSlachtoffers}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={6}>
          <VerticalBarChart title="Gemiddelde WOZ-waarde" config={wozWaarde} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <SpacingDiv>
            <DataTable gwb={gwb} config={gebiedInHetKortConfig} />
          </SpacingDiv>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <SpacingDiv>
            <LegendTable gwb={gwb} config={gebiedInHetKortConfig} />
          </SpacingDiv>
        </Column>
      </Row>
    </>
  );
};

export default GebiedInHetKort;
