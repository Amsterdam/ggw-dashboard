import { useEffect, useState } from "react";
// import { styled } from "styled-components"
// import { TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import panos from "../static/links/panos.json";

// 310px hoog

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
      // found url
      const url = pano?.pano;
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
    <div>
      <img src={src} alt={`Pano van ${gwb.naam}`} title={`Pano van ${gwb.naam}`} />
    </div>
  );
};

export default Pano;
