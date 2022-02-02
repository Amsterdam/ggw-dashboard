import { Column, Row } from "@amsterdam/asc-ui";

import ThemeHeader from "../components/ThemeHeader";
import { useGWBSelection } from "../components/context/GWBContext";
import VerticalBarChart from "../components/VerticalBarChart";
import Verschillen from "../components/Verschillen";
import verkeer from "../static/links/verkeer.json";

import { VERKEER } from "../services/themaNames";

import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import VerkeerThema from "../components/Icons/VerkeerThema";

const Verkeer = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={VERKEER} Icon={VerkeerThema} />

      <Row>
        <Column span={12}>
          <DevelopmentThemeHeader theme={VERKEER} location={gwb?.naam} />
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={verkeer[0].label} config={[verkeer[0]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={verkeer[1].label} config={[verkeer[1]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={verkeer[2].label} config={[verkeer[2]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={verkeer[3].label} config={[verkeer[3]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={verkeer[4].label} config={[verkeer[4]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={verkeer[5].label} config={[verkeer[5]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Verschillen gwb={gwb} config={verkeer} />
    </>
  );
};

export default Verkeer;
