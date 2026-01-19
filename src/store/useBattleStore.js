import { create } from "zustand";
import { battleEngine } from "../features/battle/utils/battleEngine";

const useBattleStore = create((set) => ({
  selectedTeams: {
    teamA: null,
    teamB: null,
  },

  battleRounds: [],
  battleResult: null,
  isBattleFinished: false,

  setTeamA: (team) =>
    set((state) => ({
      selectedTeams: {
        ...state.selectedTeams,
        teamA: team,
      },
    })),

  setTeamB: (team) => {
    set((state) => ({
      selectedTeams: {
        ...state.selectedTeams,
        teamB: team,
      },
    }));
  },
  startBattle: () => {
    const { teamA, teamB } = useBattleStore.getState().selectedTeams;

    if (!teamA || !teamB) return;

    const { rounds, result } = battleEngine(teamA.pokemons, teamB.pokemons);

    set({
      battleRounds: rounds,
      battleResult: result,
      isBattleFinished: true,
    });
  },

  resetBattle: () =>
    set({
      selectedTeams: { teamA: null, teamB: null },
      battleRounds: [],
      battleResult: null,
      isBattleFinished: false,
    }),
}));

export default useBattleStore;
