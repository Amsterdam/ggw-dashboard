export default {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  width: 400,
  height: 200,
  padding: 5,
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
  data: {
    values: [],
  },
  encoding: {
    x: {
      field: "x",
      type: "ordinal",
      axis: {
        labelAngle: 0,
        labelOverlap: "parity",
      },
      title: null,
    },
    y: {
      field: "y",
      type: "quantitative",
      title: null,
    },
    color: {
      field: "i",
      title: "",
      legend: {
        orient: "none",
        legendX: -35,
        legendY: -50,
        direction: "horizontal",
      },
      scale: { range: null },
    },
    tooltip: [
      { field: "y", type: "ordinal", title: "Waarde" },
      { field: "variable", type: "ordinal", title: "Label" },
      { field: "x", type: "ordinal", title: "Peiljaar" },
      { field: "bron", type: "ordinal", title: "Bron" },
    ],
    strokeDash: { field: "dash", type: "nominal", legend: null },
    strokeWidth: {
      condition: {
        test: {
          field: "dash",
          equal: true,
        },
        value: 0,
      },
    },
  },
  mark: {
    type: "line",
    point: true,
  },
};
