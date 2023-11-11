import { http, HttpResponse } from 'msw';

const mainUrl = 'https://pokeapi.co/api/v2/pokemon';

export const handlers = [
  http.get(`${mainUrl}`, () => {
    return HttpResponse.json({
      name: 'Bulbasaur',
      id: 1,
    });
  }),
];
