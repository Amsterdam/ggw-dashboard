import styled from "styled-components";
import { Column, Row, Spinner, themeSpacing } from "@amsterdam/asc-ui";
import { useParams } from "react-router";

import Bevolking from "../../themas/Bevolking";
import Verkeer from "../../themas/Verkeer";
import Duurzaamheid from "../../themas/Duurzaamheid";
import Economie from "../../themas/Economie";
import GebiedInHetKort from "../../themas/GebiedInHetKort";
import Onderwijs from "../../themas/Onderwijs";
import Werk from "../../themas/Werk";
import Sport from "../../themas/Sport";
import SocialeKracht from "../../themas/SocialeKracht";
import Wonen from "../../themas/Wonen";
import OpenbareRuimte from "../../themas/OpenbareRuimte";
import Jeugd from "../../themas/Jeugd";
import Ouderen from "../../themas/Ouderen";
import Veiligheid from "../../themas/Veiligheid";
import Zorg from "../../themas/Zorg";
import PageTemplate from "../layout/PageTemplate";
import GGWInformation from "../GGWInformation";
import { useGWBSelection } from "../context/GWBContext";
import { THEMAS, URL_THEMA_MAPPING } from "../../services/thema";

const DashboardDiv = styled.div`
  padding-top: ${themeSpacing(4)};
`;

const ContainerDiv = styled.div`
  margin-top: ${themeSpacing(3)};
  margin-bottom: ${themeSpacing(3)};
  width: 100%;
`;

const themaMapping = {
  [THEMAS[0]]: GebiedInHetKort,
  [THEMAS[1]]: Bevolking,
  [THEMAS[2]]: Duurzaamheid,
  [THEMAS[3]]: Economie,
  [THEMAS[4]]: Zorg,
  [THEMAS[5]]: Jeugd,
  [THEMAS[6]]: Onderwijs,
  [THEMAS[7]]: OpenbareRuimte,
  [THEMAS[8]]: Ouderen,
  [THEMAS[9]]: SocialeKracht,
  [THEMAS[10]]: Sport,
  [THEMAS[11]]: Veiligheid,
  [THEMAS[12]]: Verkeer,
  [THEMAS[13]]: Werk,
  [THEMAS[14]]: Wonen,
};

const Dashboard = ({ thema: propThema = THEMAS[0] }: { thema?: string }) => {
  let { thema } = useParams();
  const gwb = useGWBSelection();

  if (!thema && propThema) {
    thema = propThema;
  }

  if (!thema) {
    // eslint-disable-next-line no-console
    console.error("No theme found");
    return null;
  }

  const Thema = themaMapping[URL_THEMA_MAPPING[thema]] || GebiedInHetKort;

  return (
    <PageTemplate>
      <DashboardDiv>
        <ContainerDiv>
          {gwb ? (
            <>
              <Thema />
              <GGWInformation />
            </>
          ) : (
            <Row>
              <Column span={12}>
                <Spinner />
              </Column>
            </Row>
          )}
        </ContainerDiv>
      </DashboardDiv>
    </PageTemplate>
  );
};

export default Dashboard;
