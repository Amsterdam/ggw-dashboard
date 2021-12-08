// @ts-ignore
import { useEffect, useState, FormEvent } from "react";
import styled from "styled-components";
import { Column, Row, Select, themeSpacing } from "@amsterdam/asc-ui";
import VerschillenBarChart from "./VerschillenBarChart"
import VerschillenMap from "./VerschillenMap"
import HeaderRow from "../components/layout/HeaderRow";

const StyledDiv = styled.div`
  width: 100%;
  margin-bottom: ${themeSpacing(4)};
`

const Verschillen = ({ gwb, config }) => {
  const [indicatorDefinitieId, setVar] = useState<string>('');
   
  useEffect(() => {
    setVar(config[0].indicatorDefinitieId);

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
          <StyledDiv>
            <Select
              style={{marginBottom: "10px"}}
              id="indicatorDefinitieId"
              value={indicatorDefinitieId}
              onChange={(event: FormEvent<HTMLSelectElement>) => {
                setVar(event.currentTarget.value);
              }}
            >
              {config.map((stadsDeel) => {
                return (
                  <option key={stadsDeel.indicatorDefinitieId} value={stadsDeel.indicatorDefinitieId}>
                    {stadsDeel.label}
                  </option>
                );
              })}
            </Select>
          </StyledDiv>
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
