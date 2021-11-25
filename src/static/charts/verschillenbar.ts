export default {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "",
  height: 300,
  width: 500,
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
            labels: false,
            ticks: false,
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
          { field: "gebied", type: "ordinal" , title: "gebied" },
          { field: "title", type: "ordinal", title: "titel" },
          { field: "value", type: "quantitative", title: "waarde" }
        ]
      },
    },
  ],
};
