import { GEBIED_TYPE, getGebiedType, enhanceGWB, getKeyFromUrl } from '../../../src/services/apis/gebieden'
import gebiedscodes from '../../../static/tmp/gebieden'

jest.mock('axios', () => ({
  get: jest.fn((url) => {
    const meta = {
      data: {
        _links: {
          next: {
            href: ''
          }
        },
        results: [
          {
            variabele: 'x'
          },
          {
            variabele: 'x2'
          },
          {
            variabele: 'x1'
          },
          {
            variabele: 'y'
          }
        ]
      }
    }
    return Promise.resolve(meta)
  })
}))

describe('Gebieden API', () => {
  it('should get the gebied type for a given gebiedcode', () => {
    expect(getGebiedType('')).toEqual('?')

    expect(getGebiedType('A')).toEqual(GEBIED_TYPE.Stadsdeel)
    expect(getGebiedType('a')).toEqual('?a')
    expect(getGebiedType('A1')).toEqual('?A1')

    expect(getGebiedType('DX01')).toEqual(GEBIED_TYPE.Gebied)
    expect(getGebiedType('DX011')).toEqual('?DX011')
    expect(getGebiedType('DXA1')).toEqual('?DXA1')

    expect(getGebiedType('D01')).toEqual(GEBIED_TYPE.Wijk)
    expect(getGebiedType('D011')).toEqual('?D011')
    expect(getGebiedType('DA1')).toEqual('?DA1')

    expect(getGebiedType('D01a')).toEqual(GEBIED_TYPE.Buurt)
    expect(getGebiedType('d01a')).toEqual('?d01a')
    expect(getGebiedType('D01A')).toEqual('?D01A')
    expect(getGebiedType('DA1a')).toEqual('?DA1a')

    expect(getGebiedType('STAD')).toEqual(GEBIED_TYPE.Stad)
    expect(getGebiedType('Stad')).toEqual('?Stad')
    expect(getGebiedType('stad')).toEqual('?stad')
    expect(getGebiedType('STAD1')).toEqual('?STAD1')
  })

  it('should compensate for API inconsistencies and missing properties', () => {
    expect(gebiedscodes[0].gebiedcode).toEqual('STAD') // is used for testing results
    const g = gebiedscodes[0]
    const t = getGebiedType(g.gebiedcode)

    expect(() => enhanceGWB({})).toThrow()

    expect(enhanceGWB({vollcode: 'x'}).vollcode).toEqual('x')
    expect(enhanceGWB({volledige_code: 'x'}).vollcode).toEqual('x')
    expect(enhanceGWB({_display: '(x)'}).vollcode).toEqual('x')
    expect(() => enhanceGWB({_display: '(x) '})).toThrow()

    expect(() => enhanceGWB({code: 'x'}).code).toThrow()
    expect(enhanceGWB({vollcode: 'x', code: 'y'}).code).toEqual('y')

    expect(enhanceGWB({volledige_code: 'x'}).volledige_code).toEqual('x')
    expect(enhanceGWB({vollcode: 'x'}).volledige_code).toEqual('x')
    expect(enhanceGWB({vollcode: 'x', volledige_code: 'y'}).volledige_code).toEqual('y')

    expect(enhanceGWB({vollcode: 'STAD'}).gebiedType).toEqual(t)
    expect(enhanceGWB({volledige_code: 'STAD'}).gebiedType).toEqual(t)

    expect(enhanceGWB({vollcode: 'STAD'}).naam).toEqual(g.gebiednaam)
    expect(enhanceGWB({volledige_code: 'STAD'}).naam).toEqual(g.gebiednaam)
    expect(enhanceGWB({vollcode: 'XYZ', naam: 'ABC'}).naam).toEqual('ABC')

    expect(enhanceGWB({vollcode: 'STAD'}).display).toEqual(g.gebiedcodenaam)
    expect(enhanceGWB({vollcode: 'XYZ', naam: 'ABC'}).display).toEqual('XYZ ABC')
  })

  it('should get the key of a gwb', () => {
    expect(getKeyFromUrl('abc/123/')).toEqual('123')
  })
})
