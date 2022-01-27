import styled from "styled-components";
import { Column, Heading, Row, themeSpacing } from "@amsterdam/asc-ui";

import ThemeHeader from "../components/ThemeHeader";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import VerticalBarChart from "../components/VerticalBarChart";
import Verschillen from "../components/Verschillen";

import { OUDEREN } from "../services/themaNames";

import ouderen from "../static/links/ouderen.json";
import ouderenAanvullend from "../static/links/ouderen_aanvullend.json";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import LineChart from "../components/LineChart";
import Migratieachtergrond65PlusStackedBar from "../components/charts/Migratieachtergrond65PlusStackedBar";
import LeeftijdsverdelingStackedBar from "../components/charts/LeeftijdsverdelingStackedBar";
import DataTable from "../components/DataTable";
import OuderenThema from "../components/Icons/OuderenThema";
import OuderenWoningen from "../components/tables/OuderenWoningen";

const SpacingDiv = styled.div`
  padding-top: ${themeSpacing(9)};
`;

const Ouderen = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={OUDEREN} Icon={OuderenThema} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${OUDEREN} in ${gwb?.naam}`} withColorLink={false} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <LineChart
            title="Aantal ouderen"
            config={[
              {
                indicatorDefinitieId: "BEV65PLUS",
                prognoseIndicator: "BEV65PLUS_PROG",
              },
              {
                indicatorDefinitieId: "BEV75PLUS",
                prognoseIndicator: "BEV75PLUS_PROG",
              },
            ]}
            gwb={gwb}
            withPrognosis
          ></LineChart>
        </Column>
        <Column span={6}>
          <div>
            <Heading as="h4">Voorraad ouderenwoningen</Heading>
            <OuderenWoningen gwb={gwb} />
          </div>
        </Column>
      </Row>

      <SpacingDiv />

      <Row>
        <Column span={6}>
          <LeeftijdsverdelingStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <Migratieachtergrond65PlusStackedBar gwb={gwb} />
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <DevelopmentThemeHeader theme={OUDEREN} location={gwb?.naam} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart title={ouderen[0].label} config={[ouderen[0]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={ouderen[1].label} config={[ouderen[1]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={ouderen[2].label} config={[ouderen[2]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={ouderen[3].label} config={[ouderen[3]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={ouderen[4].label} config={[ouderen[4]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={ouderen[5].label} config={[ouderen[5]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Verschillen gwb={gwb} config={ouderen} />

      <Row>
        <Column span={12}>
          <HeaderRow title={`Aanvullende cijfers over ${gwb?.naam}`} />
        </Column>

        <Column span={12}>
          <DataTable gwb={gwb} config={ouderenAanvullend} />
        </Column>
      </Row>
    </>
  );
};

export default Ouderen;
