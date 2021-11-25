import { Column, Row } from "@amsterdam/asc-ui";

import { useGWBSelection } from "../components/context/GWBContext";
import Car from "../components/Icons/Car";
import HeaderRow from "../components/layout/HeaderRow";
import KidsOfSchoolAge from "../components/tables/KidsOfSchoolAge";
import NumberOfSchoolesAndStudents from "../components/tables/NumberOfSchoolesAndStudents";
import ThemeHeader from "../components/ThemeHeader";
import { ONDERWIJS } from "../services/thema";

const Onderwijs = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={ONDERWIJS} Icon={Car} />
      {/* <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${ONDERWIJS} in ${gwb?.naam}`} />
        </Column>
      </Row> */}
      <Row>
        <Column span={6}>
          <KidsOfSchoolAge gwb={gwb} />
        </Column>
        <Column span={6}>
          <NumberOfSchoolesAndStudents gwb={gwb} />
        </Column>
      </Row>
    </>
  );
};

export default Onderwijs;
