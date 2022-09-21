export default {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 325,
  height: 150,
  config: {
    axis: {
      labelFontSize: 13,
      labelLimit: 100,
      labelFont: "Amsterdam Sans",
    },
    legend: {
      labelFontSize: 13,
      columns: 4,
      labelFont: "Amsterdam Sans",
    },
    title: {
      font: "Amsterdam Sans",
    },
  },
  data: { values: [] },
  encoding: {
    x: {
      field: "value",
      title: null,
      scale: {
        domain: [0, 100],
      },
      axis: {
        tickCount: 5,
      },
    },
    y: {
      field: "gebied",
      title: null,
      sort: { order: "descending" },
      axis: {
        ticks: false,
        labelExpr: "split(datum.value, ' ')",
      },
    },
  },
  layer: [
    {
      mark: "bar",
      encoding: {
        x: { aggregate: "sum", field: "value", title: null },
        y: { field: "gebied", title: "Gebied" },
        color: {
          field: "key",
          title: "",
          legend: {
            orient: "none",
            legendX: -70,
            legendY: -40,
            direction: "horizontal",
          },
        },
        tooltip: [
          { field: "definitie", type: "ordinal", title: "Definitie" },
          { field: "peiljaar", type: "ordinal", title: "Peiljaar" },
          { field: "bron", type: "ordinal", title: "Bron" },
        ],
      },
    },
    {
      mark: {
        type: "text",
        baseline: "middle",
        fontSize: 13,
      },
      encoding: {
        text: { field: "value", type: "nominal" },
        x: {
          field: "position",
          type: "quantitative",
        },
        y: {
          field: "gebied",
          type: "nominal",
        },
        color: {
          condition: {
            test: {
              field: "color",
              oneOf: ["#004699", "#787878", "#00A03C", "#FF0000"],
            },
            value: "#FFFFFF",
          },
          value: "#000000",
        },
      },
    },
  ],
};
