import useBattleStore from "../../../store/useBattleStore";
import useTeamStore from "../../../store/useTeamStore";
import BattleResult from "../components/BattleResult";
import TeamDisplay from "../components/TeamDisplay";

const BattlePage = () => {
  const { teams } = useTeamStore();

  const {
    selectedTeams,
    setTeamA,
    setTeamB,
    startBattle,
    resetBattle,
    battleRounds,
    battleResult,
    isBattleFinished,
  } = useBattleStore();

  const handleSelectTeamA = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    setTeamA(team);
  };

  const handleSelectTeamB = (teamId) => {
    const team = teams.find((t) => t.id === teamId);
    setTeamB(team);
  };

  const isBattleDisabled =
    !selectedTeams.teamA ||
    !selectedTeams.teamB ||
    selectedTeams.teamA.id === selectedTeams.teamB.id;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        Seleccionar equipos para el combate ⚔️
      </h1>

      <div className="flex gap-6 mb-8">
        <div className="flex flex-col gap-2 flex-1">
          <label className="font-semibold text-gray-900">Equipo A</label>
          <select
            value={selectedTeams.teamA?.id || ""}
            onChange={(e) => handleSelectTeamA(e.target.value)}
            className="border rounded p-2 border-gray-300 text-gray-900"
          >
            <option value="" disabled>
              Seleccioná un equipo
            </option>

            {teams.map((team) => (
              <option
                key={team.id}
                value={team.id}
                disabled={team.id === selectedTeams.teamB?.id}
              >
                {team.name}
              </option>
            ))}
          </select>
          <TeamDisplay team={selectedTeams.teamA} title="Equipo A" />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label className="font-semibold text-gray-900">Equipo B</label>
          <select
            value={selectedTeams.teamB?.id || ""}
            onChange={(e) => handleSelectTeamB(e.target.value)}
            className="border rounded p-2 border-gray-300 text-gray-900"
          >
            <option value="" disabled>
              Seleccioná un equipo
            </option>

            {teams.map((team) => (
              <option
                key={team.id}
                value={team.id}
                disabled={team.id === selectedTeams.teamA?.id}
              >
                {team.name}
              </option>
            ))}
          </select>
          <TeamDisplay team={selectedTeams.teamB} title="Equipo B" />
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={startBattle}
          disabled={isBattleDisabled}
          className="bg-red-600 text-white px-8 py-3 rounded text-lg disabled:opacity-50"
        >
          Pelear ⚔️
        </button>

        <button
          onClick={resetBattle}
          className="bg-gray-300 text-gray-800 px-6 py-3 rounded"
        >
          Reset
        </button>
      </div>
      <BattleResult
        battleRounds={battleRounds}
        battleResult={battleResult}
        isBattleFinished={isBattleFinished}
      />
    </div>
  );
};

export default BattlePage;
