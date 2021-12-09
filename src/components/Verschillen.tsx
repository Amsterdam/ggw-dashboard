import { useState, FormEvent } from "react";
import styled from "styled-components";
import { Column, Row, Select, themeSpacing } from "@amsterdam/asc-ui";
import VerschillenBarChart from "./VerschillenBarChart";
import VerschillenMap from "./VerschillenMap";
import HeaderRow from "../components/layout/HeaderRow";

const StyledDiv = styled.div`
  width: 100%;
  margin-bottom: ${themeSpacing(4)};
`;

const Verschillen = ({ gwb, config }) => {
  const [indicatorDefinitieId, setVar] = useState<string>(config[0]?.indicatorDefinitieId);
  const [label, setLabel] = useState<string>(config[0]?.label);

  return (
    <>
      <Row>
        <Column span={12}>
          <HeaderRow title={`Verschillen in ${gwb?.naam}`} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <StyledDiv>
            <Select
              style={{ marginBottom: "10px" }}
              id="indicatorDefinitieId"
              value={indicatorDefinitieId}
              onChange={(event: FormEvent<HTMLSelectElement>) => {
                setVar(event.currentTarget.value);
                setLabel(event.currentTarget.options[event.currentTarget.selectedIndex].label);
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
        <Column span={6}>&nbsp;</Column>
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
            label={label}
          />
        </Column>
      </Row>
    </>
  );
};

export default Verschillen;
