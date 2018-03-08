import { getShapes, getGWBShapes, drawShapes, amsMap } from '@/services/map'

describe('map', () => {

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
})
