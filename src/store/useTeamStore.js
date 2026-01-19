import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_TEAM_SIZE = 6;

const useTeamStore = create(
  persist(
    (set, get) => ({
      teams: [],
      currentTeam: {
        id: null,
        name: "",
        pokemons: [],
      },
      draftTeam: null,

      startNewTeam: () =>
        set({
          currentTeam: {
            id: crypto.randomUUID(),
            name: "",
            pokemons: [],
          },
          draftTeam: null,
        }),

      setTeamName: (name) =>
        set((state) => ({
          currentTeam: {
            ...state.currentTeam,
            name,
          },
        })),

      addPokemon: (pokemon) => {
        const { currentTeam } = get();

        if (currentTeam.pokemons.length >= MAX_TEAM_SIZE)
          return toast.error("El equipo ya tiene 6 Pokémones.");

        const pokemonExists = currentTeam.pokemons.some(
          (p) => p.id === pokemon.id
        );

        if (pokemonExists) {
          return toast.error(`${pokemon.name} ya se encuentra en el equipo.`);
        }

        set({
          currentTeam: {
            ...currentTeam,
            pokemons: [...currentTeam.pokemons, pokemon],
          },
        });

        toast.success(`${pokemon.name} agregado al equipo!`);
      },

      removePokemon: (pokemonId) =>
        set((state) => ({
          currentTeam: {
            ...state.currentTeam,
            pokemons: state.currentTeam.pokemons.filter(
              (p) => p.id !== pokemonId
            ),
          },
        })),

      reorderPokemons: (teamId, pokemons) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId ? { ...team, pokemons } : team
          ),
        })),

      reorderRandomPokemons: (teamId, reorderFn) =>
        set((state) => ({
          teams: state.teams.map((team) =>
            team.id === teamId
              ? { ...team, pokemons: reorderFn(team.pokemons) }
              : team
          ),
        })),

      saveTeam: () => {
        const { teams, currentTeam } = get();

        if (!currentTeam.name || currentTeam.pokemons.length !== 6) {
          toast.error(
            "El equipo debe tener un nombre y 6 Pokémones para ser guardado."
          );
          return false;
        }

        set({
          teams: [...teams, currentTeam],
          currentTeam: {
            id: null,
            name: "",
            pokemons: [],
          },
          draftTeam: null,
        });
      },

      saveDraft: () => {
        const { currentTeam } = get();

        if (currentTeam.pokemons.length === 0) return;

        set({
          draftTeam: currentTeam,
        });
      },

      loadDraft: () =>
        set((state) => ({
          currentTeam: state.draftTeam,
        })),

      discardDraft: () =>
        set({
          draftTeam: null,
        }),
    }),
    {
      name: "pokemon-team-store",
      partialize: (state) => ({
        teams: state.teams,
        draftTeam: state.draftTeam,
      }),
    }
  )
);

export default useTeamStore;
