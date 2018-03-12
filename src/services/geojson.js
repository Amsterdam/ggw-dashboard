import L from 'leaflet'
import proj4 from 'proj4'
import 'proj4leaflet'

/**
 * The code is this module has been copied from Atlas
 * Unfortunately the code contains little or no comment.
 * Also it contains a lot of undocumented magic constants
 * No effort has been made to compensate for the lack of documentation
 * The code is included as is
 */

/**
 * rd coordinate system configuration
 */
const config = {
  rd: {
    code: 'EPSG:28992',
    projection: '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +' +
    'y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.3507326' +
    '76542563,-1.8703473836068,4.0812 +no_defs',
    transformation: {
      resolutions: [
        3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720,
        3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525
      ],
      bounds: [
        [-285401.92, 22598.08],
        [595301.9199999999, 903301.9199999999]
      ],
      origin: [-285401.92, 22598.08]
    }
  },
  wgs84: {
    code: 'EPSG:4326',
    projection: '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
  },
  earthRadius: 6378137 // The radius in meters
}

let rdSettings = config.rd
rdSettings.transformation.bounds = L.bounds.apply(null, rdSettings.transformation.bounds)

export const rd = new L.Proj.CRS(
  rdSettings.code,
  rdSettings.projection,
  rdSettings.transformation
)

rd.distance = L.CRS.Earth.distance
rd.R = config.EARTH_RADIUS

/**
 * Converts rd coordinates to wgs84 coordinates
 * @param rdCoordinates [x, y]
 * @returns {*[]}
 */
export function rdToWgs84 (rdCoordinates) {
  const wgs84Coordinates = proj4(config.rd.projection, config.wgs84.projection,
    [rdCoordinates[0], rdCoordinates[1]])
  return [
    wgs84Coordinates[1], wgs84Coordinates[0]
  ]
}

/**
 * Converts a rd polygon to a polygon with wgs84 coordinates
 * @param geometry
 * @returns {{type: string, coordinates: *[]}}
 */
export function rdPolygonToWgs84 (geometry) {
  if (geometry.type !== 'Polygon') {
    console.error('Error in geometry type, "Polygon" was expected', geometry.type)
    return
  }

  // {
  //   'type': 'Polygon',
  //   'coordinates': [
  //         [-99.028, 46.985], [-99.028, 50.979],
  //         [-82.062, 50.979], [-82.062, 47.002],
  //         [-99.028, 46.985]
  //       ]
  // }

  return {
    type: 'Polygon',
    coordinates: [
      geometry.coordinates[0].map(rdCoordinate => rdToWgs84(rdCoordinate))
    ]
  }
}

/**
 * Converts a rd encoded multi polygon to an array of ws84 polygons
 * @param geometry
 * @returns {*}
 */
export function rdMultiPolygonToWgs84 (geometry) {
  if (geometry.type !== 'MultiPolygon') {
    console.error('Error in geometry type, "MultiPolygon" was expected', geometry.type)
    return
  }

  // {
  //   'type': 'MultiPolygon',
  //   'coordinates': [
  //     [
  //       [
  //         [-99.028, 46.985], [-99.028, 50.979],
  //         [-82.062, 50.979], [-82.062, 47.002],
  //         [-99.028, 46.985]
  //       ]
  //     ],
  //     [
  //       [
  //         [-109.028, 36.985], [-109.028, 40.979],
  //         [-102.062, 40.979], [-102.062, 37.002],
  //         [-109.028, 36.985]
  //       ]
  //     ]
  //   ]
  // }

  const rdMultiPolygonCoordinates = geometry.coordinates
  const polygons = []

  rdMultiPolygonCoordinates.forEach(rdPolygonCoordinates => {
    rdPolygonCoordinates.forEach(rdCoordinateCollection => {
      polygons.push({
        type: 'Polygon',
        coordinates: [
          rdCoordinateCollection.map(rdCoordinate => rdToWgs84(rdCoordinate))
        ]
      })
    })
  })

  return polygons
}
