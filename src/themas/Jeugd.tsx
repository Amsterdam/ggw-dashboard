import { Column, Row } from "@amsterdam/asc-ui";

import ThemeHeader from "../components/ThemeHeader";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import VerticalBarChart from "../components/VerticalBarChart";
import Car from "../components/Icons/Car";

import { JEUGD } from "../services/thema";

import sport from "../static/links/sport.json";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";

const Jeugd = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={JEUGD} Icon={Car} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${JEUGD} in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <div>Aantal cultuurvoorzieningen </div>
        </Column>
        <Column span={6}>
          <div>Aantal sportvoorzieningen</div>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <DevelopmentThemeHeader theme={JEUGD} location={gwb?.naam} />
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
    </>
  );
};

export default Jeugd;
