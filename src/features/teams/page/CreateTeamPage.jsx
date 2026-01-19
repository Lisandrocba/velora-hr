import { useEffect } from "react";
import useTeamStore from "../../../store/useTeamStore";
import PokemonCard from "../../pokemon/components/PokemonCard";
import PokemonPage from "../../pokemon/page/PokemonPage";
import { useNavigate } from "react-router";

const CreateTeamPage = () => {
  let navigate = useNavigate();
  const {
    currentTeam,
    draftTeam,
    loadDraft,
    saveDraft,
    setTeamName,
    saveTeam,
    startNewTeam,
  } = useTeamStore();

  const hableSave = () => {
    const res = saveTeam();
    if (res !== false) {
      return navigate("/teams");
    }
  };

  useEffect(() => {
    if (draftTeam) {
      loadDraft();
    } else {
      startNewTeam();
    }
  }, []);

  useEffect(() => {
    saveDraft();
  }, [currentTeam]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Crear Nuevo Equipo 🆕
      </h1>
      <div className="flex flex-col items-start gap-8 bg-white rounded-lg shadow-md p-8">
        <div className="flex flex-col items-start">
          <h3 className="text-lg text-gray-900 font-semibold mb-4">
            Nombre del equipo
          </h3>
          <div className="flex flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Ingresa el nombre de tu equipo"
              className="border border-gray-300 p-2 rounded w-80 text-gray-900"
              value={currentTeam.name}
              onChange={(e) => setTeamName(e.target.value)}
            />
            <button
              onClick={hableSave}
              className="bg-gray-700 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-900 cursor-pointer"
            >
              Guardar Equipo
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start">
          <h3 className="text-lg text-gray-900 font-semibold mb-4">
            Pokemons en el equipo
          </h3>
          {currentTeam.pokemons.length > 0 ? (
            <div className="flex flex-nowrap gap-4 mb-4">
              {currentTeam.pokemons.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  mode="teamDelete"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-900">No has agregado Pokémones aún.</p>
          )}
        </div>
        <div className="flex flex-col justify-center items-start">
          <PokemonPage mode="create" />
        </div>
      </div>
    </div>
  );
};

export default CreateTeamPage;
