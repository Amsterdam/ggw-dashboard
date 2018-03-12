import util from '@/services/util'
import axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn((url) => {
    // console.log('get', url)

    const gebieden = {
      data: {
        _links: {
          next: {
            href: ''
          }
        },
        results: [
          {
            '_links': {
              'self': {
                'href': ''
              }
            },
            '_display': 'Bijlmer Centrum (DX20)',
            'code': 'DX20',
            'naam': 'Bijlmer Centrum',
            'dataset': 'gebieden'
          }
        ]
      }
    }

    const geometries = {
      data: {
        'type': 'FeatureCollection',
        'crs': {
          'type': 'name',
          'properties':
            {
              'name':
                'urn:ogc:def:crs:EPSG::28992'
            }
        },
        'features':
          [
            {
              'type': 'Feature',
              'properties': {
                'id': 'DX11',
                'code': 'DX11',
                'naam': 'Buitenveldert Zuidas',
                'display': 'Buitenveldert Zuidas',
                'type': 'gebieden/gebiedsgerichtwerken',
                'uri': 'https://api.data.amsterdam.nl/gebieden/gebiedsgerichtwerken/DX11/'
              },
              'geometry': {
                'type': 'Polygon',
                'coordinates': [
                  [
                    [120328.482, 484206.347],
                    [120341.033, 484206.943],
                    [120373.843, 484233.369],
                    [120527.75, 484348.116]
                  ]
                ]
              }
            }
          ]
      }
    }

    const meta = {
      data: {
        '_links': {
          'self': {
            'href': 'https://api.data.amsterdam.nl/bbga/meta/?page=1&page_size=5'
          },
          'next': {
            'href': ''
          },
          'previous': {
            'href': null
          }
        },
        'count': 747,
        'results': [
          {
            'id': 1,
            '_display': 'Meta object',
            'sort': '1',
            'thema': 'Bevolking',
            'variabele': 'BEVTOTAAL',
            'label': 'Bevolking totaal',
            'definitie': 'Personen die op 1 januari zijn opgenomen in het bevolkingsregister van de gemeente Amsterdam (inclusief briefadreshoudenden). Personen die niet legaal in Nederland verblijven worden buiten beschouwing gelaten.',
            'bron': 'Afd. Basisinformatie / OIS',
            'peildatum': '1  januari',
            'verschijningsfrequentie': '1 keer per jaar',
            'eenheid': 2,
            'groep': '',
            'format': 'F8.',
            'thema_kleurentabel': 'Bevolking',
            'kleurenpalet': 9,
            'minimum_aantal_inwoners': 0,
            'minimum_aantal_woningen': 0,
            'symbool': '',
            'legendacode': '3'
          }]
      }
    }

    const cijfers = {
      data: {
        '_links': {
          'self': {
            'href': 'https://api.data.amsterdam.nl/bbga/cijfers/?variabele=BEVTOTAAL&gebiedcode15=DX20&page=1&page_size=5'
          },
          'next': {
            'href': ''
          },
          'previous': {
            'href': null
          }
        },
        'count': 14,
        'results': [
          {
            'id': 84583,
            'jaar': 2018,
            'gebiedcode15': 'DX20',
            'variabele': 'BEVTOTAAL',
            'waarde': 25008.0
          }]
      }
    }

    if (url.includes('/gebieden/gebiedsgerichtwerken')) {
      return Promise.resolve(gebieden)
    } else if (url.includes('/maps/gebieden')) {
      return Promise.resolve(geometries)
    } else if (url.includes('/bbga/meta')) {
      return Promise.resolve(meta)
    } else if (url.includes('/bbga/cijfers')) {
      return Promise.resolve(cijfers)
    }

  })
}))

describe('util', () => {
  const gebied = {
    '_display': 'Bijlmer Centrum (DX20)',
    '_links': {'self': {'href': ''}},
    'code': 'DX20',
    'dataset': 'gebieden',
    'display': 'DX20 Bijlmer-Centrum',
    'gebiedType': 'Gebied',
    'naam': 'Bijlmer-Centrum',
    'vollcode': 'DX20',
    'volledige_code': 'DX20'
  }

  it('gets the max year from an array of cijfers', () => {
    const max = util.getMaxYear([
      {
        x: 1
      },
      {
        x: 3
      },
      {
        x: 2
      }
    ])
    expect(max).toEqual(3)
  })

  it('can get the (x,y) cijfers for a given dataset', () => {
    const data = [
      {
        label: 'label',
        cijfers: [
          {
            jaar: 'jaar',
            waarde: 'waarde',
            color: 'color'
          }
        ]
      }
    ]

    expect(util.getYearCijfers(data)).toEqual(
      [{
        'cijfer': {
          'color': 'color',
          'jaar': 'jaar',
          'waarde': 'waarde'
        },
        'color': 'color',
        'variable': 'label',
        'x': 'jaar',
        'y': 'waarde'
      }]
    )
  })

  it('can get the last n (x,y) cijfers for a given dataset', () => {
    const data = [1, 2, 3, 4, 5].map(i =>
      ({
        label: 'label',
        cijfers: [
          {
            jaar: i,
            waarde: i,
            color: i
          }
        ]
      })
    )

    expect(util.getYearCijfers(data, 2)).toEqual(
      [4, 5].map(i => ({
        'cijfer': {
          'color': i,
          'jaar': i,
          'waarde': i
        },
        'color': i,
        'variable': 'label',
        'x': i,
        'y': i
      })
    ))
  })

  it('can flatten arrays', () => {
    expect(util.flatten([1, [2, 3], 4])).toEqual([1, 2, 3, 4])
    expect(util.flatten([1, [2, [3]], 4])).toEqual([1, 2, 3, 4])
  })

  it('can get gebieden for a gebied type', async () => {
    expect(await util.getGwbs(util.GEBIED_TYPE.Gebied)).toEqual([gebied])
  })

  it('can get geometrieen for a gebied type', async () => {
    expect(await util.getGeometries(util.GEBIED_TYPE.Gebied)).toEqual(
      {
        'DX11': {
          'coordinates': [[[52.34467682273214, 4.87839903077145], [52.34468297083656, 4.878583148632961], [52.34492253805448, 4.879061899441137], [52.345963482181645, 4.881308663455767]]],
          'type': 'Polygon'
        }
      }
    )
  })

  it('can get the cijfers for a gebied given a configuration', async () => {
    const config = [
      {
        'label': 'Totaal',
        'variabele': 'Bevtotaal'
      }
    ]

    expect(await util.getConfigCijfers(gebied, config)).toMatchObject(
      [{
        'cijfers': [{'gebiedcode15': 'DX20', 'jaar': 2018, 'post': '', 'waarde': 25008}],
        'gebied': {
          '_display': 'Bijlmer Centrum (DX20)',
          '_links': {'self': {'href': ''}},
          'code': 'DX20',
          'dataset': 'gebieden',
          'display': 'DX20 Bijlmer-Centrum',
          'gebiedType': 'Gebied',
          'naam': 'Bijlmer-Centrum',
          'vollcode': 'DX20',
          'volledige_code': 'DX20'
        },
        'label': 'Totaal',
        'meta': {
          '_display': 'Meta object',
          'bron': 'Afd. Basisinformatie / OIS',
          'definitie': 'Personen die op 1 januari zijn opgenomen in het bevolkingsregister van de gemeente Amsterdam (inclusief briefadreshoudenden). Personen die niet legaal in Nederland verblijven worden buiten beschouwing gelaten.',
          'eenheid': 2,
          'format': 'F8.',
          'groep': '',
          'id': 1,
          'kleurenpalet': 9,
          'label': 'Bevolking totaal',
          'legendacode': '3',
          'minimum_aantal_inwoners': 0,
          'minimum_aantal_woningen': 0,
          'peildatum': '1  januari',
          'sort': '1',
          'symbool': '',
          'thema': 'Bevolking',
          'thema_kleurentabel': 'Bevolking',
          'variabele': 'BEVTOTAAL',
          'verschijningsfrequentie': '1 keer per jaar'
        },
        'recent': {'gebiedcode15': 'DX20', 'jaar': 2018, 'post': '', 'waarde': 25008}
      }])
  })

  it('can get the latest cijfers for a gebied given a configuration', async () => {
    const config = [
      {
        'label': 'Totaal',
        'variabele': 'Bevtotaal'
      }
    ]

    expect(await util.getLatestConfigCijfers(gebied, config)).toMatchObject(
      [{
        'cijfers': [{'gebiedcode15': 'DX20', 'jaar': 2018, 'post': '', 'waarde': 25008}],
        'gebied': {
          '_display': 'Bijlmer Centrum (DX20)',
          '_links': {'self': {'href': ''}},
          'code': 'DX20',
          'dataset': 'gebieden',
          'display': 'DX20 Bijlmer-Centrum',
          'gebiedType': 'Gebied',
          'naam': 'Bijlmer-Centrum',
          'vollcode': 'DX20',
          'volledige_code': 'DX20'
        },
        'label': 'Totaal',
        'meta': {
          '_display': 'Meta object',
          'bron': 'Afd. Basisinformatie / OIS',
          'definitie': 'Personen die op 1 januari zijn opgenomen in het bevolkingsregister van de gemeente Amsterdam (inclusief briefadreshoudenden). Personen die niet legaal in Nederland verblijven worden buiten beschouwing gelaten.',
          'eenheid': 2,
          'format': 'F8.',
          'groep': '',
          'id': 1,
          'kleurenpalet': 9,
          'label': 'Bevolking totaal',
          'legendacode': '3',
          'minimum_aantal_inwoners': 0,
          'minimum_aantal_woningen': 0,
          'peildatum': '1  januari',
          'sort': '1',
          'symbool': '',
          'thema': 'Bevolking',
          'thema_kleurentabel': 'Bevolking',
          'variabele': 'BEVTOTAAL',
          'verschijningsfrequentie': '1 keer per jaar'
        },
        'recent': {'gebiedcode15': 'DX20', 'jaar': 2018, 'post': '', 'waarde': 25008}
      }])
  })
})
