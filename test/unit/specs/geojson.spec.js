import { rdToWgs84, rdPolygonToWgs84, rdMultiPolygonToWgs84 } from '@/services/geojson'

describe('geojson', () => {

  it('should convert rd coordinates to wgs84 coordinates', () => {
    expect(rdToWgs84([52.35, 4.9])).toEqual([47.97482289341568, 3.31425581564696])
  })

  it('should convert an rd polygon to wgs84 polygon', () => {
    const geometry = {
      'type': 'Polygon',
      'coordinates': [
        [
          [52, 4], [52, 5], [53, 5], [53, 4]
        ]
      ]
    }

    expect(rdPolygonToWgs84(geometry)).toEqual(
      {
        'type': 'Polygon',
        'coordinates': [
          [
            [47.97481472613053, 3.314251470198683],
            [47.97482370394713, 3.3142510989488123],
            [47.97482395323291, 3.3142644691581133],
            [47.9748149754163, 3.314264840405596]
          ]
        ]
      })
  })

  it('should check the type of an rd polygon', () => {
    const geometry = {
      'type': 'Something',
      'coordinates': [
        [
          [52, 4], [52, 5], [53, 5], [53, 4]
        ]
      ]
    }

    expect(rdPolygonToWgs84(geometry)).toEqual(undefined)
  })

  it('should convert an rd multipolygon to wgs84 polygon collection', () => {
    const geometry = {
      'type': 'MultiPolygon',
      'coordinates': [[
        [
          [52, 4], [52, 5], [53, 5], [53, 4]
        ]
      ]]
    }

    expect(rdMultiPolygonToWgs84(geometry)).toEqual(
      [{
        'type': 'Polygon',
        'coordinates': [
          [
            [47.97481472613053, 3.314251470198683],
            [47.97482370394713, 3.3142510989488123],
            [47.97482395323291, 3.3142644691581133],
            [47.9748149754163, 3.314264840405596]
          ]
        ]
      }])
  })

  it('should check the type of an rd multipolygon', () => {
    const geometry = {
      'type': 'Something',
      'coordinates': [[
        [
          [52, 4], [52, 5], [53, 5], [53, 4]
        ]
      ]]
    }

    expect(rdMultiPolygonToWgs84(geometry)).toEqual(undefined)
  })
})
