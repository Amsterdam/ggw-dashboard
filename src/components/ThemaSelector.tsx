import { useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { Select, Row, Column, themeSpacing } from "@amsterdam/asc-ui";

import { THEMAS, THEMA_URL_MAPPING, URL_THEMA_MAPPING } from "../services/thema";

const SpacingDiv = styled.div`
  padding-top: ${themeSpacing(3)};
`;

const ThemaSelector = () => {
  const { thema: urlThema } = useParams();
  const [thema, setThema] = useState(URL_THEMA_MAPPING[urlThema || ""] || THEMAS[0]);
  const navigate = useNavigate();

  return (
    <Row>
      <Column span={3}>
        <SpacingDiv>
          <Select
            id="thema"
            label="Thema"
            value={thema}
            onChange={(event: FormEvent<HTMLSelectElement>) => {
              const thema = event.currentTarget.value;
              setThema(thema);
              navigate(`/${THEMA_URL_MAPPING[thema]}`);
            }}
          >
            {THEMAS &&
              THEMAS.map((t) => (
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
