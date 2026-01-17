import { NavLink } from "react-router-dom";
import { GameController, Sword, LinuxLogo } from "phosphor-react";

const Sidebar = () => {
  const navItems = [
    {
      path: "/pokemons",
      label: "Pokémons",
      icon: () => <LinuxLogo size={32} />,
    },
    {
      path: "/teams",
      label: "Equipos",
      icon: () => <GameController size={32} />,
    },
    {
      path: "/battles",
      label: "Combates",
      icon: () => <Sword size={32} />,
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Pokémon App</h1>

        <nav className="space-y-2">
          {navItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 border-l-4 border-blue-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`
              }
            >
              {icon()}
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
