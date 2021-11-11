export default {
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "",
  "height": 125,
  "width": 300,
  "data": {
    "values": []
  },
  "config": {
    "style": {
      "cell": {
        "stroke": "transparent"
      }
    },
    "axis": {
      "labelFontSize": 12,
      "labelLimit": 100,
      "labelFont": "Avenir Next"
    },
    "legend": {
      "labelFontSize": 12,
      "columns": 4,
      "labelFont": "Avenir Next"
    },
    "title": {
      "font": "Avenir Next"
    }
  },
  "layer": [
    {
      "mark": {
        "type": "bar",
        "color": { "expr": "datum.color ? datum.color : '#eeeeee' " }
      },
      "encoding": {
        "y": {
          "field": "value",
          "type": "quantitative",
          
          "axis": {
            "title": null,
            "tickCount": 5,
            "offset": 5
          }
        },
        "x": {
          "field": "key",
          "type": "ordinal",
          "sort": null,
          "axis": {
            "labels": true,
            "labelPadding": 5,
            "ticks": false,
            "title": null
          }
        }
      }
    },
    {
      "encoding": {
        "x": {
          "field": "key",
          "type": "ordinal"
        },
        "y": {
          "field": "gemiddelde",
          "type": "quantitative"
        }
      },
      "mark": {
        "type": "line",
        "color": "#EC0000"
      }
    },
    {
      "encoding": {
        "text": {
          "field": "value",
          "type": "quantitative",
          "formatType": "number"
        },
        "x": {
          "field": "key",
          "type": "ordinal"
        },
        "y": {
          "field": "value",
          "type": "quantitative"
        }
      },
      "mark": {
        "type": "text",
        "align": "center",
        "dy": 10,
        "opacity": { "expr": "datum.value <= 999 ? 1 : 0 " },
        "color": { "expr": "datum.textColor ? datum.textColor : '#000000'" }
      }
    },
    {
      "encoding": {
        "text": {
          "field": "value",
          "type": "quantitative",
          "format": ".3s",
          "formatType": "number"
        },
        "x": {
          "field": "key",
          "type": "ordinal"
        },
        "y": {
          "field": "value",
          "type": "quantitative"
        }
      },
      "mark": {
        "type": "text",
        "align": "center",
        "dy": 10,
        "opacity": { "expr": "datum.value > 999 ? 1 : 0 " },
        "color": { "expr": "datum.textColor ? datum.textColor : '#000000'" }
      }
    },
    {
      "encoding": {
        "text": {
          "field": "gemiddelde",
          "type": "quantitative",
          "format": ",.2r",
          "formatType": "number"
        },
        "x": {
          "field": "key",
          "type": "ordinal"
        },
        "y": {
          "field": "gemiddelde",
          "type": "quantitative"
        }
      },
      "mark": {
        "type": "text",
        "align": "left",
        "color": "#EC0000",
        "baseline": "middle",
        "dx": 20,
        "opacity": { "expr": "datum.last ? 1 : 0 " }
      }
    }
  ]
}
