import styled from "styled-components";
import { Column, Row, Spinner, themeSpacing } from "@amsterdam/asc-ui";
import { useParams } from "react-router";

import Bevolking from "../../themas/Bevolking";
import StedelijkeOntwikkeling from "../../themas/StedelijkeOntwikkeling";
import Verkeer from "../../themas/Verkeer";
import Duurzaamheid from "../../themas/Duurzaamheid";
import Economie from "../../themas/Economie";
import GebiedInHetKort from "../../themas/GebiedInHetKort";
import Onderwijs from "../../themas/Onderwijs";
import Werk from "../../themas/Werk";
import Welzijn from "../../themas/Welzijn";
import SocialeKracht from "../../themas/SocialeKracht";
import Wonen from "../../themas/Wonen";
import OpenbareRuimte from "../../themas/OpenbareRuimte";
import { useGWBSelection } from "../context/GWBContext";
import { THEMAS, URL_THEMA_MAPPING } from "../../services/thema";
import PageTemplate from "./PageTemplate";
import GGWInformation from "../GGWInformation";
import Veiligheid from "../../themas/Veiligheid";

const DashboardDiv = styled.div`
  padding-top: ${themeSpacing(8)};
`;

const ContainerDiv = styled.div`
  margin-top: ${themeSpacing(3)};
  margin-bottom: ${themeSpacing(3)};
  width: 100%;
`;

const themaMapping = {
  [THEMAS[0]]: GebiedInHetKort,
  [THEMAS[1]]: Bevolking,
  [THEMAS[2]]: StedelijkeOntwikkeling,
  [THEMAS[3]]: Verkeer,
  [THEMAS[4]]: Duurzaamheid,
  [THEMAS[5]]: Economie,
  [THEMAS[7]]: Onderwijs,
  [THEMAS[8]]: Werk,
  [THEMAS[9]]: Welzijn,
  [THEMAS[10]]: Wonen,
  [THEMAS[11]]: SocialeKracht,
  [THEMAS[12]]: OpenbareRuimte,
  [THEMAS[13]]: Veiligheid,
};

const Dashboard = ({ thema: propThema = THEMAS[0] }: { thema?: string }) => {
  let { thema } = useParams();
  const gwb = useGWBSelection();

  if (!thema && propThema) {
    thema = propThema;
  }

  if (!thema) {
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
