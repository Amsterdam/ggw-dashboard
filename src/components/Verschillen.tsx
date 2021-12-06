import { useEffect, useState } from "react";
import { Column, Row } from "@amsterdam/asc-ui";
import VerschillenBarChart from "./VerschillenBarChart"
import VerschillenMap from "./VerschillenMap"
import HeaderRow from "../components/layout/HeaderRow";

const Verschillen = ({ gwb }) => {
  const [variabele, setVariabele] = useState<string>('');

  useEffect(() => {
    setVariabele("ORVERLOED_P");
  }, []);

  return (
    <>
      <Row>
        <Column span={12}>
          <HeaderRow title={`De verschillen in ${gwb?.naam}`} />
        </Column>
      </Row>
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
    </>
  )
};

export default Verschillen;
