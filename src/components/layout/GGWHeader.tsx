import styled from "styled-components";
import { Header, MenuToggle } from "@amsterdam/asc-ui";

import GWBSelector from "../GWBSelector";

// Minor tweak to the layout of the MenuToggle Component.
const WideMenu = styled("div")`
  width: 100%;

  & > div {
    max-width: 100%;
  }

  & > div > ul {
    width: 100% !important;
  }
`;

const GGWHeader = ({ gwb, setGwb }) => {
  return (
    <Header
      tall
      title="Gebied in beeld"
      homeLink=""
      fullWidth
      css={{ zIndex: 1200 }}
      navigation={
        <WideMenu>
          <MenuToggle open>
            <GWBSelector gwb={gwb} setGWB={setGwb} />
          </MenuToggle>
        </WideMenu>
      }
    />
  );
};

export default GGWHeader;
