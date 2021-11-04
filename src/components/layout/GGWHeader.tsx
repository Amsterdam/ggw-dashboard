import { Header, MenuToggle } from "@amsterdam/asc-ui";

const GGWHeader = () => {
  return (
    <Header
      tall
      title="Gebied in beeld"
      homeLink=""
      fullWidth
      css={{ zIndex: 1200 }}
      navigation={
        <MenuToggle open>
          <p>Test</p>
        </MenuToggle>
      }
    />
  );
};

export default GGWHeader;
