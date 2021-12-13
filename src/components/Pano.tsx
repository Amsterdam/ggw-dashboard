import { useEffect, useState } from "react";
// import { styled } from "styled-components"
// import { TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import panos from "../static/links/panos.json";

// 310px hoog

const Pano = ({ gwb }) => {
  const [src, setSrc] = useState<string>("");


  const updateData = () => {

    // console.log('updateData gwb', gwb);
    // const code = gwb.code;
    // console.log('updateDate', code);
    const pano = panos.find((i) => i.gwb === gwb.code);
    console.log('pano', pano);
    if (pano?.file) {
      setSrc(pano?.file);
      return;
    } 
    
    if (pano?.pano) {
      const url = pano?.pano;
      console.log('call: url', url);
      
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
      <img   src="/static/panos/amsterdam.jpg" alt={`Pano van ${gwb.naam}`} />
    </div>
  );
};

export default Pano;
