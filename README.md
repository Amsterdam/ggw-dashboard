# Gebiedsgericht Werken Dashboard

> A Vue.js project

## Requirements

### for development

    node >= 6.0
    npm >= 3.0
    
### for deployment

    docker
    docker-compose

## Build Setup, local development

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

```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deployment

docker-compose build

docker-compose up

The app is exposed at localhost:8080

## Static data
A few files are retrieved from OIS to cover for missing or erroneous data in any of the API's
This data is contained in the static/tmp folder

### std - reference data

The std file contains the averages and standard deviations for each BBGA variable at STAD level.
This file is refreshed at least every year.

When receiving a new file:
- Convert the new std file to json using a csv2json utility (e.g. https://www.csvjson.com/csv2json)
- Copy the std.json to static/tmp/std.json

### gebieden - Names of gebieden

The names of the gebieden is retrieved from static/tmp/gebieden.json.
If the name cannot be found in this document, the Gebieden API name is used.
The gebieden.json document has been constructed on the basis of a csv file received from OIS.

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

Static data is used to describe charts and visualisations and hold the icons that are used by the application.

## Tests

Unit tests are available for the services with a coverage of about 85% of all statements
The API services are tested for specific or complex behaviours only.
An example is the enhancement of gebieden, wijken and buurten for missing properties like code, vollcode and volledige code

## Styling

[to be added]
