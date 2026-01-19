export function battleEngine(teamA, teamB) {
  const rounds = [];
  let aIndex = 0;
  let bIndex = 0;

  while (aIndex < teamA.length && bIndex < teamB.length) {
    const a = teamA[aIndex];
    const b = teamB[bIndex];

    let winner;

    if (a.stats.speed > b.stats.speed) {
      winner = a.stats.attack > b.stats.defense ? "A" : "B";
    } else {
      winner = b.stats.attack > a.stats.defense ? "B" : "A";
    }

    rounds.push({
      pokemonA: a.name,
      pokemonB: b.name,
      winner,
    });

    winner === "A" ? bIndex++ : aIndex++;
  }

  const result = {
    teamAWins: teamA.length - aIndex,
    teamBWins: teamB.length - bIndex,
  };

  return { rounds, result };
}
