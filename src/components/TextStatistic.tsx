import { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner, themeSpacing } from "@amsterdam/asc-ui";

import util from "../services/util";

const Wrapper = styled("div")`
  margin-top: ${themeSpacing(6)};
  margin-bottom: ${themeSpacing(14)};
`;

const TextStatistic = ({ title, gwb, indicatorId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<string | null>(null);

  async function updateData() {
    setIsLoading(true);

    const apiData = await util.getLatestConfigCijfers(gwb, [
      {
        indicatorDefinitieId: indicatorId,
      },
    ]);

    if (apiData?.length > 0) {
      setData(apiData[apiData.length - 1]?.recent?.waarde);
    } else {
      setData("geen gegevens");
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (!gwb) {
      return;
    }

    updateData();
  }, [gwb]);

  return (
    <Wrapper>
      <h3>
        {title} {isLoading ? <Spinner /> : data}
      </h3>
    </Wrapper>
  );
};

export default TextStatistic;
