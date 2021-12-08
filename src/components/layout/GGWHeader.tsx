import styled from "styled-components";
import { Header, MenuToggle, themeSpacing, breakpoint } from "@amsterdam/asc-ui";

import GWBSelector from "../GWBSelector";
import ThemaSelector from "../ThemaSelector";

// Minor tweak to the layout of the MenuToggle Component.
const WideMenu = styled.div`
  width: 100%;

  & > div {
    max-width: 100%;

    @media screen and ${breakpoint("max-width", "laptopM")} {
      position: static;
    }
  }

  & > div > ul {
    width: 100% !important;
    height: 250px;
    padding-top: ${themeSpacing(6)};
  }
`;

const MenuItemWrapper = styled.div`
  width: 100%;
  padding-bottom: ${themeSpacing(5)};
`;

const CustomHeader = styled(Header)`
  postion: relative;
`;

const GGWHeader = () => {
  return (
    <CustomHeader
      tall
      title="Gebied in beeld"
      homeLink=""
      fullWidth
      css={{ zIndex: 1200 }}
      navigation={
        <WideMenu>
          <MenuToggle open>
            <MenuItemWrapper>
              <GWBSelector />
              <ThemaSelector />
            </MenuItemWrapper>
          </MenuToggle>
        </WideMenu>
      }
    />
  );
};

export default GGWHeader;
