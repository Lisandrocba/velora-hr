import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchPokemonByName, fetchPokemonPage } from "../api/getPokemons";
import { QUERY_MODE } from "../utils/pokemonTypeStyles";
import { fetchPokemonByType } from "../api/getTypes";

const LIMIT = 20;

const usePokemons = ({ mode, name, typeUrl }) => {
  const listQuery = useInfiniteQuery({
    queryKey: ["pokemons", "list"],
    queryFn: ({ pageParam = 0 }) => fetchPokemonPage(LIMIT, pageParam * LIMIT),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < LIMIT ? undefined : allPages.length,
    enabled: mode === QUERY_MODE.LIST,
  });

  const searchQuery = useQuery({
    queryKey: ["pokemons", "search", name],
    queryFn: () => fetchPokemonByName(name),
    enabled: mode === QUERY_MODE.SEARCH,
    retry: false,
  });

  const typeQuery = useQuery({
    queryKey: ["pokemons", "type", typeUrl],
    queryFn: () => fetchPokemonByType(typeUrl),
    enabled: mode === QUERY_MODE.TYPE,
  });

  const queryMap = {
    [QUERY_MODE.LIST]: listQuery,
    [QUERY_MODE.SEARCH]: searchQuery,
    [QUERY_MODE.TYPE]: typeQuery,
  };

  const activeQuery = queryMap[mode];

  return {
    data: activeQuery?.data,
    isLoading: activeQuery?.isLoading,
    isError: activeQuery?.isError,
    fetchNextPage: listQuery.fetchNextPage,
    hasNextPage: listQuery.hasNextPage,
  };
};

export default usePokemons;
