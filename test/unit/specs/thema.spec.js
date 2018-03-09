import kerncijfers from '../../../static/tmp/kerncijfers'
import { getKerncijfers } from '@/services/thema'

describe('thema', () => {
  kerncijfers[0] = {
    'variabele': 'XYZ',
    'thema': 'ABC',
    'volgorde': 1
  }
  kerncijfers[1] = {
    'variabele': 'XYZ',
    'thema': 'ABC1',
    'volgorde': 2
  }
  kerncijfers[2] = {
    'variabele': 'XYZ',
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
