import { getColor, CATEGORY_COLORS } from '../../../src/services/colorcoding'

describe('colorcoding', () => {
  const std = []
  std[0] = {
    jaar: 2098,
    indicatorDefinitieId: 'XYZ',
    gemiddelde: 123,
    standaardafwijking: 456 // This one should not match
  }
  std[1] = {
    jaar: 2099,
    indicatorDefinitieId: 'XYZ',
    gemiddelde: 0,
    standaardafwijking: 1 // Make z-score even to value
  }

  it('should provide the correct category for a color', () => {
    const meta = {
      indicatorDefinitieId: 'XYZ',
      kleurenpalet: 9
    }

    expect(getColor(meta, 1, 2099, std).color).toEqual(CATEGORY_COLORS[0].color)
    expect(getColor(meta, 0.5, 2099, std).color).toEqual(
      CATEGORY_COLORS[1].color
    )
    expect(getColor(meta, 0, 2099, std).color).toEqual(CATEGORY_COLORS[2].color)
    expect(getColor(meta, -0.5, 2099, std).color).toEqual(
      CATEGORY_COLORS[3].color
    )
    expect(getColor(meta, -1, 2099, std).color).toEqual(
      CATEGORY_COLORS[4].color
    )
  })

  it('should provide the correct category for a kleurenpalet 2 color', () => {
    const meta = {
      indicatorDefinitieId: 'XYZ',
      kleurenpalet: 2
    }

    expect(getColor(meta, -1, 2099, std).color).toEqual(
      CATEGORY_COLORS[0].color
    )
    expect(getColor(meta, -0.5, 2099, std).color).toEqual(
      CATEGORY_COLORS[1].color
    )
    expect(getColor(meta, 0, 2099, std).color).toEqual(CATEGORY_COLORS[2].color)
    expect(getColor(meta, 0.5, 2099, std).color).toEqual(
      CATEGORY_COLORS[3].color
    )
    expect(getColor(meta, 1, 2099, std).color).toEqual(CATEGORY_COLORS[4].color)
  })

  it('should return undefined for an unknown variable', () => {
    const meta = {
      indicatorDefinitieId: 'ABC',
      kleurenpalet: 2
    }

    expect(getColor(meta, 0, 2099, std)).toEqual(undefined)
  })

  it('should return undefined for an unkown year', () => {
    const meta = {
      indicatorDefinitieId: 'XYZ',
      kleurenpalet: 2
    }

    expect(getColor(meta, 0, 2000, std)).toEqual(undefined)
  })

  it('should return undefined for a null value', () => {
    const meta = {
      indicatorDefinitieId: 'XYZ',
      kleurenpalet: 9
    }

    expect(getColor(meta, null, 2099, std)).toEqual(undefined)
  })
})
