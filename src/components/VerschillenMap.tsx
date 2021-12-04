import 'leaflet/dist/leaflet.css';

import { useState, useEffect } from "react";
// import styled from "styled-components";
import { Spinner } from "@amsterdam/asc-ui";
import util from "../services/util";
import { Map, ViewerContainer, Zoom, BaseLayer, getCrsRd } from "@amsterdam/arm-core";
import { GeoJSON } from "@amsterdam/react-maps";

import { getGeometriesGeoJson } from "../services/apis/map"
import { getColor } from '../services/colorcoding'
import { getOneStd } from "../services/apis/bbga";
import { GeoJSONOptions, MapOptions, Map as MapType } from 'leaflet'
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
  const [mapInstance, setMapInstance] = useState<MapType>();
  const [layarInstance, setLayerInstance] = useState<MapType>();
  
  const clearLayers = () => {
    if (json) {
      // mapInstance.removeLayer(json);
    }
    // setJson({});
  }
  
  const enrichShapes = async (shapes :GeoJsonObject, cijfers) => {
    const stdevs = await getOneStd(variabele);
    const enrichedShapes = { ...shapes };

    let features = [...shapes.features];
    features = features.map((feature) => {      
      const cijfer = cijfers.find((sd) => sd.gebiedcode15 === feature.properties.vollcode || sd.gebiedcode15 === feature.properties.code);
      const colors = getColor(
        { indicatorDefinitieId: variabele, kleurenpalet: 1 }, 
        cijfer?.waarde, 
        feature.properties.jaar, stdevs);
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

    const cijfers = await util.getVerschillenCijfers(variabele, gebiedType, gebied.cijfers.jaar);

    const shapes = await getGeometriesGeoJson(gebiedType);
    const enrichedShapes = await enrichShapes(shapes, cijfers);

    // setJson(enrichedShapes);
    
    setIsLoading(false);

    console.log('updateData cijfers', cijfers.length);

    console.log('updateData mapInstance', mapInstance);
    console.log('updateData layarInstance', layarInstance);
    console.log('updateData enrichedShapes', enrichedShapes);
    
    // const test = {
    //   type: 'FeatureCollection',
    //   name: 'Black spots',
    //   crs: {
    //     type: 'name',
    //     properties: {
    //       name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
    //     },
    //   },
    //   features: [{
    //     type: "Feature",
    //     geometry: {
    //       type: "Point",
    //       coordinates: [4.8932945, 52.3731081]
    //     }
    //   }],
    // };
    // setJson(test);
    // const shapes = await getGeometriesGeoJson(gebiedType)
    // setJson(shapes);
    // console.log('updateData shapes', shapes);
    

    if (cijfers && mapInstance) {
      // temp disabled
      // cijferView(cijfers, gebiedType)
    }
    
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

  console.log('VerschillenMap json', json);
  
  const options: GeoJSONOptions = {
    pointToLayer: (feature, latlng) => {
      console.log('pointToLayer', feature, latlng)
    },
    onEachFeature(feature, layer) {
      console.log('onEachFeature', feature.properties.code, layer);
      
      layer.setStyle({
        color: "blue",
        fillColor: "#f00",
        fillOpacity: 1
      });
    }
  };
// @ts-ignore
  return (
    <>
      {isLoading ? 
        <Spinner /> : 
        <Map options={mapOptions} fullScreen setInstance={setMapInstance}>
          <ViewerContainer bottomLeft={<Zoom />} />
          <BaseLayer baseLayer={`https://{s}.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png`} />
          {json ? <GeoJSON setInstance={setLayerInstance} args={[json]} options={options} /> : null}
        </Map>  
      }
    </>
  );
}

export default VerschillenMap;