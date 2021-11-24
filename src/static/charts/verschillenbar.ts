export default {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "",
  height: 125,
  width: 300,
  data: {
    values: [],
  },
  config: {
    style: {
      cell: {
        stroke: "transparent",
      },
    },
    axis: {
      labelFontSize: 13,
      labelLimit: 100,
      labelFont: "Avenir Next",
    },
    legend: {
      labelFontSize: 13,
      columns: 4,
      labelFont: "Avenir Next",
    },
    title: {
      font: "Avenir Next",
    },
  },
  layer: [
    {
      mark: {
        type: "bar",
        color: { expr: "datum.color ? datum.color : '#eeeeee' " },
      },
      encoding: {
        y: {
          field: "value",
          type: "quantitative",

          axis: {
            title: null,
            tickCount: 5,
            offset: 5,
          },
        },
        x: {
          field: "key",
          type: "ordinal",
          sort: null,
          axis: {
            labels: true,
            labelPadding: 5,
            ticks: false,
            title: null,
          },
        },
      },
    },
  ],
};
