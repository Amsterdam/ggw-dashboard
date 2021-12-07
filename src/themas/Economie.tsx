import { Column, Row } from "@amsterdam/asc-ui";

import VerticalBarChart from "../components/VerticalBarChart";
import TextStatistic from "../components/TextStatistic";
import ThemeHeader from "../components/ThemeHeader";

import { ECONOMIE } from "../services/thema";

import WerkzamePersonenHoofdfunctieStackedBar from "../components/charts/WerkzamePersonenHoofdfunctieStackedBar";
import VestigingenNaarFunctiegroep from "../components/charts/VestigingenNaarFunctiegroepStackedBar";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import LineChart from "../components/LineChart";

import economiecijfers from "../static/links/economie_kerncijfers.json";
import werkzamepersonenOntwikkeling from "../static/links/werkzamepersonen_ontwikkeling.json";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import EconomieThema from "../components/Icons/EconomieThema";
import EconomieVestiging from "../components/Icons/EconomieVestiging";
import EconomieWerkzamepersonen from "../components/Icons/EconomieWerkzamepersonen";
import VestigingenNaarFunctiegroepLineChart from "../components/linecharts/VestigingenNaarFunctiegroepLineChart";

const Economie = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={ECONOMIE} Icon={EconomieThema} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${ECONOMIE} in ${gwb?.naam}`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <TextStatistic
            title="vestigingen"
            gwb={gwb}
            indicatorId="BHVEST"
            titleLeft={false}
            Icon={EconomieVestiging}
          />
        </Column>
        <Column span={6}>
          <TextStatistic
            title="werkzame personen"
            gwb={gwb}
            indicatorId="BHWP"
            titleLeft={false}
            Icon={EconomieWerkzamepersonen}
          />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <VestigingenNaarFunctiegroep gwb={gwb} />
        </Column>
        <Column span={6}>
          <WerkzamePersonenHoofdfunctieStackedBar gwb={gwb} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <VestigingenNaarFunctiegroepLineChart gwb={gwb} />
        </Column>
        <Column span={6}>
          <LineChart
            title="Aantal werkzame personen naar functiegroep"
            config={werkzamepersonenOntwikkeling}
            gwb={gwb}
          ></LineChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <DevelopmentThemeHeader theme={ECONOMIE} location={gwb?.naam} />
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={economiecijfers[0].label} config={[economiecijfers[0]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={economiecijfers[1].label} config={[economiecijfers[1]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={economiecijfers[2].label} config={[economiecijfers[2]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={economiecijfers[3].label} config={[economiecijfers[3]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={economiecijfers[4].label} config={[economiecijfers[4]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={economiecijfers[5].label} config={[economiecijfers[5]]} gwb={gwb}></VerticalBarChart>
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

export default Economie;
