import util from "./util";

describe("util", () => {
  const gebied = {
    _display: "Bijlmer Centrum (DX20)",
    _links: { self: { href: "" } },
    code: "DX20",
    dataset: "gebieden",
    display: "DX20 Bijlmer-Centrum",
    gebiedType: "Gebied",
    naam: "Bijlmer-Centrum",
    vollcode: "DX20",
    volledige_code: "DX20",
  };

  it.only("gets the max year from an array of cijfers", () => {
    const max = util.getMaxYear([
      {
        x: 1,
      },
      {
        x: 3,
      },
      {
        x: 2,
      },
    ]);
    expect(max).toEqual(3);
  });

  it.only("can get the (x,y) cijfers for a given dataset", () => {
    const data = [
      {
        label: "label",
        cijfers: [
          {
            jaar: "jaar",
            waarde: "waarde",
            color: "color",
          },
        ],
      },
    ];

    expect(util.getYearCijfers(data)).toEqual([
      {
        cijfer: {
          color: "color",
          jaar: "jaar",
          waarde: "waarde",
        },
        color: "color",
        display: "",
        variable: "label",
        x: "jaar",
        y: "waarde",
      },
    ]);
  });

  it.only("can get the last n (x,y) cijfers for a given dataset", () => {
    const data = [1, 2, 3, 4, 5].map((i) => ({
      label: "label",
      cijfers: [
        {
          jaar: i,
          waarde: i,
          color: i,
        },
      ],
    }));

    expect(util.getYearCijfers(data, 2)).toEqual(
      [4, 5].map((i) => ({
        cijfer: {
          color: i,
          jaar: i,
          waarde: i,
        },
        color: i,
        display: `${i}`,
        variable: "label",
        x: i,
        y: i,
      })),
    );
  });

  describe.only("get selection from given dataset", () => {
    const sourceYears = [2011, 2012, 2013, 2014, 2015, 2016];
    const data = sourceYears.map((i) => ({
      label: "label",
      cijfers: [
        {
          jaar: i,
          waarde: i,
          color: i,
        },
      ],
    }));

    const getYears = (data) => data.map(({ x }) => x);

    it("can get odd years for a given dataset", () => {
      const yearCijfers = util.getYearCijfers(data, null, { even: true });
      const years = getYears(yearCijfers);

      expect(years).toEqual([2012, 2014, 2016]);
    });

    it("can get even years for a given dataset", () => {
      const yearCijfersEven = util.getYearCijfers(data, null, { odd: true });
      const yearsEven = getYears(yearCijfersEven);

      expect(yearsEven).toEqual([2011, 2013, 2015]);

      // 'odd' takes precedence over 'even'
      const yearCijfersEven2 = util.getYearCijfers(data, null, { odd: true, even: true });
      const yearsEven2 = getYears(yearCijfersEven2);

      expect(yearsEven2).toEqual([2011, 2013, 2015]);
    });

    it("can get years before a given year for a given dataset", () => {
      const yearCijfers = util.getYearCijfers(data, null, { after: 2014 });
      const years = getYears(yearCijfers);

      expect(years).toEqual([2015, 2016]);

      // exclude the 'odd' years
      const yearCijfersOdd = util.getYearCijfers(data, null, { odd: true, after: 2014 });
      const yearsOdd = getYears(yearCijfersOdd);

      expect(yearsOdd).toEqual([2015]);

      // exclude the 'even' years
      const yearCijfersEven = util.getYearCijfers(data, null, { even: true, after: 2014 });
      const yearsEven = getYears(yearCijfersEven);

      expect(yearsEven).toEqual([2016]);
    });

    it("can get years after a given year for a given dataset", () => {
      const yearCijfers = util.getYearCijfers(data, null, { before: 2014 });
      const years = getYears(yearCijfers);

      expect(years).toEqual([2011, 2012, 2013]);

      // exclude the 'odd' years
      const yearCijfersOdd = util.getYearCijfers(data, null, { odd: true, before: 2014 });
      const yearsOdd = getYears(yearCijfersOdd);

      expect(yearsOdd).toEqual([2011, 2013]);

      // exclude the 'even' years
      const yearCijfersEven = util.getYearCijfers(data, null, { even: true, before: 2014 });
      const yearsEven = getYears(yearCijfersEven);

      expect(yearsEven).toEqual([2012]);
    });

    it("can get specific years for a given dataset", () => {
      const yearCijfers = util.getYearCijfers(data, null, { exact: [2012, 2013, 2014] });
      const years = getYears(yearCijfers);

      expect(years).toEqual([2012, 2013, 2014]);

      // each value in the exclusion array has to be a number
      const yearCijfersWrongFilter = util.getYearCijfers(data, null, { exact: [2012, 2013, "a"] });
      const yearsWrongFilter = getYears(yearCijfersWrongFilter);

      expect(yearsWrongFilter).toEqual([2011, 2012, 2013, 2014, 2015, 2016]);
    });
  });

  it("can get gebieden for a gebied type", async () => {
    expect(await util.getGwbs(util.GEBIED_TYPE.Gebied)).toEqual([gebied]);
  });

  it("can get geometrieen for a gebied type", async () => {
    expect(await util.getGeometries(util.GEBIED_TYPE.Gebied)).toEqual({
      DX11: {
        coordinates: [
          [
            [52.344677, 4.878399],
            [52.344683, 4.878583],
            [52.344923, 4.879062],
            [52.345963, 4.881309],
          ],
        ],
        type: "Polygon",
      },
    });
  });

  it("can get the cijfers for a gebied given a configuration", async () => {
    const config = [
      {
        label: "Totaal",
        variabele: "Bevtotaal",
      },
    ];

    expect(await util.getConfigCijfers(gebied, config)).toMatchObject([
      {
        cijfers: [{ gebiedcode15: "DX20", jaar: 2018, post: "", waarde: 25008 }],
        gebied: {
          _display: "Bijlmer Centrum (DX20)",
          _links: { self: { href: "" } },
          code: "DX20",
          dataset: "gebieden",
          display: "DX20 Bijlmer-Centrum",
          gebiedType: "Gebied",
          naam: "Bijlmer-Centrum",
          vollcode: "DX20",
          volledige_code: "DX20",
        },
        label: "Totaal",
        meta: {
          _display: "Meta object",
          bron: "Afd. Basisinformatie / OIS",
          definitie:
            "Personen die op 1 januari zijn opgenomen in het bevolkingsregister van de gemeente Amsterdam (inclusief briefadreshoudenden). Personen die niet legaal in Nederland verblijven worden buiten beschouwing gelaten.",
          eenheid: 2,
          format: "F8.",
          groep: "",
          id: 1,
          kleurenpalet: 9,
          label: "Bevolking totaal",
          legendacode: "3",
          minimum_aantal_inwoners: 0,
          minimum_aantal_woningen: 0,
          peildatum: "1  januari",
          sort: "1",
          symbool: "",
          thema: "Bevolking",
          thema_kleurentabel: "Bevolking",
          variabele: "BEVTOTAAL",
          verschijningsfrequentie: "1 keer per jaar",
        },
        recent: { gebiedcode15: "DX20", jaar: 2018, post: "", waarde: 25008 },
      },
    ]);
  });

  it("can get the latest cijfers for a gebied given a configuration", async () => {
    const config = [
      {
        label: "Totaal",
        variabele: "Bevtotaal",
      },
    ];

    expect(await util.getLatestConfigCijfers(gebied, config)).toMatchObject([
      {
        cijfers: [{ gebiedcode15: "DX20", jaar: 2018, post: "", waarde: 25008 }],
        gebied: {
          _display: "Bijlmer Centrum (DX20)",
          _links: { self: { href: "" } },
          code: "DX20",
          dataset: "gebieden",
          display: "DX20 Bijlmer-Centrum",
          gebiedType: "Gebied",
          naam: "Bijlmer-Centrum",
          vollcode: "DX20",
          volledige_code: "DX20",
        },
        label: "Totaal",
        meta: {
          _display: "Meta object",
          bron: "Afd. Basisinformatie / OIS",
          definitie:
            "Personen die op 1 januari zijn opgenomen in het bevolkingsregister van de gemeente Amsterdam (inclusief briefadreshoudenden). Personen die niet legaal in Nederland verblijven worden buiten beschouwing gelaten.",
          eenheid: 2,
          format: "F8.",
          groep: "",
          id: 1,
          kleurenpalet: 9,
          label: "Bevolking totaal",
          legendacode: "3",
          minimum_aantal_inwoners: 0,
          minimum_aantal_woningen: 0,
          peildatum: "1  januari",
          sort: "1",
          symbool: "",
          thema: "Bevolking",
          thema_kleurentabel: "Bevolking",
          variabele: "BEVTOTAAL",
          verschijningsfrequentie: "1 keer per jaar",
        },
        recent: { gebiedcode15: "DX20", jaar: 2018, post: "", waarde: 25008 },
      },
    ]);
  });

  it("returns a set of legend labels", () => {
    const configCijfers = [
      {
        label: "Foo",
        showInLegend: false,
      },
      {
        label: "Bar",
        showInLegend: true,
      },
      {
        label: "Baz",
        showInLegend: undefined,
      },
      {
        label: "Qux",
        showInLegend: null,
      },
    ];

    const labels = util.getLegendLabels(configCijfers);
    expect(labels).toEqual(["Bar", "Baz", "Qux"]);
  });
});
