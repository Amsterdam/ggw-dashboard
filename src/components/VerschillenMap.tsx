// import DEFAULT_AMSTERDAM_MAPS_OPTIONS from ""
import { useState, useEffect } from "react";
import styled from "styled-components";

import { Map, ViewerContainer, Zoom } from "@amsterdam/arm-core";
import { GeoJSON, useMapInstance } from "@amsterdam/react-maps";
import util from "../services/util";
import { getShapes, drawShapes } from '../services/map'
import { COLOR, getRankingColor } from '../services/colorcoding'
import { getOneStd } from "../services/apis/bbga";
import { GeoJSONOptions } from 'leaflet'
import { GeoJsonObject } from 'geojson'

const StyledDiv = styled.div`
  width: 100%;
  height: 400px;
`

const VerschillenMap = ({ gwb, variabele })  => {
  const [json, setJson] = useState(GeoJsonObject);
  const mapInstance = useMapInstance();

  const clearLayers = () => {
    if (json) {
      mapInstance.removeLayer(json);
    }
    setJson({});
  }

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
    setJson(drawShapes(shapes, mapInstance));

    // gwbLayer = drawShapes(shapes, map)

    // this.drawing = false
  };


  const updateData = async() => {
    console.log('updateData mapInstance', mapInstance)

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

    // map = amsMap(this.$refs[this.mapRef]);

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb]);




  const options: GeoJSONOptions = {};
  console.log('VerschillenMap');


//  return json ? <GeoJSON args={[json]} options={options} /> : null;


  return (
    <StyledDiv>
      kaart
      <Map fullScreen>
        <ViewerContainer bottomLeft={<Zoom />} />
        {json ? <GeoJSON args={[json]} options={options} /> : null}
      </Map>
    </StyledDiv>
  )
}

export default VerschillenMap;