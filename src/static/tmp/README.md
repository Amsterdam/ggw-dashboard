# Temporary sources

## Gebieden

Or areas in `gebieden.json`, for lack of having a specific API endpoint, is an aggregation of data coming from https://api.data.amsterdam.nl/gebieden/stadsdeel/.

## Wijkgebied

Contents of `wijkgebied.json` is a combination of data coming from both https://api.data.amsterdam.nl/gebieden/wijk/ and https://api.data.amsterdam.nl/gebieden/stadsdeel/.

## Standard deviations

** Deprecated **
Contents of the file `std.json` is data that comes from [Basisbestand Gebieden Amsterdam (BBGA)](https://data.amsterdam.nl/datasets/G5JpqNbhweXZSw/) > Documentatie > BBGA stedelijk gemiddelde en standaardafwijking. The download is a CSV format and needs to be [transformed to JSON](https://www.csvjson.com/csv2json).

During the local development and testing cors issues might ocure because the application is making cors calls. We have used this chrome plugin as work-around for these issues `https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf/related`.
