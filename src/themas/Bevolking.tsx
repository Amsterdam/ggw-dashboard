import { Column, Row } from "@amsterdam/asc-ui";

import { useGWBSelection } from "../components/context/GWBContext";
import LeeftijdssamenstellingStackedBar from "../components/charts/LeeftijdssamenstellingStackedBar";
import HeaderRow from "../components/layout/HeaderRow";
import LineChart from "../components/LineChart";
import TextStatistic from "../components/TextStatistic";

import ThemeHeader from "../components/ThemeHeader";
import VerticalBarChart from "../components/VerticalBarChart";
import Verschillen from "../components/Verschillen";
import { BEVOLKING } from "../services/themaNames";

import ontwikkelingBevolking from "../static/links/ontwikkeling_bevolking.json";
import migratieachtergrond from "../static/links/migratieachtergrond.json";
import HuishoudensamenstellingStackedBar from "../components/charts/HuishoudensamenstellingStackedBar";
import MigratieachtergrondStackedBar from "../components/charts/MigratieachtergrondStackedBar";
import OpleidingsniveauStackedBar from "../components/charts/OpleidingsniveauStackedBar";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import BevolkingThema from "../components/Icons/BevolkingThema";
import BevolkingAdam from "../components/Icons/BevolkingAdam";
import BevolkingGezin from "../components/Icons/BevolkingGezin";
import BevolkingsPrognoseNaarLeeftijdLineChart from "../components/linecharts/BevolkingsPrognoseNaarLeeftijdLineChart";

const Bevolking = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={BEVOLKING} Icon={BevolkingThema} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${BEVOLKING} in ${gwb?.naam}`} withColorLink={false} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <TextStatistic title="inwoners" gwb={gwb} indicatorId="BEVTOTAAL" titleLeft={false} Icon={BevolkingAdam} />
        </Column>
        <Column span={6}>
          <TextStatistic
            title="huishoudens"
            gwb={gwb}
            indicatorId="BEVHUISHOUDENHH"
            titleLeft={false}
            Icon={BevolkingGezin}
          />
        </Column>
      </Row>

      <Row>
        <Column span={6}>
          <OpleidingsniveauStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <HuishoudensamenstellingStackedBar gwb={gwb} />
        </Column>
      </Row>

      <Row>
        <Column span={6}>
          <LeeftijdssamenstellingStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <MigratieachtergrondStackedBar gwb={gwb} />
        </Column>
      </Row>

      <Row>
        <Column span={6}>
          <BevolkingsPrognoseNaarLeeftijdLineChart gwb={gwb} />
        </Column>
        <Column span={6}>
          <LineChart title="Migratieachtergrond" config={migratieachtergrond} gwb={gwb}></LineChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <DevelopmentThemeHeader theme={BEVOLKING} location={gwb?.naam} />
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
            title={ontwikkelingBevolking[5].label}
            config={[ontwikkelingBevolking[5]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Verschillen gwb={gwb} config={ontwikkelingBevolking} />
    </>
  );
};

export default Bevolking;
