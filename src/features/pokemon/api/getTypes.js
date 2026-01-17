export async function fetchTypes() {
  const res = await fetch("https://pokeapi.co/api/v2/type");

  if (!res.ok) {
    throw new Error("Failed to fetch types");
  }

  const data = await res.json();

  return data.results.map((type) => ({
    name: type.name,
    url: type.url,
  }));
}

export async function fetchPokemonByType(typeUrl) {
  const res = await fetch(typeUrl);

  if (!res.ok) {
    throw new Error("Pokemon not found");
  }

  const data = await res.json();

  const detailedPokemons = await Promise.all(
    data.pokemon.map(async (item) => {
      const res = await fetch(item.pokemon.url);
      const detail = await res.json();

      return {
        id: detail.id,
        name: detail.name,
        image: detail.sprites.other["official-artwork"].front_default,
        types: detail.types.map((t) => t.type.name),
        stats: {
          attack: detail.stats.find((s) => s.stat.name === "attack").base_stat,
          defense: detail.stats.find((s) => s.stat.name === "defense")
            .base_stat,
          speed: detail.stats.find((s) => s.stat.name === "speed").base_stat,
        },
      };
    })
  );

  return detailedPokemons;
}
