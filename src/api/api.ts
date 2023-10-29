export const getPokemonsFromAPI = async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/');
  try {
    return response.json();
  } catch {
    throw new Error();
  }
};

export const getPokemonByName = async (name: string) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);

  if (!response.ok) {
    throw new Error(`Error fetching Pokemon with name ${name}: ${response.statusText}`);
  }

  return response.json();
};
