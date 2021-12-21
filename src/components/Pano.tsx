import { useEffect, useState } from "react";
import styled from "styled-components";
import { base62DecodeAngle } from "../services/base62";
import { themeSpacing, themeColor } from "@amsterdam/asc-ui";
import panos from "../static/links/panos.json";

const StyledImage = styled.img`
  width: 100%;
  border: 1px solid ${themeColor("tint", "level0")};
`;

const StyledDiv = styled.div`
  padding: ${themeSpacing(0, 10, 6, 0)};
`;

const Pano = ({ gwb }) => {
  const [src, setSrc] = useState<string>("");

  const updateData = () => {
    const pano = panos.find((i) => i.gwb === gwb.code);

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

      const sbi: string = panoUrl.match(/&sbi=([^&]*)/)![1];
      let sbh: any = panoUrl.match(/&sbh=([^&]*)/)![1];
      sbh = Math.round(base62DecodeAngle(sbh, 1));
      const width = 640;
      const url = `https://api.data.amsterdam.nl/panorama/thumbnail/${sbi}/?width=${width}&heading=${sbh}`;
      setSrc(url);
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
    <StyledDiv>
      <StyledImage src={src} alt={`Pano van ${gwb.naam}`} title={`Pano van ${gwb.naam}`} />
    </StyledDiv>
  );
};

export default Pano;
