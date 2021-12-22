import { Column, Row } from "@amsterdam/asc-ui";

import SocialeKlasseStackedBar from "../components/charts/SocialeKlasseStackedBar";
import VerticalBarChart from "../components/VerticalBarChart";
import TextStatistic from "../components/TextStatistic";
import Verschillen from "../components/Verschillen";

import { WERK_INKOMEN } from "../services/thema";

import werkEnInkomen from "../static/links/werk_en_inkomen.json";
import ThemeHeader from "../components/ThemeHeader";
import HeaderRow from "../components/layout/HeaderRow";
import { useGWBSelection } from "../components/context/GWBContext";
import DevelopmentThemeHeader from "../components/DevelopmentThemeHeader";
import InkomenNaarLandelijkStackedBar from "../components/charts/InkomenNaarLandelijkStackedBar";
import WerkEnInkomenThema from "../components/Icons/WerkEnInkomenThema";
import WerkEnInkomen from "../components/Icons/WerkEnInkomen";
import Inkomen from "../components/Icons/Inkomen";

const Werk = () => {
  const gwb = useGWBSelection();

  return (
    <>
      <ThemeHeader gwb={gwb} themeTitle={WERK_INKOMEN} Icon={WerkEnInkomenThema} />
      <Row>
        <Column span={12}>
          <HeaderRow title={`Samenstelling ${WERK_INKOMEN} in ${gwb?.naam}`} withColorLink={false} />
        </Column>
      </Row>
      <Row>
        <Column span={6}>
          <TextStatistic
            title="Potentiële beroepsbevolking (18-74 jaar):"
            gwb={gwb}
            indicatorId="BEVPOTBBV18_74"
            Icon={WerkEnInkomen}
          />
        </Column>
        <Column span={6}>
          <TextStatistic
            title="Gemiddeld besteedbaar huishoudinkomen: €"
            gwb={gwb}
            indicatorId="IHHINK_GEM"
            Icon={Inkomen}
          />
        </Column>
      </Row>

      <Row>
        <Column span={6}>
          <SocialeKlasseStackedBar gwb={gwb} />
        </Column>
        <Column span={6}>
          <InkomenNaarLandelijkStackedBar gwb={gwb}></InkomenNaarLandelijkStackedBar>
        </Column>
      </Row>
      <Row>
        <Column span={12}>
          <DevelopmentThemeHeader theme={WERK_INKOMEN} location={gwb?.naam} />
        </Column>
      </Row>
      <Row>
        <Column
          span={{
            small: 1,
            medium: 1,
            big: 3,
            large: 6,
            xLarge: 4,
          }}
        >
          <VerticalBarChart title={werkEnInkomen[0].label} config={[werkEnInkomen[0]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column
          span={{
            small: 1,
            medium: 1,
            big: 3,
            large: 6,
            xLarge: 4,
          }}
        >
          <VerticalBarChart title={werkEnInkomen[1].label} config={[werkEnInkomen[1]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column
          span={{
            small: 1,
            medium: 6,
            big: 3,
            large: 6,
            xLarge: 4,
          }}
        >
          <VerticalBarChart title={werkEnInkomen[2].label} config={[werkEnInkomen[2]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Row>
        <Column span={4}>
          <VerticalBarChart title={werkEnInkomen[3].label} config={[werkEnInkomen[3]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={werkEnInkomen[4].label} config={[werkEnInkomen[4]]} gwb={gwb}></VerticalBarChart>
        </Column>
        <Column span={4}>
          <VerticalBarChart title={werkEnInkomen[5].label} config={[werkEnInkomen[5]]} gwb={gwb}></VerticalBarChart>
        </Column>
      </Row>

      <Verschillen gwb={gwb} config={werkEnInkomen} />
    </>
  );
};

export default Werk;
