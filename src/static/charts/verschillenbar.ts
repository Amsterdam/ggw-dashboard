export default {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "",
  height: 350,
  width: 500,
  data: {
    values: [],
  },
  config: {
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
            labels: true,
            ticks: true,
            title: null,
          },
        },
        x: {
          field: "gebied",
          type: "ordinal",
          sort: null,
          axis: {
            labels: false,
            ticks: false,
            title: null,
          },
        },
        tooltip: [
          { field: "gebied", type: "ordinal", title: "Gebied" },
          { field: "label", type: "ordinal", title: "Label" },
          { field: "value", type: "quantitative", title: "Waarde" },
        ],
      },
    },
    {
      encoding: {
        text: {
          field: "current",
        },
        x: {
          field: "gebied",
          type: "ordinal",
        },
        y: {
          field: "value",
          type: "quantitative",
        },
      },
      mark: {
        type: "text",
        align: "left",
        dy: -15,
        opacity: 1,
        color: "black"
      },
    },
  ],
};
