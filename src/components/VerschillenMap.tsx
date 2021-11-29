// import DEFAULT_AMSTERDAM_MAPS_OPTIONS from ""
import { useState, useEffect } from "react";
import styled from "styled-components";
import util from "../services/util";
import { Map, ViewerContainer, Zoom, getCrsRd } from "@amsterdam/arm-core";
import { GeoJSON } from "@amsterdam/react-maps";

import { drawShapes, getShapes } from '../services/map'
import { COLOR, getRankingColor } from '../services/colorcoding'
import { getOneStd } from "../services/apis/bbga";
import { GeoJSONOptions, MapOptions } from 'leaflet'
import { GeoJsonObject } from 'geojson'

const StyledDiv = styled.div`
  width: 100%;
  height: 400px;
`;

const mapOptions: MapOptions = {
  center: [52.3731081, 4.8932945],
  zoom: 10,
  maxZoom: 16,
  minZoom: 3,
  zoomControl: false,
  crs: getCrsRd(),
  maxBounds: [
    [52.25168, 4.64034],
    [52.50536, 5.10737],
  ]
};

const VerschillenMap = ({ gwb, variabele })  => {
  const [json, setJson] = useState(GeoJsonObject);
  // @ts-ignore
  const [mapInstance, setMapInstance] = useState(any);
  // const mapInstance = useMapInstance();
  
  const clearLayers = () => {
    if (json) {
      // mapInstance.removeLayer(json);
    }
    setJson({});
  }
// 
//   


  const cijferView = async (cijfers, gebiedType) => {
    clearLayers()
    // this.drawing = true

    const cijfersLookup = {}
    cijfers.forEach(cijfer => { cijfersLookup[cijfer.gebiedcode15] = cijfer })

    const shapes = await getShapes(gebiedType, (gebiedcode15) => {
      const c = cijfersLookup[gebiedcode15]
      return {
        fillOpacity: 0.8,
        fillColor: c ? (c.color || getRankingColor(c.ranking - 1, cijfers.length - 1)) : COLOR['ams-wit'],
        color: COLOR['ams-donkergrijs'],
        opacity: 0.5,
        weight: 1
      }
    })

    showShapes(shapes)
  };

  const showShapes = (shapes) => {
    clearLayers()
    // this.drawing = true

    const mapShapes = drawShapes(shapes, {}); //, mapInstance);
    setJson(mapShapes);

    // gwbLayer = drawShapes(shapes, map)

    // this.drawing = false
  };


  const updateData = async() => {

    if (!variabele) {
      return null;
    }

    const gebied = await util.getGebiedCijfers(variabele, gwb, util.CIJFERS.LATEST)


    const gebiedType = util.getGebiedType(gwb.vollcode, true)

    const cijfers = await util.getVerschillenCijfers(variabele, gebiedType, gebied.cijfers.jaar)

    const stdevs = await getOneStd(variabele);
    console.log('updateData stdevs', stdevs.length)


    if (cijfers) {
      cijferView(cijfers, gebiedType)
    }
    
  
    if (cijfers) {
      cijferView(cijfers, gebiedType)
    }


  };

  useEffect(() => {
    if (!gwb) {
      return;
    }

    console.log('updateData mapInstance', mapInstance)

    // map = amsMap(this.$refs[this.mapRef]);

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb]);

  const options: GeoJSONOptions = {};
  console.log('VerschillenMap');


  return (
    <StyledDiv>
      kaart
      <Map fullScreen options={mapOptions} setInstance={setMapInstance}>
        <ViewerContainer bottomLeft={<Zoom />} />
        {json ? <GeoJSON args={[json]} options={options} /> : null}
      </Map>
    </StyledDiv>
  )
}

export default VerschillenMap;