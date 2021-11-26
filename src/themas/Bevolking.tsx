import { Column, Row } from "@amsterdam/asc-ui";

import { useGWBSelection } from "../components/context/GWBContext";
import LeeftijdssamenstellingStackedBar from "../components/charts/LeeftijdssamenstellingStackedBar";
import Car from "../components/Icons/Car";
import HeaderRow from "../components/layout/HeaderRow";
import LineChart from "../components/LineChart";
import TextStatistic from "../components/TextStatistic";

import ThemeHeader from "../components/ThemeHeader";
import VerticalBarChart from "../components/VerticalBarChart";
import { BEVOLKING } from "../services/thema";

import ontwikkelingBevolking from "../static/links/ontwikkeling_bevolking.json";
import HuishoudensamenstellingStackedBar from "../components/charts/HuishoudensamenstellingStackedBar";
import MigratieachtergrondStackedBar from "../components/charts/MigratieachtergrondStackedBar";
import OpleidingsniveauStackedBar from "../components/charts/OpleidingsniveauStackedBar";

const Bevolking = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={BEVOLKING} Icon={Car} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${BEVOLKING} in ${gwb?.naam}`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <TextStatistic title="inwoners" gwb={gwb} indicatorId="BEVTOTAAL" titleLeft={false} />
        </Column>
        <Column span={6}>
          <TextStatistic title="huishoudens" gwb={gwb} indicatorId="BEVHUISHOUDENHH" titleLeft={false} />
        </Column>
      </Row>

      <Row>
        <Column span={6}>
          <LeeftijdssamenstellingStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <HuishoudensamenstellingStackedBar gwb={gwb} />
        </Column>
      </Row>

      <Row>
        <Column span={6}>
          <MigratieachtergrondStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <OpleidingsniveauStackedBar gwb={gwb} />
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`De ontwikkeling van ${BEVOLKING} in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <LineChart
            title="Bevolkingsprognose naar leeftijd"
            config={[
              {
                indicatorDefinitieId: "BEVTOTAAL",
              },
              {
                indicatorDefinitieId: "BEV0_17",
              },
              {
                indicatorDefinitieId: "BEV18_64",
              },
              {
                indicatorDefinitieId: "BEV65PLUS",
              },
              {
                indicatorDefinitieId: "BEV_PROG",
              },
              {
                indicatorDefinitieId: "BEV0_17_PROG",
              },
              {
                indicatorDefinitieId: "BEV18_64_PROG",
              },
              {
                indicatorDefinitieId: "BEV65PLUS_PROG",
              },
            ]}
            gwb={gwb}
          ></LineChart>
        </Column>
        <Column span={6}>
          <LineChart
            title="Migratieachtergrond"
            config={[
              {
                indicatorDefinitieId: "BEVAUTOCH_P",
              },
              {
                indicatorDefinitieId: "BEVWEST_P",
              },
              {
                indicatorDefinitieId: "BEVNW_P",
              },
            ]}
            gwb={gwb}
          ></LineChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingBevolking[0].label}
            config={[ontwikkelingBevolking[0]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingBevolking[1].label}
            config={[ontwikkelingBevolking[1]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingBevolking[2].label}
            config={[ontwikkelingBevolking[2]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingBevolking[3].label}
            config={[ontwikkelingBevolking[3]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingBevolking[4].label}
            config={[ontwikkelingBevolking[4]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingBevolking[4].label}
            config={[ontwikkelingBevolking[4]]}
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
    </>
  );
};

export default Bevolking;
