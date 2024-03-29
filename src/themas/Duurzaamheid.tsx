import { Column, Row } from "@amsterdam/asc-ui";
import WoningenNaarEnergieStackedBar from "../components/charts/WoningenNaarEnergieStackedBar";

import { useGWBSelection } from "../components/context/GWBContext";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import DuurzaamheidThema from "../components/Icons/DuurzaamheidThema";
import HeaderRow from "../components/layout/HeaderRow";

import ThemeHeader from "../components/ThemeHeader";
import VerticalBarChart from "../components/VerticalBarChart";
import Verschillen from "../components/Verschillen";
import { DUURZAAMHEID } from "../services/themaNames";

import ontwikkelingDuurzaamheid from "../static/links/ontwikkeling_duurzaamheid.json";

const Duurzaamheid = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={DUURZAAMHEID} Icon={DuurzaamheidThema} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${DUURZAAMHEID} in ${gwb?.naam}`} withColorLink={false} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <WoningenNaarEnergieStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <div></div>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <DevelopmentThemeHeader theme={DUURZAAMHEID} location={gwb?.naam} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingDuurzaamheid[0].label}
            config={[ontwikkelingDuurzaamheid[0]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingDuurzaamheid[1].label}
            config={[ontwikkelingDuurzaamheid[1]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingDuurzaamheid[2].label}
            config={[ontwikkelingDuurzaamheid[2]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Verschillen gwb={gwb} config={ontwikkelingDuurzaamheid} />
    </>
  );
};

export default Duurzaamheid;
