import axios from 'axios'

import { readData, readPaginatedData, HTTPStatus } from '../../../src/services/datareader'

const mockData = {
  x: 0
}

jest.mock('axios', () => ({
  get: jest.fn((url) => {
    const firstData = {
      data: {
        _links: {
          next: {
            href: '_links.next.href'
          }
        },
        results: [1, 2]
      }
    }

    const lastData = {
      data: {
        _links: {
          next: {
            href: ''
          }
        },
        results: [3, 4]
      }
    }

    if (url.includes('page=2')) {
      return Promise.resolve(lastData)
    } else if (url === 'retry') {
      throw new Error('fail')
    } else if (url === 'retry-n') {
      mockData.x -= 1
      if (mockData.x > 0) {
        throw new Error('fail')
      } else {
        return Promise.resolve(firstData)
      }
    } else {
      return Promise.resolve(firstData)
    }
  })
}))

describe('datareader', async () => {
  beforeEach(() => {
    HTTPStatus.error = 0
    HTTPStatus.success = 0
    HTTPStatus.pending = 0
    axios.get.mockClear()
  })

  it('should retry reading data', async () => {
    global.console.error = jest.fn()
    let data
    try {
      data = await readData('retry')
    } catch (error) {
      expect(data).toEqual(undefined)
    }
    expect(axios.get).toBeCalledWith('retry')
    expect(axios.get).toHaveBeenCalledTimes(5)
    expect(global.console.error).toHaveBeenCalledTimes(6)

    expect(HTTPStatus.error).toEqual(1)
    expect(HTTPStatus.pending).toEqual(0)
    expect(HTTPStatus.success).toEqual(0)

    global.console.error.mockRestore()
  })

  it('should retry n times reading data', async () => {
    mockData.x = 3
    let data
    try {
      data = await readData('retry-n')
    } catch (error) {
      expect(data).toEqual(undefined) // should not occur
    }
    expect(axios.get).toBeCalledWith('retry-n')
    expect(axios.get).toHaveBeenCalledTimes(3)
    expect(data.results).toEqual([1, 2])

    expect(HTTPStatus.error).toEqual(0)
    expect(HTTPStatus.pending).toEqual(0)
    expect(HTTPStatus.success).toEqual(1)
  })

  it('should read data given an url', async () => {
    const data = await readData('url')
    expect(axios.get).toBeCalledWith('url')
    expect(data.results).toEqual([1, 2])

    expect(HTTPStatus.error).toEqual(0)
    expect(HTTPStatus.pending).toEqual(0)
    expect(HTTPStatus.success).toEqual(1)
  })

  it('should read paginated data given an url', async () => {
    const data = await readPaginatedData('url')
    expect(axios.get).toBeCalledWith('url?page=1&page_size=1000')
    expect(axios.get).toBeCalledWith('url?page=2&page_size=1000')
    expect(data).toEqual([1, 2, 3, 4])

    expect(HTTPStatus.error).toEqual(0)
    expect(HTTPStatus.pending).toEqual(0)
    expect(HTTPStatus.success).toEqual(2)
  })
})
