import { FormEvent, useEffect, useState } from "react";
import { Select } from "@amsterdam/asc-ui";
import util from "../services/util";

type GwbItem = { display: string; vollcode: string; gebiedType: string | null };

/**
 * Provides for a selection of None, for all gebieden, wijken and buurten
 * @param title gebied, wijk or buurt => gebieden, wijken, buurten
 * @param display override for derivation of title
 */
function getSelectNone(title: string, display: string | null = null): GwbItem {
  return {
    display: display || `geen ${title} geselecteerd`,
    vollcode: title,
    gebiedType: null,
  };
}

const GWBSelector = ({ gwb, setGWB }) => {
  const emptyState: {
    gebied: string;
    gebieden: GwbItem[];

    wijk: string | null;
    wijken: GwbItem[];

    buurt: string | null;
    buurten: GwbItem[];
  } = {
    gebied: "DX01",
    gebieden: [],

    wijk: null,
    wijken: [],

    buurt: null,
    buurten: [],
  };
  const [gwbSelection, setGwbSelection] = useState<{
    gebied: string | null;
    gebieden: any[];

    wijk: string | null;
    wijken: any[];

    buurt: string | null;
    buurten: any[];
  }>(emptyState);

  const updateGebied = async (gebiedCode) => {
    let gebiedDetail = null;

    if (gebiedCode) {
      const gebied = gwbSelection.gebieden.find(
        (g) => g.vollcode === gebiedCode
      );

      gebiedDetail = await util.getDetail(gebied);

      if (gebied && gebied.gebiedType !== "Stadsdeel") {
        const wijken = await util.getWijken(gebied);

        setGwbSelection({
          ...emptyState,
          gebied: gwbSelection.gebied,
          gebieden: gwbSelection.gebieden,
          wijken: [getSelectNone("wijk")].concat(wijken),
        });
      }
    } else {
      const gebied = await util.getCity();
      gebiedDetail = gebied;

      setGwbSelection({
        ...emptyState,
        gebied,
        gebieden: gwbSelection.gebieden,
      });
    }

    setGWB(gebiedDetail);
  };

  const updateWijk = async (wijkCode) => {
    let wijkDetail = null;

    if (wijkCode && wijkCode !== "wijk") {
      const wijk = gwbSelection.wijken.find((w) => w.vollcode === wijkCode);

      wijkDetail = await util.getDetail(wijk);

      const buurten = [getSelectNone("buurt")].concat(
        await util.getBuurten(wijk)
      );

      setGwbSelection({
        ...gwbSelection,
        buurt: null,
        buurten,
        wijk,
      });

      setGWB(wijkDetail);
    } else {
      updateGebied(gwbSelection.gebied);
    }
  };

  const updateBuurt = async (buurtCode) => {
    let buurtDetail = null;

    if (buurtCode && buurtCode !== "buurt") {
      const buurt = gwbSelection.buurten.find((b) => b.vollcode === buurtCode);

      buurtDetail = await util.getDetail(buurt);
      setGWB(buurtDetail);
    } else {
      updateWijk(gwbSelection.wijk);
    }
  };

  useEffect(() => {
    updateGebied(gwbSelection.gebied);
  }, [gwbSelection.gebieden]);

  useEffect(() => {
    async function loadInitialData() {
      const gebieden = [getSelectNone("gebied", "Amsterdam")]
        .concat(await util.getAllStadsdelen())
        .concat(await util.getAllGebieden());

      setGwbSelection({ ...emptyState, gebieden });
    }

    loadInitialData();
  }, []);

  return (
    <div style={{ width: "100%" }}>
      {gwbSelection && gwbSelection?.gebieden?.length > 0 && (
        <Select
          id="gebieden"
          label="Gebieden"
          defaultValue={emptyState.gebied}
          onChange={(event: FormEvent<HTMLSelectElement>) => {
            updateGebied(event.currentTarget.value);
          }}
        >
          {gwbSelection.gebieden.map((gebied) => {
            return (
              <option key={gebied.vollcode} value={gebied.vollcode}>
                {gebied.display}
              </option>
            );
          })}
        </Select>
      )}

      {gwbSelection && gwbSelection?.wijken?.length > 0 && (
        <Select
          id="wijk"
          label="Wijk"
          defaultValue="wijk"
          onChange={(event: FormEvent<HTMLSelectElement>) => {
            updateWijk(event.currentTarget.value);
          }}
        >
          {gwbSelection.wijken.map((wijk) => {
            return (
              <option key={wijk.vollcode} value={wijk.vollcode}>
                {wijk.display}
              </option>
            );
          })}
        </Select>
      )}

      <Select
        id="buurt"
        label="Buurt"
        defaultValue="buurt"
        onChange={(event: FormEvent<HTMLSelectElement>) => {
          updateBuurt(event.currentTarget.value);
        }}
        disabled={gwbSelection.buurten.length < 1}
      >
        {gwbSelection.buurten.map((buurt) => {
          return (
            <option key={buurt.vollcode} value={buurt.vollcode}>
              {buurt.display}
            </option>
          );
        })}
      </Select>
    </div>
  );
};

export default GWBSelector;
