import styled from "styled-components";
import { Column, Row, themeSpacing } from "@amsterdam/asc-ui";

import VerticalBarChart from "../components/VerticalBarChart";
import ThemeHeader from "../components/ThemeHeader";
import DataTable from "../components/DataTable";
import Car from "../components/Icons/Car";

import { SOCIALE_KRACHT } from "../services/thema";

import socialekrachtcijfers from "../static/links/socialekracht_kerncijfers.json";
import socialekrachtaanvullend from "../static/links/socialekrachtaanvullend.json";
import KwetsbaarheidsscoreStackedBar from "../components/charts/KwetsbaarheidsscoreStackedBar";
import SociaalEconomischeScoreStackedBar from "../components/charts/SociaalEconomischeScoreStackedBar";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import MostVulnerableCitizens from "../components/tables/MostVulnerableCitizens";
import CitizensWithLowCES from "../components/tables/CitizensWithLowSES";

const Spacer = styled.div`
  padding-top: ${themeSpacing(4)};
  padding-bottom: ${themeSpacing(4)};
`;

const SocialeKracht = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={SOCIALE_KRACHT} Icon={Car} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${SOCIALE_KRACHT} in ${gwb?.naam}`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <KwetsbaarheidsscoreStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <MostVulnerableCitizens gwb={gwb} />
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <Spacer />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <SociaalEconomischeScoreStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <CitizensWithLowCES gwb={gwb} />
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <HeaderRow title={`De ontwikkeling van ${SOCIALE_KRACHT} in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={socialekrachtcijfers[0].label}
            config={[socialekrachtcijfers[0]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={socialekrachtcijfers[1].label}
            config={[socialekrachtcijfers[1]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={socialekrachtcijfers[2].label}
            config={[socialekrachtcijfers[2]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={socialekrachtcijfers[3].label}
            config={[socialekrachtcijfers[3]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={socialekrachtcijfers[4].label}
            config={[socialekrachtcijfers[4]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={socialekrachtcijfers[5].label}
            config={[socialekrachtcijfers[5]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`Aanvullende cijfers`} />
        </Column>

        <Column span={12}>
          <DataTable gwb={gwb} config={socialekrachtaanvullend} />
        </Column>
      </Row>
    </>
  );
};

export default SocialeKracht;
