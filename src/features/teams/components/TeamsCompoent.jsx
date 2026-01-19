import useTeamStore from "../../../store/useTeamStore";
import {
  randomPokemons,
  sortByAttack,
  sortByName,
} from "../utils/oderPokemons";
import TeamPokemonList from "./TeamPokemonList";

const TeamsCompoent = () => {
  const { teams, reorderRandomPokemons } = useTeamStore();
  return (
    <>
      {teams.length > 0 ? (
        <div className="flex flex-col gap-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start gap-4"
            >
              <div className="flex flex-row w-full justify-between">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {team.name}
                </h2>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() =>
                      reorderRandomPokemons(team.id, randomPokemons)
                    }
                    className="bg-gray-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
                  >
                    Orden Aleatorio
                  </button>
                  <button
                    onClick={() => reorderRandomPokemons(team.id, sortByAttack)}
                    className="bg-gray-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
                  >
                    Mayor Ataque
                  </button>
                  <button
                    onClick={() => reorderRandomPokemons(team.id, sortByName)}
                    className="bg-gray-700 text-white px-4 py-2 rounded text-sm cursor-pointer"
                  >
                    Orden Alfabetico
                  </button>
                </div>
              </div>
              <div className="w-full flex flex-row flex-wrap gap-4 justify-center">
                <TeamPokemonList pokemons={team.pokemons} idTeam={team.id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-900 text-xl">No tienes equipos creados aún.</p>
      )}
    </>
  );
};

export default TeamsCompoent;
