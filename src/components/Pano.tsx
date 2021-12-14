import { useEffect, useState } from "react";
import styled from "styled-components"
import { base62DecodeAngle } from '../services/base62'
import panos from "../static/links/panos.json";

const StyledImage = styled.img`
  width: 400px;
`

const Pano = ({ gwb }) => {
  const [src, setSrc] = useState<string>("");

  const updateData = () => {
    const pano = panos.find((i) => i.gwb === gwb.code);
    console.log("pano", pano);

    if (!pano) {
      // not found
      setSrc("/panos/amsterdam.jpg");
      return;
    }

    if (pano?.file) {
      // found file
      setSrc(pano?.file);
      return;
    }

    if (pano?.pano) {
      const panoUrl = pano?.pano;
      // @ts-ignore
      const sbi: string = panoUrl.match(/&sbi=([^&]*)/)[1];
      // @ts-ignore
      let sbh: string = panoUrl.match(/&sbh=([^&]*)/)[1];
      // @ts-ignore
      sbh = Math.round(base62DecodeAngle(sbh, 1));
      const width = 500;
      const url = `https://api.data.amsterdam.nl/panorama/thumbnail/${sbi}/?width=${width}&heading=${sbh}`

      setSrc(url);
      console.log("call: url", url);
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

  return (
    <StyledImage src={src} alt={`Pano van ${gwb.naam}`} title={`Pano van ${gwb.naam}`} />
  );
};

export default Pano;
