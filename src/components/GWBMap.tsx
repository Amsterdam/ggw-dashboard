import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import styled from "styled-components";
import { Map, BaseLayer, constants } from "@amsterdam/arm-core";
import { getGWBShapes, drawShapes } from "../services/map";
import { COLOR } from "../services/colorcoding";

const MapDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MapWrapper = styled(Map)`
  position: relative;
  width: 100%;
  height: 150px;
`;

const GWBMap = ({ gwb }) => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);

  const gwbLayer = useRef(null);

  const updateData = () => {
    if (!gwb || !mapInstance) {
      return;
    }

    if (mapInstance && gwbLayer.current) {
      mapInstance.removeLayer(gwbLayer.current);
    }

    const shapes = getGWBShapes(gwb, () => ({
      color: COLOR["ams-rood"],
    }));

    gwbLayer.current = drawShapes(shapes, mapInstance);
  };

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb, mapInstance]);

  return (
    <MapDiv>
      <h2>
        {gwb?.gebiedType} {gwb?.naam}
      </h2>
      <MapWrapper
        options={{ ...constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS, zoomControl: true, maxZoom: 12, minZoom: 6 }}
        setInstance={setMapInstance}
      >
        <BaseLayer baseLayer={constants.DEFAULT_AMSTERDAM_LAYERS[2].urlTemplate} />
      </MapWrapper>
    </MapDiv>
  );
};

export default GWBMap;
