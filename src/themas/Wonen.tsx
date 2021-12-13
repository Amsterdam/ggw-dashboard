import { Column, Row } from "@amsterdam/asc-ui";

import VerticalBarChart from "../components/VerticalBarChart";
import TextStatistic from "../components/TextStatistic";
import ThemeHeader from "../components/ThemeHeader";
import DataTable from "../components/DataTable";
import Verschillen from "../components/Verschillen";

import { WONEN } from "../services/thema";

import wonenkerncijfers from "../static/links/wonenkerncijfers.json";
import wonenaanvullend from "../static/links/wonenaanvullend.json";
import WoningVoorraadStackedBar from "../components/charts/WoningVoorraadStackedBar";
import GrootteWoningenStackedBar from "../components/charts/GrootteWoningenStackedBar";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import WonenThema from "../components/Icons/WonenThema";
import WonenKrappeWoningen from "../components/Icons/WonenKrappeWoningen";
import WonenWoning from "../components/Icons/WonenWoning";
import LineChart from "../components/LineChart";

const Wonen = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={WONEN} Icon={WonenThema} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${WONEN} in ${gwb?.naam}`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <TextStatistic title="Woningen" gwb={gwb} indicatorId="WVOORRBAG" titleLeft={false} Icon={WonenWoning} />
        </Column>
        <Column span={6}>
          <TextStatistic
            title="% krappe woningen"
            gwb={gwb}
            indicatorId="W_KRAP_P"
            titleLeft={false}
            Icon={WonenKrappeWoningen}
          />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <WoningVoorraadStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <GrootteWoningenStackedBar gwb={gwb} />
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <LineChart
            title="Aantal woningen"
            config={[
              { indicatorDefinitieId: "WVOORRBAG" },
              { indicatorDefinitieId: "WKOOP" },
              { indicatorDefinitieId: "WCORHUUR" },
              { indicatorDefinitieId: "WPARTHUUR" },
              { indicatorDefinitieId: "W_PROG" },
            ]}
            gwb={gwb}
          ></LineChart>
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <DevelopmentThemeHeader theme={WONEN} location={gwb?.naam} />
        </Column>
      </Row>
      <Verschillen gwb={gwb} config={wonenkerncijfers} />
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={wonenkerncijfers[0].label}
            config={[wonenkerncijfers[0]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={wonenkerncijfers[1].label}
            config={[wonenkerncijfers[1]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={wonenkerncijfers[2].label}
            config={[wonenkerncijfers[2]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={wonenkerncijfers[3].label}
            config={[wonenkerncijfers[3]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={wonenkerncijfers[4].label}
            config={[wonenkerncijfers[4]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={wonenkerncijfers[5].label}
            config={[wonenkerncijfers[5]]}
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

      <Row>
        <Column span={12}>
          <HeaderRow title={`Aanvullende cijfers`} />
        </Column>

        <Column span={12}>
          <DataTable gwb={gwb} config={wonenaanvullend} />
        </Column>
      </Row>
    </>
  );
};

export default Wonen;
