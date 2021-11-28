export default {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "",
  height: 300,
  width: 500,
  data: {
    values: [],
  },
  params: [
    {
      name: "highlight",
      select: { type: "point", on: "mouseover"}
    },
  ],
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
        fillOpacity: {
          condition: { param: "highlight", value: 0.6 },
          value: 1
        },
        tooltip: [
          { field: "gebied", type: "ordinal" , title: "gebied" },
          { field: "label", type: "ordinal", title: "label" },
          { field: "value", type: "quantitative", title: "waarde" }
        ]
      },
    },
  ],
};
