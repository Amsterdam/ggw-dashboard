import { Column, Row } from "@amsterdam/asc-ui";

import SocialeKlasseStackedBar from "../components/charts/SocialeKlasseStackedBar";
import StackedHorizontalBarChart from "../components/StackedHorizontalBarChart";
import VerticalBarChart from "../components/VerticalBarChart";
import { WERK_INKOMEN_EN_PARTICIPATIE } from "../services/thema";
import gemmInkomen from "../static/links/gemm_besteedbaar_inkomen.json";
import werkloosheid from "../static/links/werkloosheid.json";
import minimahuishoudens from "../static/links/minimahuishoudens.json";
import gemiddeldBesteedbaarInkomen from "../static/links/gemm_besteedbaarinkomen.json";
import bijstand from "../static/links/bijstand.json";
import geregistreerdeWerkloosheid from "../static/links/geregistreerd_werkloosheid.json";
import vroegErOpAf from "../static/links/vroeg_er_op_af.json";

const Werk = ({ gwb }) => {
  return (
    <>
      <Row>
        <Column span={12}>
          <h2>
            Samenstelling {WERK_INKOMEN_EN_PARTICIPATIE} in {gwb?.naam}
          </h2>
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
          <h2>
            De ontwikkeling van {WERK_INKOMEN_EN_PARTICIPATIE} in {gwb?.naam} en
            Amsterdam
          </h2>
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={werkloosheid[0].label}
            config={werkloosheid}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={minimahuishoudens[0].label}
            config={minimahuishoudens}
            gwb={gwb}
          ></VerticalBarChart>
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
          <VerticalBarChart
            title={bijstand[0].label}
            config={bijstand}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={geregistreerdeWerkloosheid[0].label}
            config={geregistreerdeWerkloosheid}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={vroegErOpAf[0].label}
            config={vroegErOpAf}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <h2>{gwb?.naam} vergeleken met andere gebieden</h2>
        </Column>
      </Row>
    </>
  );
};

export default Werk;
