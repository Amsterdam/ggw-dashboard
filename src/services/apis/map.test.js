import { getGeometriesGeoJson } from './map'

describe('map', () => {
  it('should return all gebied types of stadsdelen', async () => {
    const result = await getGeometriesGeoJson("Stadsdeel");
    expect(result.features.length).toEqual(9);
  })

  it('should return all gebied types of gebieden', async () => {
    const result = await getGeometriesGeoJson("Gebied");
    expect(result.features.length).toEqual(22);
  })

  it('should return all gebied types of wijken', async () => {
    const result = await getGeometriesGeoJson("Wijk");
    expect(result.features.length).toEqual(107);
  })

  it('should return all gebied types of buurten', async () => {
    const result = await getGeometriesGeoJson("Buurt");
    expect(result.features.length).toEqual(500);
  })
})
