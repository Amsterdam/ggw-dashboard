// import std from '../../../static/tmp/std'
// import { getColor, CATEGORY_COLORS } from '../../../src/services/colorcoding'

// describe('colorcoding', () => {
//   std[0] = {
//     'jaar': 2098,
//     'variabele': 'XYZ',
//     'gem': 123,
//     'SD': 456 // This one should not match
//   }
//   std[1] = {
//     'jaar': 2099,
//     'variabele': 'XYZ',
//     'gem': 0,
//     'SD': 1 // Make z-score even to value
//   }

//   it('should provide the correct category for a color', () => {
//     const meta = {
//       variabele: 'XYZ',
//       kleurenpalet: 9
//     }

//     expect(getColor(meta, 1, 2099).color).toEqual(CATEGORY_COLORS[0].color)
//     expect(getColor(meta, 0.5, 2099).color).toEqual(CATEGORY_COLORS[1].color)
//     expect(getColor(meta, 0, 2099).color).toEqual(CATEGORY_COLORS[2].color)
//     expect(getColor(meta, -0.5, 2099).color).toEqual(CATEGORY_COLORS[3].color)
//     expect(getColor(meta, -1, 2099).color).toEqual(CATEGORY_COLORS[4].color)
//   })

//   it('should provide the correct category for a kleurenpalet 2 color', () => {
//     const meta = {
//       variabele: 'XYZ',
//       kleurenpalet: 2
//     }

//     expect(getColor(meta, -1, 2099).color).toEqual(CATEGORY_COLORS[0].color)
//     expect(getColor(meta, -0.5, 2099).color).toEqual(CATEGORY_COLORS[1].color)
//     expect(getColor(meta, 0, 2099).color).toEqual(CATEGORY_COLORS[2].color)
//     expect(getColor(meta, 0.5, 2099).color).toEqual(CATEGORY_COLORS[3].color)
//     expect(getColor(meta, 1, 2099).color).toEqual(CATEGORY_COLORS[4].color)
//   })

//   it('should return undefined for an unknown variable', () => {
//     const meta = {
//       variabele: 'ABC',
//       kleurenpalet: 2
//     }

//     expect(getColor(meta, 0, 2099)).toEqual(undefined)
//   })

//   it('should return undefined for an unkown year', () => {
//     const meta = {
//       variabele: 'XYZ',
//       kleurenpalet: 2
//     }

//     expect(getColor(meta, 0, 2000)).toEqual(undefined)
//   })

//   it('should return undefined for a null value', () => {
//     const meta = {
//       variabele: 'XYZ',
//       kleurenpalet: 9
//     }

//     expect(getColor(meta, null, 2099)).toEqual(undefined)
//   })
// })
