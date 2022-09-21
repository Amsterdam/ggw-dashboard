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
          sort: null,
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
          { field: "gebiedNaam", type: "ordinal", title: "Gebied" },
          { field: "label", type: "ordinal", title: "Label" },
          { field: "value", type: "quantitative", title: "Waarde" },
        ],
      },
    },
    // TO-DO fix random sorting
    // {
    //   encoding: {
    //     text: {
    //       field: "current",
    //     },
    //     x: {
    //       field: "gebied",
    //       type: "ordinal",
    //     },
    //     y: {
    //       field: "value",
    //       type: "quantitative",
    //     },
    //   },
    //   mark: {
    //     type: "text",
    //     align: "left",
    //     dy: -15,
    //     opacity: 1,
    //     color: "black",
    //   },
    // },
  ],
};
