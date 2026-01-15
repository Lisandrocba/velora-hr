export async function fetchPokemonPage(limit, offset) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );
  const data = await res.json();

  const detailedPokemons = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
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

export async function fetchPokemonByName(name) {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
  );

  if (!res.ok) {
    throw new Error("Pokemon not found");
  }

  const detail = await res.json();

  return [
    {
      id: detail.id,
      name: detail.name,
      image: detail.sprites.other["official-artwork"].front_default,
      types: detail.types.map((t) => t.type.name),
      stats: {
        attack: detail.stats.find((s) => s.stat.name === "attack").base_stat,
        defense: detail.stats.find((s) => s.stat.name === "defense").base_stat,
        speed: detail.stats.find((s) => s.stat.name === "speed").base_stat,
      },
    },
  ];
}
