import { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner, themeSpacing } from "@amsterdam/asc-ui";

import util from "../services/util";

const Wrapper = styled.div`
  margin-top: ${themeSpacing(6)};
  margin-bottom: ${themeSpacing(10)};
`;

const TextStatistic = ({
  title,
  gwb,
  indicatorId,
  titleLeft = true,
}: {
  title: string;
  gwb: any;
  indicatorId: string;
  titleLeft?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string | null>(null);

  async function updateData() {
    setIsLoading(true);

    try {
      const apiData = await util.getLatestConfigCijfers(gwb, [
        {
          indicatorDefinitieId: indicatorId,
        },
      ]);

      setData(util.formatNumber(apiData[apiData.length - 1]?.recent?.waarde) || "-");
    } catch (e) {
      console.error(e);
      setData("-");
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gwb]);

  return (
    <Wrapper>
      <h3>
        {titleLeft && (
          <>
            {title} {isLoading ? <Spinner /> : data}
          </>
        )}
        {!titleLeft && (
          <>
            {isLoading ? <Spinner /> : data} {title}
          </>
        )}
      </h3>
    </Wrapper>
  );
};

export default TextStatistic;
