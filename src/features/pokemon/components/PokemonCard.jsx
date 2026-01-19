import { Sword, Shield, Lightning, Plus, Minus } from "phosphor-react";
import { POKEMON_TYPE_STYLES } from "../utils/pokemonTypeStyles";
import useTeamStore from "../../../store/useTeamStore";

const DEFAULT_TYPE_STYLE = {
  background: "bg-gray-100",
  title: "text-gray-700",
};

const PokemonCard = ({ pokemon, mode }) => {
  const mainType = pokemon.types?.[0];
  const { addPokemon, removePokemon } = useTeamStore();

  const typeStyles = POKEMON_TYPE_STYLES[mainType] || DEFAULT_TYPE_STYLE;

  return (
    <div
      className={`flex flex-col items-center border p-4 rounded ${typeStyles.background}`}
    >
      <h2 className={`text-2xl font-bold capitalize ${typeStyles.title}`}>
        {pokemon.name}
      </h2>

      <img src={pokemon.image} alt={pokemon.name} className="w-52" />

      <div className="flex flex-row gap-6 mt-4 bg-gray-300 px-8 py-4 rounded">
        <div className="flex flex-col items-center gap-2">
          <Sword size={32} weight="bold" title="Ataque" color="black" />
          <p className="text-xl font-bold text-gray-900">
            {pokemon.stats.attack}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Shield size={32} weight="bold" title="Defensa" color="black" />
          <p className="text-xl font-bold text-gray-900">
            {pokemon.stats.defense}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Lightning size={32} weight="bold" title="Velocidad" color="black" />
          <p className="text-xl font-bold text-gray-900">
            {pokemon.stats.speed}
          </p>
        </div>
      </div>
      {mode === "create" && (
        <button
          onClick={() => addPokemon(pokemon)}
          className="flex flex-col items-center p-2 rounded-4xl bg-gray-300 hover:bg-yellow-300 mt-4 cursor-pointer"
        >
          <Plus size={32} color="black" weight="bold" />
        </button>
      )}
      {mode === "teamDelete" && (
        <button
          onClick={() => removePokemon(pokemon.id)}
          className="flex flex-col items-center p-2 rounded-4xl bg-red-200 hover:bg-red-700 mt-4 cursor-pointer"
        >
          <Minus size={32} />
        </button>
      )}
    </div>
  );
};

export default PokemonCard;
