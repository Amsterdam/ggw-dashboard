import { FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import { Select, Row, Column } from "@amsterdam/asc-ui";
import util from "../services/util";

type GwbItem = {
  display: string;
  code: string;
  gebiedType: string | null;
  id: string;
};

const FullWidth = styled.div`
  width: 100%;
`;

const getParsedItemId = (item: { id: string }) => {
  return item?.id?.split(".")[0] + "";
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GWBSelector = ({ gwb, setGWB }) => {
  const emptyState: {
    stadsDelen: GwbItem[];
    stadsDeel: string;

    gebied: string;
    gebieden: GwbItem[];

    wijk: string;
    wijken: GwbItem[];

    buurt: string;
    buurten: GwbItem[];
  } = {
    stadsDelen: [],
    stadsDeel: "deel",

    gebied: "gebied",
    gebieden: [],

    wijk: "wijk",
    wijken: [],

    buurt: "buurt",
    buurten: [],
  };
  const [gwbSelection, setGwbSelection] = useState<{
    stadsDelen: any[];
    stadsDeel: string;

    gebied: string;
    gebieden: any[];

    wijk: string;
    wijken: any[];

    buurt: string;
    buurten: any[];
  }>(emptyState);

  const [allData, setAllData] = useState<{
    stadsDelen: any[];
    gebieden: any[];
    wijken: any[];
    buurten: any[];
  }>({
    stadsDelen: [],
    gebieden: [],
    wijken: [],
    buurten: [],
  });

  const updateStadsDeel = async (stadsDeelCode) => {
    let stadsDeelDetail = null;

    console.log("stadsDeelCode", stadsDeelCode);

    if (stadsDeelCode && stadsDeelCode !== "deel") {
      const deel = allData.stadsDelen.find((d) => d.code === stadsDeelCode);
      stadsDeelDetail = deel;

      const gebieden = allData.gebieden.filter((g) => g.ligtInStadsdeelId === getParsedItemId(deel));

      if (gebieden.length > 0) {
        const buurtIds = gebieden.map((g) => g._links.bestaatUitBuurten.map((b) => b.identificatie)).flat();

        const buurten = allData.buurten.filter((b) => buurtIds.includes(getParsedItemId(b)));

        const wijkIds = buurten.map((b) => b.ligtInWijkId);

        const wijken = allData.wijken.filter((w) => wijkIds.includes(getParsedItemId(w)));

        setGwbSelection({
          ...emptyState,
          stadsDelen: allData.stadsDelen,
          stadsDeel: stadsDeelCode,
          gebieden,
          wijken,
          buurten,
        });
      } else {
        setGwbSelection({
          ...emptyState,
          stadsDelen: allData.stadsDelen,
          stadsDeel: stadsDeelCode,
          gebieden: allData.gebieden,
          wijken: allData.wijken,
          buurten: allData.buurten,
        });
      }
    } else {
      const deel = await util.getCity();
      stadsDeelDetail = deel;

      setGwbSelection({
        ...emptyState,
        stadsDeel: deel,
        stadsDelen: allData.stadsDelen,
        gebieden: allData.gebieden,
        wijken: allData.wijken,
        buurten: allData.buurten,
      });
    }

    console.log("stadsDeelDetail", stadsDeelDetail);

    setGWB(stadsDeelDetail);
  };

  const updateGebied = async (gebiedCode) => {
    let gebiedDetail = null;

    console.log("gebiedCode", gebiedCode);

    if (gebiedCode && gebiedCode !== "gebied") {
      const gebied = allData?.gebieden.find((g) => g.code === gebiedCode);

      // TODO: Remove getDetail call.
      gebiedDetail = await util.getDetail(gebied);

      const buurtIds = gebied._links.bestaatUitBuurten.map((b) => b.identificatie);
      const buurten = allData.buurten.filter((b) => buurtIds.includes(getParsedItemId(b)));

      const wijkIds = buurten.map((b) => b.ligtInWijkId);

      const wijken = allData.wijken.filter((w) => wijkIds.includes(getParsedItemId(w)));

      setGwbSelection({
        ...emptyState,
        stadsDeel: gwbSelection.stadsDeel,
        stadsDelen: allData.stadsDelen,
        gebied: gebiedCode,
        gebieden: allData?.gebieden,
        wijken,
        buurten,
      });
    } else {
      updateStadsDeel(gwbSelection.stadsDeel);
    }

    setGWB(gebiedDetail);
  };

  const updateWijk = async (wijkCode) => {
    let wijkDetail = null;

    if (wijkCode && wijkCode !== "wijk") {
      const wijk = allData?.wijken.find((w) => w.code === wijkCode);

      //TODO: Remove getDetail code
      wijkDetail = await util.getDetail(wijk);

      const buurten = allData.buurten.filter((b) => b.ligtInWijkId === getParsedItemId(wijk));

      setGwbSelection({
        ...gwbSelection,
        wijk: wijkCode,
        buurt: "buurt",
        buurten,
      });

      setGWB(wijkDetail);
    } else {
      updateGebied(gwbSelection.gebied);
    }
  };

  const updateBuurt = async (buurtCode) => {
    let buurtDetail = null;

    if (buurtCode && buurtCode !== "buurt") {
      const buurt = allData?.buurten.find((b) => b.code === buurtCode);

      //TODO remove getDetail call
      buurtDetail = await util.getDetail(buurt);

      setGwbSelection({
        ...gwbSelection,
        buurt: buurtCode,
      });

      setGWB(buurtDetail);
    } else {
      updateWijk(gwbSelection.wijk);
    }
  };

  useEffect(() => {
    async function loadInitialData() {
      const results = await Promise.all([
        util.getAllStadsdelen(),
        util.getAllGebieden(),
        util.getAllWijken(),
        util.getAllBuurten(),
      ]);

      const stadsDelen = results[0];

      const gebieden = results[1];

      const wijken = results[2];

      const buurten = results[3];

      setAllData({ wijken, buurten, gebieden, stadsDelen });
      setGwbSelection({
        ...emptyState,
        wijken,
        buurten,
        gebieden,
        stadsDelen,
      });

      const allCity = await util.getCity();
      setGWB(allCity);
    }

    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      {gwbSelection && gwbSelection?.stadsDelen?.length > 0 && (
        <Column span={3}>
          <FullWidth>
            <Select
              id="stadsdelen"
              label="Stadsdeel"
              value={gwbSelection.stadsDeel}
              onChange={(event: FormEvent<HTMLSelectElement>) => {
                updateStadsDeel(event.currentTarget.value);
              }}
            >
              <option value="deel">Amsterdam</option>
              {gwbSelection.stadsDelen.map((stadsDeel) => {
                return (
                  <option key={stadsDeel.code} value={stadsDeel.code}>
                    {stadsDeel.display}
                  </option>
                );
              })}
            </Select>
          </FullWidth>
        </Column>
      )}

      {gwbSelection && gwbSelection?.gebieden?.length > 0 && (
        <Column span={3}>
          <FullWidth>
            <Select
              id="gebieden"
              label="Gebieden"
              value={gwbSelection.gebied}
              onChange={(event: FormEvent<HTMLSelectElement>) => {
                updateGebied(event.currentTarget.value);
              }}
            >
              <option value="gebied">Selecteer een gebied</option>
              {gwbSelection.gebieden.map((gebied) => {
                return (
                  <option key={gebied.code} value={gebied.code}>
                    {gebied.display}
                  </option>
                );
              })}
            </Select>
          </FullWidth>
        </Column>
      )}

      {gwbSelection && gwbSelection?.wijken?.length > 0 && (
        <Column span={3}>
          <FullWidth>
            <Select
              id="wijk"
              label="Wijk"
              value={gwbSelection.wijk}
              onChange={(event: FormEvent<HTMLSelectElement>) => {
                updateWijk(event.currentTarget.value);
              }}
            >
              <option value="wijk">Selecteer een wijk</option>
              {gwbSelection.wijken.map((wijk) => {
                return (
                  <option key={wijk.code} value={wijk.code}>
                    {wijk.display}
                  </option>
                );
              })}
            </Select>
          </FullWidth>
        </Column>
      )}

      {gwbSelection && gwbSelection?.buurten?.length > 0 && (
        <Column span={3}>
          <FullWidth>
            <Select
              id="buurt"
              label="Buurt"
              value={gwbSelection.buurt}
              onChange={(event: FormEvent<HTMLSelectElement>) => {
                updateBuurt(event.currentTarget.value);
              }}
              disabled={gwbSelection.buurten.length < 1}
            >
              <option value="buurt">Selecteer een buurt</option>
              {gwbSelection.buurten.map((buurt) => {
                return (
                  <option key={buurt.vollcode} value={buurt.vollcode}>
                    {buurt.display}
                  </option>
                );
              })}
            </Select>
          </FullWidth>
        </Column>
      )}
    </Row>
  );
};

export default GWBSelector;
