import { useState } from "react";
import { Column, Row } from "@amsterdam/asc-ui";
import VerschillenBarChart from "./VerschillenBarChart"
import VerschillenMap from "./VerschillenMap"


const Verschillen = ({ gwb }) => {
  const [variabele, setVariabele] = useState('');
  setVariabele("ORVERLOED_P");

  // useEffect(() => {
  //   if (!gwb) {
  //     return;
  //   }

  //   // updateData();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [gwb]);

  // useEffect(() => {
  //   if (!gwb) {
  //     return;
  //   }

  //   // updateData();

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Row>
      <Column span={6}>
        <VerschillenMap 
          gwb={gwb}
          variabele={variabele}
        />
      </Column>
      <Column span={6}>
          <VerschillenBarChart 
            gwb={gwb}
            variabele={variabele}
          />
      </Column>
    </Row>
  )
};

export default Verschillen;
