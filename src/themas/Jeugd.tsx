import { Column, Row } from "@amsterdam/asc-ui";

import ThemeHeader from "../components/ThemeHeader";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import VerticalBarChart from "../components/VerticalBarChart";
import Car from "../components/Icons/Car";

import { JEUGD } from "../services/thema";

import jeugdOntwikkeling from "../static/links/jeugd_ontwikkeling.json";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import DataTable from "../components/DataTable";

const Jeugd = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={JEUGD} Icon={Car} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${JEUGD} in ${gwb?.naam}`} />
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
          <VerticalBarChart
            title={jeugdOntwikkeling[0].label}
            config={[jeugdOntwikkeling[0]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={jeugdOntwikkeling[1].label}
            config={[jeugdOntwikkeling[1]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={jeugdOntwikkeling[2].label}
            config={[jeugdOntwikkeling[2]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={jeugdOntwikkeling[3].label}
            config={[jeugdOntwikkeling[3]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={jeugdOntwikkeling[4].label}
            config={[jeugdOntwikkeling[4]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={jeugdOntwikkeling[5].label}
            config={[jeugdOntwikkeling[5]]}
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
          <DataTable gwb={gwb} config={{}} />
        </Column>
      </Row>
    </>
  );
};

export default Jeugd;
