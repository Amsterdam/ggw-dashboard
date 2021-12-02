import { Column, Row } from "@amsterdam/asc-ui";

import SocialeKlasseStackedBar from "../components/charts/SocialeKlasseStackedBar";
import StackedHorizontalBarChart from "../components/StackedHorizontalBarChart";
import VerticalBarChart from "../components/VerticalBarChart";
import TextStatistic from "../components/TextStatistic";

import { WERK_INKOMEN } from "../services/thema";
import gemmInkomen from "../static/links/gemm_besteedbaar_inkomen.json";
import werkloosheid from "../static/links/werkloosheid.json";
import minimahuishoudens from "../static/links/minimahuishoudens.json";
import gemiddeldBesteedbaarInkomen from "../static/links/gemm_besteedbaarinkomen.json";
import bijstand from "../static/links/bijstand.json";
import geregistreerdeWerkloosheid from "../static/links/geregistreerd_werkloosheid.json";
import vroegErOpAf from "../static/links/vroeg_er_op_af.json";
import ThemeHeader from "../components/ThemeHeader";
import Car from "../components/Icons/Car";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";

const Werk = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={WERK_INKOMEN} Icon={Car} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${WERK_INKOMEN} in ${gwb?.naam}`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <TextStatistic title="Potentiële beroepsbevolking (18-74 jaar):" gwb={gwb} indicatorId="BEVPOTBBV18_74" />
        </Column>
        <Column span={6}>
          <TextStatistic title="Gemiddeld besteedbaar huishoudinkomen: €" gwb={gwb} indicatorId="IHHINK_GEM" />
        </Column>
      </Row>
      <Row>
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
          <DevelopmentThemeHeader theme={WERK_INKOMEN} location={gwb?.naam} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart title={werkloosheid[0].label} config={werkloosheid} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={minimahuishoudens[0].label} config={minimahuishoudens} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gemiddeldBesteedbaarInkomen[0].label}
            config={gemiddeldBesteedbaarInkomen}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={bijstand[0].label} config={bijstand} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={geregistreerdeWerkloosheid[0].label}
            config={geregistreerdeWerkloosheid}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={vroegErOpAf[0].label} config={vroegErOpAf} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`${gwb?.naam} vergeleken met andere gebieden`} />
        </Column>
      </Row>
    </>
  );
};

export default Werk;
