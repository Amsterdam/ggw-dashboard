import { Column, Row } from "@amsterdam/asc-ui";

import ThemeHeader from "../components/ThemeHeader";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import VerticalBarChart from "../components/VerticalBarChart";
import Verschillen from "../components/Verschillen";

import { SPORT_EN_CULTUUR } from "../services/thema";

import sport from "../static/links/sport.json";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import AantalCultuurvoorzieningen from "../components/tables/AantalCultuurvoorzieningen";
import AantalSportvoorzieningen from "../components/tables/AantalSportvoorzieningen";
import SportThema from "../components/Icons/SportThema";

const Sport = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={SPORT_EN_CULTUUR} Icon={SportThema} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${SPORT_EN_CULTUUR} in ${gwb?.naam}`} withColorLink={false} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <AantalCultuurvoorzieningen gwb={gwb} />
        </Column>
        <Column span={6}>
          <AantalSportvoorzieningen gwb={gwb} />
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <DevelopmentThemeHeader theme={SPORT_EN_CULTUUR} location={gwb?.naam} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart title={sport[0].label} config={[sport[0]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={sport[1].label} config={[sport[1]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={sport[2].label} config={[sport[2]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={sport[3].label} config={[sport[3]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={sport[4].label} config={[sport[4]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={sport[5].label} config={[sport[5]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Verschillen gwb={gwb} config={sport} />
    </>
  );
};

export default Sport;
