import kerncijfers from '../../../static/links/kerncijfers'
import { getKerncijfers } from '../../../src/services/thema'

describe('thema', () => {
  kerncijfers[0] = {
    'indicatorDefinitieId': 'XYZ',
    'thema': 'ABC',
    'volgorde': 1
  }
  kerncijfers[1] = {
    'indicatorDefinitieId': 'XYZ',
    'thema': 'ABC1',
    'volgorde': 2
  }
  kerncijfers[2] = {
    'indicatorDefinitieId': 'XYZ',
    'thema': 'ABC1',
    'volgorde': 1
  }

  it('should return the cijfers for a thema', async () => {
    expect(getKerncijfers('ABC')).toEqual([kerncijfers[0]])
  })

  it('should return the cijfers for a thema in the right order', async () => {
    expect(getKerncijfers('ABC1')).toEqual([kerncijfers[2], kerncijfers[1]])
  })
})
