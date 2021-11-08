import { FormEvent } from "react";
import styled from "styled-components";
import { Select, Row, Column, themeSpacing } from "@amsterdam/asc-ui";

import { THEMAS } from "../services/thema";

const SpacingDiv = styled("div")`
  padding-top: ${themeSpacing(3)};
`;

const ThemaSelector = () => {
  return (
    <Row>
      <Column span={3}>
        <SpacingDiv>
          <Select
            id="thema"
            label="Thema"
            value={""}
            onChange={(event: FormEvent<HTMLSelectElement>) => {
              console.log(event);
            }}
          >
            {THEMAS &&
              THEMAS.map((t, i) => (
                <option key={t} value={i}>
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
