import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import useTeamStore from "../../../store/useTeamStore";
import SortablePokemonCard from "./SorrtablePokemonCard";
import PokemonCard from "../../pokemon/components/PokemonCard";

const TeamPokemonList = ({ pokemons, idTeam }) => {
  const reorderPokemons = useTeamStore((s) => s.reorderPokemons);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = pokemons.findIndex((p) => p.id === active.id);
    const newIndex = pokemons.findIndex((p) => p.id === over.id);

    const newOrder = arrayMove(pokemons, oldIndex, newIndex);

    reorderPokemons(idTeam, newOrder);
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={pokemons.map((p) => p.id)}
        strategy={horizontalListSortingStrategy}
      >
        <div className="w-full flex flex-row flex-wrap gap-4 justify-center">
          {pokemons.map((pokemon) => (
            <SortablePokemonCard key={pokemon.id} id={pokemon.id}>
              <PokemonCard pokemon={pokemon} mode="view" />
            </SortablePokemonCard>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TeamPokemonList;
