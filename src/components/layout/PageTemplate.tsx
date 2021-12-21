import styled from "styled-components";

import GGWHeader from "./GGWHeader";
import GGWFooter from "./GGWFooter";

const Page = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: [header] auto [main] 1fr [footer] auto;
`;

const Content = styled.div`
  grid-area: main;
  overflow: auto;
`;

const HeaderArea = styled.div`
  grid-area: header;
`;

const PageTemplate = ({ children }) => {
  return (
    <Page>
      <HeaderArea>
        <GGWHeader />
      </HeaderArea>
      <Content>
        {children}
        <GGWFooter />
      </Content>
    </Page>
  );
};

export default PageTemplate;
