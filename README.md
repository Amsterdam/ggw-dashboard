# Gebiedsgericht Werken Dashboard (Gebied in beeld)

- PROD: [https://gebiedinbeeld.amsterdam.nl](https://gebiedinbeeld.amsterdam.nl)
- ACC: [https://acc.gebiedinbeeld.amsterdam.nl](https://acc.gebiedinbeeld.amsterdam.nl)

## Requirements

### for development

    node >= 10.0
    npm >= 6.0

### for deployment

    docker
    docker-compose

## Build Setup, local development

    # install dependencies
    npm install

    # start with hot reload at localhost:3000
    npm run start

    # build for production with minification
    npm run build

    # build for production and view the bundle analyzer report
    npm run build --report

    # run unit tests
    npm run test

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deployment

    docker-compose build
    docker-compose up

The app is exposed at localhost:8080

### Docker tests

    cd test
    docker-compose build
    docker-compose run test-unit

## Static data

A few files are retrieved from OIS to cover for missing or erroneous data in any of the API's
This data is contained in the static/tmp folder

### wijkgebied - relation between wijken en gebieden

The gebieden API does not provide for getting wijken with in a gebied
Instead the wijken within the stadsdeel of the gebied are retrieved and filtered for being a wijk within the gebied
The wijkgebied.json has been constructed on the basis of a bbga_gebied_hierarchy csv-file of OIS.

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

The styling is done by using the stijl repository of Amsterdam.
