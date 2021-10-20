import { getAllMeta, getMeta } from '../../../src/services/apis/bbga'

jest.mock('axios', () => ({
  get: jest.fn(url => {
    const meta = {
      data: {
        _links: {
          next: {
            href: ''
          }
        },
        _embedded: {
          indicatoren_definities: [
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
    }
    return Promise.resolve(meta)
  })
}))

describe('BBGA', () => {
  it('should retrieve all available meta information', async () => {
    const meta = await getAllMeta()
    expect(Object.keys(meta).length).toEqual(4)
  })

  it('should return meta information given a variable name', async () => {
    const meta = await getMeta('x')
    expect(meta.indicatorDefinitieId).toEqual('x')
  })

  it('should return latest meta information given a variable name ending at [LATEST]', async () => {
    const meta = await getMeta('x[LATEST]')
    expect(meta.indicatorDefinitieId).toEqual('x2')
  })
})
