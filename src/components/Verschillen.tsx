import { useState, FormEvent } from "react";
import styled from "styled-components";
import { Column, Row, Select, themeSpacing } from "@amsterdam/asc-ui";
import VerschillenBarChart from "./VerschillenBarChart";
import VerschillenMap from "./VerschillenMap";
import { Gwb, ConfigList } from "../types";
import HeaderRow from "./layout/HeaderRow";

const StyledDiv = styled.div`
  width: 100%;
  margin-bottom: ${themeSpacing(4)};
`;

interface Props {
  gwb: Gwb;
  config: ConfigList;
}

const getGebiedType = (type) => {
  switch (type) {
    case "Buurt":
      return "buurten";
    case "Wijk":
      return "wijken";
    case "Gebied":
      return "gebieden";
    case "Stadsdeel":
      return "stadsdelen";
  }
};

const Verschillen: React.FC<Props> = ({ gwb, config }) => {
  const [indicatorDefinitieId, setVar] = useState<string>(config[0]?.indicatorDefinitieId);
  const [label, setLabel] = useState<string>(config && config[0]?.label);

  return (
    <>
      <Row>
        <Column span={12}>
          <HeaderRow title={`${gwb?.naam} vergeleken met andere ${getGebiedType(gwb?.gebiedType)}`} />
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
          <VerschillenMap gwb={gwb} indicatorDefinitieId={indicatorDefinitieId} />
        </Column>
        <Column span={6}>
          <VerschillenBarChart gwb={gwb} indicatorDefinitieId={indicatorDefinitieId} label={label} />
        </Column>
      </Row>
    </>
  );
};

export default Verschillen;
