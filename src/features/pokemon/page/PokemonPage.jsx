import { useState } from "react";
import PokemonCard from "../components/PokemonCard";
import usePokemons from "../hooks/usePokemons";
import usePokemonSearch from "../hooks/usePokemonsSearch";
import { MagnifyingGlass } from "phosphor-react";

const PokemonPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const infiniteQuery = usePokemons();
  const searchQuery = usePokemonSearch(searchTerm);

  const isSearching = searchTerm.length > 0;

  const pokemons = isSearching
    ? searchQuery.data
    : infiniteQuery.data?.pages.flat();

  const isLoading = isSearching
    ? searchQuery.isLoading
    : infiniteQuery.isLoading;

  const isError = isSearching ? searchQuery.isError : infiniteQuery.isError;

  const handleSearch = () => {
    setSearchTerm(searchInput.trim().toLowerCase());
  };

  const handleClear = () => {
    setSearchInput("");
    setSearchTerm("");
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>No se encontraron pokémon</p>;

  return (
    <>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="border p-2 rounded w-80"
        />

        <button
          onClick={handleSearch}
          disabled={!searchInput.trim()}
          className="bg-blue-600 text-white px-4 rounded flex items-center justify-center disabled:opacity-50"
        >
          <MagnifyingGlass size={20} weight="bold" />
        </button>

        {isSearching && (
          <button
            onClick={handleClear}
            className="bg-gray-300 text-gray-800 px-4 rounded"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {pokemons?.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {!isSearching && infiniteQuery.hasNextPage && (
        <button
          onClick={() => infiniteQuery.fetchNextPage()}
          disabled={infiniteQuery.isFetchingNextPage}
          className="bg-gray-300 text-xl px-8 py-2 rounded mt-8"
        >
          {infiniteQuery.isFetchingNextPage ? "Cargando..." : "Ver más"}
        </button>
      )}
    </>
  );
};

export default PokemonPage;
