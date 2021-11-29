// import DEFAULT_AMSTERDAM_MAPS_OPTIONS from ""
import { useState, useEffect } from "react";
import styled from "styled-components";

import { Map } from "@amsterdam/arm-core";
import { GeoJSON } from "@amsterdam/react-maps";
import util from "../services/util";
import { getOneStd } from "../services/apis/bbga";
import { GeoJSONOptions } from 'leaflet'
import { GeoJsonObject } from 'geojson'

const StyledDiv = styled.div`
  width: 100%;
  height: 400px;
`

const VerschillenMap = ({ gwb, variabele })  => {
  const [json, setJson] = useState(GeoJsonObject);

  const clearLayers = () => {
    if (json) {
      // map.removeLayer(json)
    }
    setJson({});
  }

  const updateData = async() => {
    if (!variabele) {
      return null;
    }

    const gebied = await util.getGebiedCijfers(variabele, gwb, util.CIJFERS.LATEST)

    // console.log('this.gwb code', this.gwb.vollcode)

    const gebiedType = util.getGebiedType(gwb.vollcode, true)

    const cijfers = await util.getVerschillenCijfers(variabele, gebiedType, gebied.cijfers.jaar)

    const stdevs = await getOneStd(variabele);
    
    // const cijfers = await this.getVerschillenCijfers(this.variable, gebiedType, gebied.cijfers.jaar)
    // this.cityCijfers = cijfers
    // this.loading = false

    if (cijfers) {
      this.cijferView(cijfers, gebiedType)
    }


  },

  useEffect(() => {
    if (!gwb) {
      return;
    }

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
        {json ? <GeoJSON args={[json]} options={options} /> : null}
      </Map>
    </StyledDiv>
  )
}

export default VerschillenMap;