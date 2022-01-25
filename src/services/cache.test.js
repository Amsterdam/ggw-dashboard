import { cacheResponse } from './cache'

describe('cache', () => {
  it('should cache a value once', async () => {
    let getData = () => 'value'
    let value = await cacheResponse('key', getData)
    expect(value).toEqual('value')

    getData = () => 'another value'
    value = await cacheResponse('key', getData)
    expect(value).toEqual('value')
  })
})
