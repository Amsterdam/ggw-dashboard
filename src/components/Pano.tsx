import { useEffect, useState } from "react";
// import { TableBody, TableCell, TableHeader, TableRow } from "@amsterdam/asc-ui";
import panos from "../static/links/panos.json";

// 310px hoog

const Pano = ({ gwb }) => {
  const [href, setHref] = useState<string>("");


  const updateData = () => {

    console.log('updateData gwb', gwb);
    const code = gwb.vollcode || gwb.code;
    console.log('updateDate', code);
    const pano = panos.find((i) => { i.gwb === code })
    console.log('pano', pano);
    

    

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
      Pano
    </div>
  );
};

export default Pano;
