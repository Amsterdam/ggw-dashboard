import axios from 'axios'

import { readData, readPaginatedData } from '@/services/datareader'

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
    } else {
      return Promise.resolve(firstData)
    }
  })
}))

describe('datareader', () => {
  it('should read data given an url', async () => {
    const data = await readData('url')
    expect(axios.get).toBeCalledWith('url')
    expect(data.results).toEqual([1, 2])
  })

  it('should read paginated data given an url', async () => {
    const data = await readPaginatedData('url')
    expect(axios.get).toBeCalledWith('url')
    expect(data).toEqual([1, 2, 3, 4])
  })
})
