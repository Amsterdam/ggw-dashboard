import styled from "styled-components";
import { useParams } from "react-router";
import { Column, Row, Spinner, themeSpacing } from "@amsterdam/asc-ui";

import GebiedInHetKort from "../../themas/GebiedInHetKort";
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

  const Thema = THEMAS[URL_THEMA_MAPPING[thema]] || GebiedInHetKort;

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
