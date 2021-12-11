import { useEffect, useState } from "react";
import L from "leaflet";
import styled from "styled-components";
import { Map, BaseLayer, constants } from "@amsterdam/arm-core";
import { GeoJSON } from "@amsterdam/react-maps";
import { Heading } from "@amsterdam/asc-ui"; 
import { GeoJsonObject, GeoJSONOptions } from "geojson";
import { rdPolygonToWgs84 } from "../services/geojson";
const MapDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MapWrapper = styled(Map)`
  position: relative;
  width: 100%;
  height: 200px;
`;

const GWBMap = ({ gwb }) => {
  const [layerInstance, setInstance] = useState<L.Layer | undefined>();
  const [mapInstance, setMapInstance] = useState<L.Layer | undefined>();
  const [json, setJson] = useState<GeoJsonObject | null>(null);
  console.log('GWBMap', gwb.naam);
  
  const getGeoJson = (gwb) => {
    const geometry = rdPolygonToWgs84(gwb.geometrie);

    return {
      type: 'Feature',
      crs: {
        type: 'name',
        properties: {
          name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
        },
      },
      properties: {
        naam: gwb.naam,
        gebied: gwb.vollcode || gwb.code
      },
      geometry
    }
  };

  const updateData = () => {
    if (!gwb || gwb.naam === "Amsterdam") {
      return;
    }
    setJson(null);
    console.log('gwb', gwb);
    const yo = getGeoJson(gwb);
    console.log('json', yo);
    setJson(yo);
  };

  useEffect(() => {
    console.log('GWBMap');
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb]);


  useEffect(() => {
    if (!gwb || !layerInstance || !mapInstance) {
      return
    }
    updateData();
    // console.log('layerInstance', layerInstance.addTo);
    // console.log('layerInstance ', layerInstance._map);
    mapInstance.fitBounds(layerInstance.getBounds());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layerInstance, mapInstance, gwb]);

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  const options: GeoJSONOptions = {
    onEachFeature(feature, layer) {
      layer.setStyle({
        color: "#ec0000",
        fillColor: "#ec0000",
        fillOpacity: 0.2,
      });
    },
  };

  return (
    <MapDiv>
      <Heading as="h2">
        {gwb?.gebiedType} {gwb?.naam}
      </Heading>
      <MapWrapper
        setInstance={setMapInstance}
        options={{ ...constants.DEFAULT_AMSTERDAM_MAPS_OPTIONS, zoomControl: true, maxZoom: 12, minZoom: 6 }}
      >
        <BaseLayer baseLayer={constants.DEFAULT_AMSTERDAM_LAYERS[2].urlTemplate} />
        {json ? <GeoJSON setInstance={setInstance} args={[json]} options={options} /> : null}
      </MapWrapper>
    </MapDiv>
  );
};

export default GWBMap;
