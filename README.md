# Gebiedsgericht Werken Dashboard

> A Vue.js project

## Requirements

    node >= 6.0
    npm >= 3.0

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deployment

docker-compose build
docker-compose up dashboard

The app is exposed at localhost:8080

## Update for std file (referenties)

Convert the new std file to json using a csv2json utility (e.g. https://www.csvjson.com/csv2json)
Copy the std.json to static/tmp/std.json

## Names of gebieden

The names of the gebieden is retrieved from static/tmp/gebieden.json.
This file has been constructed on the basis of a csv file received from OIS.

## General structure of the app

The chart components are located in components/charts
The dashboards are located in components/dashboards
The general page layout in contained in components/layout
Some isolated components are (still) contained in the root of /components

The services to connect to the different API's (gebieden, cijfers en map data) are contained in the services/apis folder.

Caching is performed to enhance the overall application performance.
The (simple) logic is contained in the cache services

Geojson and map services handle the logic around Leaflet and geometries (rd to lat-lon).

The colorcoding service handles the logic around reference coloring of cijfers by comparing these to the Amsterdam average by computing z-scores.

Gebied, wijk, buurt and theme are stored in the state
The GGW selector component updates the url according to the state when any of the state date changes.

Static date is used to describe charts and visualisations and hold the icons that are used by the application.

Styling is performed in 4 steps:
- ams.scss for the Amsterdam style guide
- ams-bootstrap.scss for the Amsterdam styling of bootstrap components
- ams-ois.scss for OIS specific styling
- app.scss for any remaining styling

Occassionally local component (scoped) styling is used, but the usage is kept as limited as possible.
