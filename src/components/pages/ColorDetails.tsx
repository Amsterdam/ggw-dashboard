import { Column, Header, Row } from "@amsterdam/asc-ui";
import ColorLegend from "../ColorLegend";

const ColorDetails = () => {
  return (
    <>
      <Header tall title="Gebied in beeld" homeLink="" fullWidth css={{ zIndex: 1200 }} />
      <Row>
        <Column span={12}>
          <ColorLegend />
        </Column>
      </Row>
    </>
  );
};

export default ColorDetails;
