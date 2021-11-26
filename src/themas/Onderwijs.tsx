import { Column, Row } from "@amsterdam/asc-ui";
import BasisschooladviezenStackedBar from "../components/charts/BasisschooladviezenStackedBar";
import StatusBovenleerplichtigenStackedBar from "../components/charts/StatusBovenleerplichtigenStackedBar";

import { useGWBSelection } from "../components/context/GWBContext";
import Car from "../components/Icons/Car";
import HeaderRow from "../components/layout/HeaderRow";
import KidsOfSchoolAge from "../components/tables/KidsOfSchoolAge";
import NumberOfSchoolesAndStudents from "../components/tables/NumberOfSchoolesAndStudents";
import ThemeHeader from "../components/ThemeHeader";
import VerticalBarChart from "../components/VerticalBarChart";
import { ONDERWIJS } from "../services/thema";

import ontwikkelingOnderwijs from "../static/links/ontwikkeling_onderwijs.json";

const Onderwijs = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={ONDERWIJS} Icon={Car} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${ONDERWIJS} in ${gwb?.naam}`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <KidsOfSchoolAge gwb={gwb} />
        </Column>
        <Column span={6}>
          <NumberOfSchoolesAndStudents gwb={gwb} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <BasisschooladviezenStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <StatusBovenleerplichtigenStackedBar gwb={gwb} />
        </Column>
      </Row>

      <Row>
        <Column span={12}>
          <HeaderRow title={`De ontwikkeling van ${ONDERWIJS} in ${gwb?.naam} en Amsterdam`} />
        </Column>
      </Row>
      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingOnderwijs[0].label}
            config={[ontwikkelingOnderwijs[0]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingOnderwijs[1].label}
            config={[ontwikkelingOnderwijs[1]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingOnderwijs[2].label}
            config={[ontwikkelingOnderwijs[2]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingOnderwijs[3].label}
            config={[ontwikkelingOnderwijs[3]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingOnderwijs[4].label}
            config={[ontwikkelingOnderwijs[4]]}
            gwb={gwb}
          ></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart
            title={ontwikkelingOnderwijs[5].label}
            config={[ontwikkelingOnderwijs[5]]}
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

export default Onderwijs;
