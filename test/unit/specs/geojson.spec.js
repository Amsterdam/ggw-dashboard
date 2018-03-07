import { rdToWgs84 } from '@/services/geojson'

describe('geojson', () => {

  it('should convert rd coordinates to wgs84 coordinates', () => {
    expect(rdToWgs84([52.35, 4.9])).toEqual([47.97482289341568, 3.31425581564696])
  })

  it('should convert an rd polygon to wgs84 polygon', () => {
    // expect(rdToWgs84(
    //   {
    //     'type': 'Polygon',
    //     'coordinates': [
    //       [
    //         [52, 4], [52, 5], [53, 5], [53, 4]
    //       ]
    //     ]
    //   }
    // )
    // ).toEqual([47.97482289341568, 3.31425581564696])
  })
})
