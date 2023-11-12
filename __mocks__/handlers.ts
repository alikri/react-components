import { http, HttpResponse } from 'msw';

export const mainUrl = 'https://pokeapi.co/api/v2/pokemon';

export const handlers = [
  http.get(`${mainUrl}`, () => {
    return HttpResponse.json({
      name: 'Bulbasaur',
      id: 1,
    });
  }),
  http.get(`${mainUrl}/unknownpokemon`, () => {
    return new HttpResponse('no such pokemon', { status: 404 });
  }),
];
