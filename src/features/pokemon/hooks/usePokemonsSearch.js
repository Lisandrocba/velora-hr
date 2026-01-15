import { useQuery } from "@tanstack/react-query";
import { fetchPokemonByName } from "../api/getPokemons";

const usePokemonSearch = (name) => {
  return useQuery({
    queryKey: ["pokemon-search", name],
    queryFn: () => fetchPokemonByName(name),
    enabled: !!name,
    retry: false,
  });
};

export default usePokemonSearch;
