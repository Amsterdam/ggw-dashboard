export default {
  $schema: "https://vega.github.io/schema/vega/v5.json",
  width: 350,
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
  data: [
    {
      name: "table",
      values: [{}],
    },
  ],
  scales: [
    {
      name: "x",
      type: "point",
      range: "width",
      domain: {
        data: "table",
        field: "x",
      },
    },
    {
      name: "y",
      type: "linear",
      range: "height",
      nice: true,
      zero: true,
      domain: {
        data: "table",
        field: "y",
      },
    },
    {
      name: "variable",
      type: "ordinal",
      range: "category",
      domain: {
        data: "table",
        field: "variable",
      },
    },
  ],
  legends: [
    {
      fill: "variable",
      title: "",
      orient: "none",
      legendX: -40,
      legendY: -60,
      direction: "horizontal",
      encode: {
        symbols: {
          enter: {
            shape: {
              value: "square",
            },
          },
        },
      },
    },
  ],
  axes: [
    {
      orient: "bottom",
      scale: "x",
      labelBound: true,
      labelOverlap: "parity",
    },
    {
      orient: "left",
      scale: "y",
    },
  ],
  marks: [
    {
      type: "group",
      from: {
        facet: {
          name: "series",
          data: "table",
          groupby: "variable",
        },
      },
      marks: [
        {
          type: "line",
          from: {
            data: "series",
          },
          encode: {
            enter: {
              x: {
                scale: "x",
                field: "x",
              },
              y: {
                scale: "y",
                field: "y",
              },
              stroke: {
                scale: "variable",
                field: "variable",
              },
              strokeWidth: 2,
              strokeDash: [
                {
                  test: "datum.dash",
                  value: [4, 4],
                },
                {
                  value: [1, 0],
                },
              ],
            },
            update: {
              interpolate: {
                value: "natural",
              },
              fillOpacity: {
                value: 1,
              },
            },
            hover: {
              fillOpacity: {
                value: 1,
              },
            },
          },
        },
      ],
    },
  ],
};