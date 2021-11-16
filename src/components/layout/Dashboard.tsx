import styled from "styled-components";
import { Column, Row, themeSpacing } from "@amsterdam/asc-ui";
import GebiedInHetKort from "../../themas/GebiedInHetKort";
import { THEMAS } from "../../services/thema";

import Bevolking from "../../themas/Bevolking";
import StedelijkeOntwikkeling from "../../themas/StedelijkeOntwikkeling";
import Verkeer from "../../themas/Verkeer";
import Duurzaamheid from "../../themas/Duurzaamheid";
import Economie from "../../themas/Economie";
import OpenbareOrde from "../../themas/OpenbareOrde";
import Onderwijs from "../../themas/Onderwijs";
import Werk from "../../themas/Werk";
import Welzijn from "../../themas/Welzijn";
import SocialeKracht from "../../themas/SocialeKracht";

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
  [THEMAS[6]]: OpenbareOrde,
  [THEMAS[7]]: Onderwijs,
  [THEMAS[8]]: Werk,
  [THEMAS[9]]: Welzijn,
  [THEMAS[10]]: SocialeKracht,
};

const Dashboard = ({ gwb, thema }) => {
  const Thema = themaMapping[thema] || GebiedInHetKort;

  return (
    <DashboardDiv>
      <Row>
        <Column span={12}>
          <ContainerDiv>
            <Thema gwb={gwb} />
          </ContainerDiv>
        </Column>
      </Row>
    </DashboardDiv>
  );
};

export default Dashboard;
