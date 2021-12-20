import { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner } from "@amsterdam/asc-ui";
import { Map, ViewerContainer, BaseLayer, getCrsRd } from "@amsterdam/arm-core";
import { GeoJSON } from "@amsterdam/react-maps";

import { getGeometriesGeoJson } from "../services/apis/map";
import util from "../services/util";
import { getMeta } from "../services/apis/bbga";
import { GeoJSONOptions, MapOptions, Layer } from "leaflet";
import { GeoJsonObject } from "geojson";
import { Gwb } from "../types";
import { VERSCHILLEN_SELECTED } from "../services/colorcoding";

const MapWrapper = styled.div`
  height: 380px;
  width: 100%;
`;

const mapOptions: MapOptions = {
  center: [52.3731081, 4.8932945],
  zoom: 6,
  maxZoom: 16,
  minZoom: 3,
  crs: getCrsRd(),
  attributionControl: false,
  zoomControl: false,
  scrollWheelZoom: false,
  doubleClickZoom: false,
};

interface Props {
  gwb: Gwb;
  indicatorDefinitieId: string;
}

const VerschillenMap: React.FC<Props> = ({ gwb, indicatorDefinitieId }) => {
  const [json, setJson] = useState<GeoJsonObject | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [layerInstance, setInstance] = useState<Layer | undefined>();

  const enrichShapes = async (shapes: GeoJsonObject, cijfers) => {
    const meta = await getMeta(indicatorDefinitieId);
    const enrichedShapes = { ...shapes };

    if (typeof meta === "string") {
      return;
    }

    let features = [...shapes.features];
    features = features.map((feature) => {
      const cijfer = cijfers.find(
        (c) => c.gebiedcode15 === feature.properties.vollcode || c.gebiedcode15 === feature.properties.code,
      );

      return {
        ...feature,
        properties: {
          ...feature.properties,
          ...cijfer,
          meta,
          color: feature?.properties?.code === gwb?.code ? VERSCHILLEN_SELECTED : cijfer?.color,
        },
      };
    });

    enrichedShapes.crs.properties.name = "urn:ogc:def:crs:OGC:1.3:CRS84";

    enrichedShapes.features = features;

    return enrichedShapes;
  };

  const updateData = async () => {
    if (!indicatorDefinitieId) {
      return null;
    }
    setIsLoading(true);
    setJson(null);

    const gebied = await util.getGebiedCijfers(indicatorDefinitieId, gwb, util.CIJFERS.LATEST);

    if (gwb.code === "STAD" || !gebied.cijfers) {
      setIsLoading(false);
      return;
    }
    const gebiedType = util.getGebiedType(gwb.vollcode || gwb.code, true);

    const cijfers = await util.getVerschillenCijfers(indicatorDefinitieId, gebiedType, gebied.cijfers.jaar);

    const shapes = await getGeometriesGeoJson(gebiedType);
    const enrichedShapes = await enrichShapes(shapes, cijfers);

    setJson(enrichedShapes);

    setIsLoading(false);
  };

  useEffect(() => {
    if (!gwb || !indicatorDefinitieId) {
      return;
    }

    updateData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb, indicatorDefinitieId]);

  useEffect(() => {
    if (!layerInstance) {
      return;
    }

    layerInstance._map.fitBounds(layerInstance.getBounds());
  }, [layerInstance]);

  const options: GeoJSONOptions = {
    onEachFeature(feature, layer: Layer) {
      layer.setStyle({
        color: "#666666",
        fillColor: feature?.properties?.color ?? "#ffffff",
        fillOpacity: 1,
        stroke: 1,
        weight: 1,
      });

      layer.bindPopup(
        `<strong>Gebied</strong>: ${feature.properties.display}</br><strong>Label</strong>: ${
          feature.properties.meta.labelKort
        }</br><strong>Peiljaar</strong>: ${feature.properties.jaar ?? "-"}</br><strong>Waarde</strong>: ${
          feature.properties.waarde ?? "-"
        }`,
      );
    },
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <MapWrapper>
          <Map options={mapOptions} fullScreen>
            <ViewerContainer />
            <BaseLayer baseLayer={`https://{s}.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png`} />
            {json ? <GeoJSON setInstance={setInstance} args={[json]} options={options} /> : null}
          </Map>
        </MapWrapper>
      )}
    </>
  );
};

export default VerschillenMap;
