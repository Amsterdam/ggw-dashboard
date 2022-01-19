import styled from "styled-components";
import { Print } from "@amsterdam/asc-assets";
import { breakpoint, Header, MenuToggle, themeColor, themeSpacing } from "@amsterdam/asc-ui";

import GWBSelector from "../GWBSelector";
import ThemaSelector from "../ThemaSelector";
import { Button } from "../Button";

// Minor tweak to the layout of the MenuToggle Component.
const WideMenu = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;

  & > div {
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

const IconButton = styled(Button)`
  align-items: "center";
  width: 50px;

  &:hover {
    background-color: ${themeColor("tint", "level2")};
  }
`;

const GGWHeader = () => {
  return (
    <CustomHeader
      tall={false}
      title="Gebied in beeld"
      homeLink="/"
      fullWidth
      css={{ zIndex: 20 }}
      navigation={
        <>
          <WideMenu>
            <MenuToggle open>
              <MenuItemWrapper>
                <GWBSelector />
                <ThemaSelector />
              </MenuItemWrapper>
            </MenuToggle>
            <IconButton onClick={() => window?.print()}>
              <Print width={24} height={24} />
            </IconButton>
          </WideMenu>
        </>
      }
    />
  );
};

export default GGWHeader;
