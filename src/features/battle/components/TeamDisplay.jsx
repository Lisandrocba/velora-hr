const TeamDisplay = ({ team, title }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
      {title}
    </h3>
    {team ? (
      <>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {team.pokemons.map((pokemon) => (
            <div key={pokemon.id} className="text-center">
              <img
                src={pokemon.image}
                alt={pokemon.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <p className="text-sm font-medium text-gray-700 capitalize">
                {pokemon.name}
              </p>
            </div>
          ))}
        </div>
      </>
    ) : (
      <div className="text-center text-gray-500 py-8">Selecciona un equipo</div>
    )}
  </div>
);

export default TeamDisplay;
