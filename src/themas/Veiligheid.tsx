import { Column, Row } from "@amsterdam/asc-ui";

import VerticalBarChart from "../components/VerticalBarChart";
import ThemeHeader from "../components/ThemeHeader";
import Car from "../components/Icons/Car";

import { VEILIGHEID } from "../services/thema";

import veiligheidcijfers from "../static/links/veiligheid_kerncijfers.json";
import overlastcijfers from "../static/links/overlast_kerncijfers.json";

import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";

const Veiligheid = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={VEILIGHEID} Icon={Car} />

      <Row>
        <Column span={12}>
          <HeaderRow title={`De ontwikkeling van veiligheid in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={veiligheidcijfers[0].label}
            config={[veiligheidcijfers[0]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={veiligheidcijfers[1].label}
            config={[veiligheidcijfers[1]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={veiligheidcijfers[2].label}
            config={[veiligheidcijfers[2]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={veiligheidcijfers[3].label}
            config={[veiligheidcijfers[3]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={veiligheidcijfers[4].label}
            config={[veiligheidcijfers[4]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={veiligheidcijfers[5].label}
            config={[veiligheidcijfers[5]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`De ontwikkeling van overlast in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={overlastcijfers[0].label} config={[overlastcijfers[0]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={overlastcijfers[1].label} config={[overlastcijfers[1]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={overlastcijfers[2].label} config={[overlastcijfers[2]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={overlastcijfers[3].label} config={[overlastcijfers[3]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={overlastcijfers[4].label} config={[overlastcijfers[4]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={overlastcijfers[5].label} config={[overlastcijfers[5]]} gwb={gwb}></VerticalBarChart>
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

export default Veiligheid;
