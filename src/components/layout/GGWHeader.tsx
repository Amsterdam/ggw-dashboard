import styled from "styled-components";
import { breakpoint, Header, MenuToggle, themeSpacing } from "@amsterdam/asc-ui";

import GWBSelector from "../GWBSelector";
import ThemaSelector from "../ThemaSelector";

// Minor tweak to the layout of the MenuToggle Component.
const WideMenu = styled.div`
  width: 100%;

  & > div {
    max-width: 100%;
    flex-direction: row-reverse;
    position: static;
  }

  & > div > ul {
    width: 100% !important;
    height: 440px;
    padding-top: ${themeSpacing(6)};

    @media screen and ${breakpoint("min-width", "tabletM")} {
      height: 250px;
    }
  }
`;

const MenuItemWrapper = styled.div`
  width: 100%;
  padding-bottom: ${themeSpacing(5)};
`;

const CustomHeader = styled(Header)`
  postion: relative;

  @media print {
    display: none;
  }
`;

const GGWHeader = () => {
  return (
    <CustomHeader
      tall={false}
      title="Gebied in beeld"
      homeLink=""
      fullWidth
      css={{ zIndex: 20 }}
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
