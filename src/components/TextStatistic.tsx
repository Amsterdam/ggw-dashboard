import { useState, useEffect } from "react";
import styled from "styled-components";
import { Heading, Spinner, themeSpacing } from "@amsterdam/asc-ui";

import util from "../services/util";

const Wrapper = styled.div`
  margin-bottom: ${themeSpacing(2)};
`;

const IconWrapper = styled.div`
  margin-right: ${themeSpacing(2)};
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
      // eslint-disable-next-line no-console
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
      <Heading as="h3" style={{ justifyContent: "initial" }}>
        {titleLeft && (
          <>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {Icon && (
                  <IconWrapper>
                    <Icon width={"72"} height={"72"} />
                  </IconWrapper>
                )}
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
                {Icon && (
                  <IconWrapper>
                    <Icon width={"72"} height={"72"} />
                  </IconWrapper>
                )}
                {data} {title}
              </>
            )}
          </>
        )}
      </Heading>
    </Wrapper>
  );
};

export default TextStatistic;
