import { useEffect, useState, FormEvent } from "react";
import { Column, Row, Select } from "@amsterdam/asc-ui";
import VerschillenBarChart from "./VerschillenBarChart"
import VerschillenMap from "./VerschillenMap"
import HeaderRow from "../components/layout/HeaderRow";

const Verschillen = ({ gwb }) => {
  const [indicatorDefinitieId, setVariabele] = useState<string>('');
  
  const allVars = [
    { key: "LBUURT_R", value: "Buurt: tevredenheid met eigen buurt (1-10)" },
    { key: "ORVERLOED_P", value: "Verloederingscode" },
  ]

  useEffect(() => {
    setVariabele(allVars[0].key);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Select
              id="indicatorDefinitieId"
              value={indicatorDefinitieId}
              onChange={(event: FormEvent<HTMLSelectElement>) => {
                setVariabele(event.currentTarget.value);
              }}
            >
              {allVars.map((stadsDeel) => {
                return (
                  <option key={stadsDeel.key} value={stadsDeel.key}>
                    {stadsDeel.value}
                  </option>
                );
              })}
            </Select>
        </Column>
        <Column span={6}>
          &nbsp;
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <VerschillenMap 
            gwb={gwb}
            indicatorDefinitieId={indicatorDefinitieId}
          />
        </Column>
        <Column span={6}>
          <VerschillenBarChart 
            gwb={gwb}
            indicatorDefinitieId={indicatorDefinitieId}
          />
        </Column>
      </Row>
    </>
  )
};

export default Verschillen;
