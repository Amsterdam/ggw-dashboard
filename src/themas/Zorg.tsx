import { Column, Row } from "@amsterdam/asc-ui";

import ThemeHeader from "../components/ThemeHeader";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import VerticalBarChart from "../components/VerticalBarChart";
import Gezondheid from "../components/Icons/GezondheidThema";
import Verschillen from "../components/Verschillen";
import { GEZONDHEID_ZORG } from "../services/thema";

import gezondheidCijfers from "../static/links/gezondheid_zorg.json";

const Zorg = () => {
  const gwb = useGWBSelection();
  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={GEZONDHEID_ZORG} Icon={Gezondheid} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Gezondheid en welzijn in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>
      <Verschillen gwb={gwb} config={gezondheidCijfers} />
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[0].label}
            config={[gezondheidCijfers[0]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[1].label}
            config={[gezondheidCijfers[1]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[2].label}
            config={[gezondheidCijfers[2]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[3].label}
            config={[gezondheidCijfers[3]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[4].label}
            config={[gezondheidCijfers[4]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[5].label}
            config={[gezondheidCijfers[5]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`Leefstijl in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[6].label}
            config={[gezondheidCijfers[6]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[7].label}
            config={[gezondheidCijfers[7]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[8].label}
            config={[gezondheidCijfers[8]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`Zorg in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[9].label}
            config={[gezondheidCijfers[9]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[10].label}
            config={[gezondheidCijfers[10]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[11].label}
            config={[gezondheidCijfers[11]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[12].label}
            config={[gezondheidCijfers[12]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[13].label}
            config={[gezondheidCijfers[13]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={gezondheidCijfers[14].label}
            config={[gezondheidCijfers[14]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>
    </>
  );
};

export default Zorg;
