import PokemonCard from "../components/PokemonCard";
import usePokemons from "../hooks/usePokemons";
import { MagnifyingGlass } from "phosphor-react";
import useTypes from "../hooks/useTypes";
import Select from "../components/Select";
import useFiltersStore from "../../../store/useFilterStore";

const PokemonPage = ({ mode }) => {
  const {
    searchInput,
    searchTerm,
    selectedType,
    isSearching,
    setSearchInput,
    executeSearch,
    setSelectedType,
    clearFilters,
    clearSearch,
  } = useFiltersStore();

  const infiniteQuery = usePokemons({
    mode: selectedType ? "type" : searchTerm ? "search" : "list",
    name: searchTerm,
    typeUrl: selectedType,
  });

  const { data } = useTypes();

  const isFilterActive = isSearching() || selectedType;

  const pokemons = isFilterActive
    ? infiniteQuery.data
    : infiniteQuery.data?.pages.flat();

  const handleSearch = () => {
    executeSearch();
    setSelectedType("");
  };

  const handleTypeChange = (typeUrl) => {
    setSelectedType(typeUrl);
    clearSearch();
  };

  const handleClear = () => {
    clearFilters();
  };

  if (infiniteQuery.isLoading)
    return <p className="text-gray-900">Cargando...</p>;
  if (infiniteQuery.isError)
    return <p className="text-gray-900">No se encontraron pokémon</p>;

  return (
    <div className="">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Pokédex</h1>

      <div className="flex gap-2 mb-6">
        <div className="flex flex-row justify-between items-end p-0 w-full">
          <div className="flex flex-row gap-2 h-fit">
            <input
              type="text"
              placeholder="Buscar Pokémon..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border border-gray-300 p-2 rounded w-80 text-gray-900"
            />
            <button
              onClick={handleSearch}
              disabled={!searchInput.trim()}
              className="bg-yellow-300 text-gray-800 px-4 rounded flex items-center justify-center disabled:opacity-50 cursor-pointer"
            >
              <MagnifyingGlass size={20} weight="bold" />
            </button>
            {isFilterActive && (
              <button
                onClick={handleClear}
                className="px-4 rounded cursor-pointer bg-gray-800 text-white"
              >
                Limpiar
              </button>
            )}
          </div>
          <div className="flex flex-row gap-2">
            <Select
              label="Tipo"
              options={
                data?.map((type) => ({ value: type.url, label: type.name })) ||
                []
              }
              value={selectedType}
              onChange={handleTypeChange}
              placeholder="Seleccione un tipo"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {pokemons?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} mode={mode} />
        ))}
      </div>

      {!isFilterActive && infiniteQuery.hasNextPage && (
        <button
          onClick={() => infiniteQuery.fetchNextPage()}
          disabled={infiniteQuery.isFetchingNextPage}
          className="bg-gray-800 text-xl px-8 py-2 rounded mt-8 cursor-pointer"
        >
          {infiniteQuery.isFetchingNextPage ? "Cargando..." : "Ver más"}
        </button>
      )}
    </div>
  );
};

export default PokemonPage;
