import * as React from "react";
import styled from "styled-components";
import { getGWBShapes, drawShapes, amsMap } from "../services/map";
import { COLOR } from "../services/colorcoding";

const MapDiv = styled("div")`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const GWBMap = ({ gwb }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);
  const map = React.useRef<{
    removeLayer: (layer: any) => void;
    remove: () => void;
  } | null>(null);

  const gwbLayer = React.useRef(null);

  const updateData = () => {
    if (gwbLayer.current && map.current) {
      map.current.removeLayer(gwbLayer.current);
    }

    if (!gwb || !map.current) {
      return;
    }

    const shapes = getGWBShapes(gwb, () => ({
      color: COLOR["ams-rood"],
    }));

    gwbLayer.current = drawShapes(shapes, map.current);
  };

  React.useEffect(() => {
    if (map.current === null) {
      map.current = amsMap(mapRef.current);
    }

    updateData();
  }, [gwb]);

  return (
    <MapDiv>
      <h2 style={{ marginTop: 0 }}>Gebied {gwb?.naam}</h2>
      <div style={{ position: "relative", width: "100%", height: "200px" }}>
        <div
          className="map"
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        ></div>
      </div>
    </MapDiv>
  );
};

export default GWBMap;
