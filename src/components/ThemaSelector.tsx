import { FormEvent } from "react";
import styled from "styled-components";
import { Select, Row, Column, themeSpacing } from "@amsterdam/asc-ui";

import { THEMAS } from "../services/thema";

const SpacingDiv = styled("div")`
  padding-top: ${themeSpacing(3)};
`;

const ThemaSelector = ({ thema, setThema }) => {
  return (
    <Row>
      <Column span={3}>
        <SpacingDiv>
          <Select
            id="thema"
            label="Thema"
            value={thema}
            onChange={(event: FormEvent<HTMLSelectElement>) => {
              setThema(event.currentTarget.value);
            }}
          >
            {THEMAS &&
              THEMAS.map((t, i) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
          </Select>
        </SpacingDiv>
      </Column>
    </Row>
  );
};

export default ThemaSelector;
