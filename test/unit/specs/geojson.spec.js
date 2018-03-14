import { rdToWgs84, rdPolygonToWgs84, rdMultiPolygonToWgs84, toPrecision } from '@/services/geojson'

describe('geojson', () => {
  it('should round to 6 digits', () => {
    expect(toPrecision(1)).toEqual(1)
    expect(toPrecision(1.005, 2)).toEqual(1.01)
    expect(toPrecision(1.005, 3)).toEqual(1.005)
    expect(toPrecision(1.004, 2)).toEqual(1)
    expect(toPrecision(1.006, 2)).toEqual(1.01)
    expect(toPrecision(1.1234567, 6)).toEqual(1.123457)
  })

  it('should convert rd coordinates to wgs84 coordinates', () => {
    expect(rdToWgs84([52.35, 4.9])).toEqual([47.974823, 3.314256])
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
            [47.974815, 3.314251],
            [47.974824, 3.314251],
            [47.974824, 3.314264],
            [47.974815, 3.314265]
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
            [47.974815, 3.314251],
            [47.974824, 3.314251],
            [47.974824, 3.314264],
            [47.974815, 3.314265]
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
