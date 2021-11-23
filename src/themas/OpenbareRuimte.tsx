import { Column, Row } from "@amsterdam/asc-ui";

import VerticalBarChart from "../components/VerticalBarChart";
import TextStatistic from "../components/TextStatistic";
import ThemeHeader from "../components/ThemeHeader";
import DataTable from "../components/DataTable";
import Car from "../components/Icons/Car";

import { OPENBARE_RUIMTE } from "../services/thema";

import openbareruimtecijfers from "../static/links/openbareruimte_kerncijfers.json";
import openbareruimteaanvullend from "../static/links/openbareruimteaanvullend.json";
import BodemgebruikStackedBar from "../components/charts/BodemgebruikStackedBar";
import SamenstellingVerblijversStackedBar from "../components/charts/SamenstellingVerblijversStackedBar";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";

const OpenbareRuimte = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={OPENBARE_RUIMTE} Icon={Car} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${OPENBARE_RUIMTE} in ${gwb?.naam}`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <TextStatistic title="Oppervlakte:" gwb={gwb} indicatorId="OROPP" titleLeft />
        </Column>
        <Column span={6}>
          <TextStatistic title="Verblijversdichtheidsindex:" gwb={gwb} indicatorId="ORVERBLIJF_I" titleLeft />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <BodemgebruikStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <SamenstellingVerblijversStackedBar gwb={gwb} />
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <HeaderRow title={`De ontwikkeling van ${OPENBARE_RUIMTE} in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={openbareruimtecijfers[0].label}
            config={[openbareruimtecijfers[0]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={openbareruimtecijfers[1].label}
            config={[openbareruimtecijfers[1]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={openbareruimtecijfers[2].label}
            config={[openbareruimtecijfers[2]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={openbareruimtecijfers[3].label}
            config={[openbareruimtecijfers[3]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={openbareruimtecijfers[4].label}
            config={[openbareruimtecijfers[4]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={openbareruimtecijfers[5].label}
            config={[openbareruimtecijfers[5]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`${gwb?.naam} vergeleken met andere gebieden`} />
        </Column>

        <Column span={12}>
          <div style={{ width: "100%" }}>
            <p>TODO</p>
          </div>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`Aanvullende cijfers`} />
        </Column>

        <Column span={12}>
          <DataTable gwb={gwb} config={openbareruimteaanvullend} />
        </Column>
      </Row>
    </>
  );
};

export default OpenbareRuimte;
