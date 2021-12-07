import { useState, useEffect } from "react";
import styled from "styled-components";
import { Spinner, themeSpacing } from "@amsterdam/asc-ui";

import util from "../services/util";

const Wrapper = styled.div`
  margin-bottom: ${themeSpacing(2)};
`;

const TextStatistic = ({
  title,
  gwb,
  indicatorId,
  titleLeft = true,
  Icon,
}: {
  title: string;
  gwb: any;
  indicatorId: string;
  titleLeft?: boolean;
  Icon?: ({ width, height }: { width?: string | undefined; height?: string | undefined }) => JSX.Element;
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
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {Icon && <Icon width={"72"} height={"72"} />}
                {title} {data}
              </>
            )}
          </>
        )}
        {!titleLeft && (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {Icon && <Icon width={"72"} height={"72"} />}
                {data} {title}
              </>
            )}
          </>
        )}
      </h3>
    </Wrapper>
  );
};

export default TextStatistic;
