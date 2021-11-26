import { useEffect, useState } from "react";
import util from "../services/util";

function useGetLatestConfigCijfers({ gwb, config }) {
  const [data, setData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!gwb) {
      return;
    }

    async function getData() {
      setIsLoading(true);
      const data = await util.getLatestConfigCijfers(gwb, config);

      setIsLoading(false);
      setData(data);
    }

    getData();
  }, [gwb, config]);

  return {
    data,
    isLoading,
  };
}

export default useGetLatestConfigCijfers;
