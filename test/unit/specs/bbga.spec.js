import { getAllMeta, getMeta } from '../../../src/services/apis/bbga'

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
            indicatorDefinitieId: 'x'
          },
          {
            indicatorDefinitieId: 'x2'
          },
          {
            indicatorDefinitieId: 'x1'
          },
          {
            indicatorDefinitieId: 'y'
          }
        ]
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
