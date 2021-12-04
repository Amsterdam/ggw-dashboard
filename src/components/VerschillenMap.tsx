import 'leaflet/dist/leaflet.css';

import { useState, useEffect } from "react";
import { Spinner } from "@amsterdam/asc-ui";
import util from "../services/util";
import { Map, ViewerContainer, Zoom, BaseLayer, getCrsRd } from "@amsterdam/arm-core";
import { GeoJSON } from "@amsterdam/react-maps";

import { getGeometriesGeoJson } from "../services/apis/map"
import { getColor } from '../services/colorcoding'
import { getOneStd } from "../services/apis/bbga";
import { GeoJSONOptions, MapOptions } from 'leaflet'
import { GeoJsonObject } from 'geojson';

const mapOptions: MapOptions = {
  center: [52.3731081, 4.8932945],
  zoom: 6,
  maxZoom: 16,
  minZoom: 3,
  crs: getCrsRd(),
  attributionControl: false,
  zoomControl: true,
  scrollWheelZoom: false
};

const VerschillenMap = ({ gwb, variabele })  => {
  const [json, setJson] = useState<GeoJsonObject | null>(null);
  const [isLoading, setIsLoading] = useState(true);
    
  const enrichShapes = async (shapes :GeoJsonObject, cijfers) => {
    const stdevs = await getOneStd(variabele);
    const enrichedShapes = { ...shapes };

    let features = [...shapes.features];
    features = features.map((feature) => {      
      const cijfer = cijfers.find((sd) => sd.gebiedcode15 === feature.properties.vollcode || sd.gebiedcode15 === feature.properties.code);
      
      const colors = getColor({ indicatorDefinitieId: variabele, kleurenpalet: 1 }, cijfer?.waarde, cijfer?.jaar, stdevs);
    
      return {
        ...feature,
        properties: {
          ...feature.properties,
          ...cijfer,
          ...colors
        }
       }
    });

    enrichedShapes.crs.properties.name = "urn:ogc:def:crs:OGC:1.3:CRS84";
    
    enrichedShapes.features = features;
    
    return enrichedShapes;
  }

  const updateData = async() => {
    if (!variabele) {
      return null;
    }
    setIsLoading(true);
    setJson(null);

    const gebied = await util.getGebiedCijfers(variabele, gwb, util.CIJFERS.LATEST)

    const gebiedType = util.getGebiedType(gwb.vollcode, true);
    
    if (gebiedType === "Stad") {
      setIsLoading(false);
      return;
    } 

    const cijfers = await util.getVerschillenCijfers(variabele, gebiedType, gebied.cijfers.jaar);

    const shapes = await getGeometriesGeoJson(gebiedType);
    const enrichedShapes = await enrichShapes(shapes, cijfers);

    setJson(enrichedShapes);
    
    setIsLoading(false);

    console.log('updateData cijfers', cijfers.length);

    console.log('updateData enrichedShapes', enrichedShapes);        
  };

  useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb]);

  useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const options: GeoJSONOptions = {    
    onEachFeature(feature, layer) {      
      layer.setStyle({
        color: feature?.properties?.color,
        fillColor: feature?.properties?.color,
        fillOpacity: 0.8
      });
    }
  };

  return (
    <>
      {isLoading ? 
        <Spinner /> : 
        <Map options={mapOptions} fullScreen>
          <ViewerContainer bottomLeft={<Zoom />} />
          <BaseLayer baseLayer={`https://{s}.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png`} />
          {json ? <GeoJSON args={[json]} options={options} /> : null}
        </Map>  
      }
    </>
  );
}

export default VerschillenMap;