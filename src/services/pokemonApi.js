const API_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(signal) {
  const response = await fetch(`${API_URL}/pokemon?limit=151`, { signal });

  if (!response.ok) {
    throw new Error("No se ha podido obtener la lista de Pokémon.");
  }

  return response.json();
}

export async function getPokemonDetails(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error("No se han podido obtener los detalles del Pokémon.");
  }

  return response.json();
}
