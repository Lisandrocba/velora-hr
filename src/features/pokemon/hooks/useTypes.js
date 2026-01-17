import { useQuery } from "@tanstack/react-query";
import { fetchTypes } from "../api/getTypes";

const useTypes = () => {
  return useQuery({
    queryKey: ["pokemon-types"],
    queryFn: fetchTypes,
    staleTime: 1000 * 60 * 60,
    cacheTime: 1000 * 60 * 60 * 24,
  });
};

export default useTypes;
