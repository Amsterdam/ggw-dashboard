import { Column, Row } from "@amsterdam/asc-ui";

import ThemeHeader from "../components/ThemeHeader";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import VerticalBarChart from "../components/VerticalBarChart";

import { JEUGD } from "../services/thema";

import jeugdOntwikkeling from "../static/links/jeugd_ontwikkeling.json";
import jeugdData from "../static/links/jeugd_data.json";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import DataTable from "../components/DataTable";
import LeeftijdssamenstellingBevolkingStackedBar from "../components/charts/LeeftijdssamenstellingBevolkingStackedBar";
import AantalKinderen from "../components/tables/AantalKinderen";
import JeugdThema from "../components/Icons/JeugdThema";
import Verschillen from "../components/Verschillen";

const Jeugd = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={JEUGD} Icon={JeugdThema} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${JEUGD} in ${gwb?.naam}`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <LeeftijdssamenstellingBevolkingStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <AantalKinderen gwb={gwb} />
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

      <Verschillen gwb={gwb} config={jeugdOntwikkeling} />

      <Row>
        <Column span={12}>
          <HeaderRow title={`Aanvullende cijfers`} />
        </Column>

        <Column span={12}>
          <DataTable gwb={gwb} config={jeugdData} />
        </Column>
      </Row>
    </>
  );
};

export default Jeugd;
