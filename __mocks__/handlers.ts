import { http, HttpResponse } from 'msw';
import { MAIN_URL } from '../src/constants/constants';

export const handlers = [
  http.get(`${MAIN_URL}`, () => {
    return HttpResponse.json([
      {
        name: 'Bulbasaur',
        id: 1,
      },
      { name: 'Ivysaur', id: 2 },
    ]);
  }),
  http.get(`${MAIN_URL}/bulbasaur`, () => {
    return HttpResponse.json({
      name: 'Bulbasaur',
      id: 1,
    });
  }),
  http.get(`${MAIN_URL}/unknownpokemon`, () => {
    return new HttpResponse('no such pokemon', { status: 404 });
  }),
];
