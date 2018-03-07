import L from 'leaflet'
import { getShapes, getGWBShapes, drawShapes, amsMap, tileLayer } from '@/services/map'

describe('map', () => {

  it('should provide for a tile layer', () => {
    expect(tileLayer()).toBeTruthy()
  })

  it('should provide for a map of Amsterdam', () => {
    document.body.innerHTML =
      '<div id="map">' +
      '</div>'
    const el = document.getElementById('map')
    expect(amsMap(el)).toBeTruthy()
  })

  it('can draw an empty collection of shapes on a map', () => {
    document.body.innerHTML =
      '<div id="map">' +
      '</div>'
    const el = document.getElementById('map')
    const map = amsMap(el)
    const shapes = []
    const layer = drawShapes(shapes, map)
    expect(layer).toBeTruthy()
  })

  it('can draw a collection of shapes on a map', () => {
    // document.body.innerHTML =
    //   '<div id="map">' +
    //   '</div>'
    // const el = document.getElementById('map')
    // const map = amsMap(el)
    // const shapes = [L.polygon(
    //   [
    //     [47.97481472613053, 3.314251470198683],
    //     [47.97482370394713, 3.3142510989488123],
    //     [47.97482395323291, 3.3142644691581133],
    //     [47.9748149754163, 3.314264840405596]
    //   ]
    // )]
    // const layer = drawShapes(shapes, map)
    // expect(layer).toBeTruthy()
  })
})
