export const randomPokemons = (pokemons) => {
  const shuffled = [...pokemons];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

export const sortByAttack = (pokemons) =>
  [...pokemons].sort((a, b) => b.stats.attack - a.stats.attack);

export const sortByName = (pokemons) =>
  [...pokemons].sort((a, b) => a.name.localeCompare(b.name));
