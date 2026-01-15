import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPokemonPage } from "../api/getPokemons";

const LIMIT = 20;

const usePokemons = () => {
  return useInfiniteQuery({
    queryKey: ["pokemons"],
    queryFn: ({ pageParam = 0 }) => fetchPokemonPage(LIMIT, pageParam * LIMIT),

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < LIMIT) return undefined;
      return allPages.length;
    },
  });
};

export default usePokemons;
