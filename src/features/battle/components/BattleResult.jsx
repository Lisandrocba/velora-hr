const BattleResult = ({ isBattleFinished, battleResult, battleRounds }) => {
  if (!isBattleFinished || !battleResult) return null;

  return (
    <div className="mt-8 space-y-6">
      <div className="bg-linear-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          🏆 ¡Resultado del Combate!
        </h2>
        {battleResult.teamAWins === battleResult.teamBWins ? (
          <p className="text-lg text-white">Empate entre ambos equipos</p>
        ) : (
          <p className="text-lg text-white">
            {battleResult.teamAWins > battleResult.teamBWins
              ? `Ganador: Equipo A (${
                  battleResult.teamAWins - battleResult.teamBWins
                } victorias de diferencia)`
              : `Ganador: Equipo B (${
                  battleResult.teamBWins - battleResult.teamAWins
                } victorias de diferencia)`}
          </p>
        )}
      </div>

      {battleRounds.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Rondas del Combate
          </h3>
          <div className="space-y-3">
            {battleRounds.map((round, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4">
                <p className="font-medium text-gray-900">
                  Ronda {index + 1}: {round.pokemonA} vs {round.pokemonB} -
                  ganador{" "}
                  {round.winner === "A"
                    ? round.pokemonA
                    : round.winner === "B"
                    ? round.pokemonB
                    : "Empate"}
                </p>
                <p className="text-sm text-gray-600">{round.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BattleResult;
