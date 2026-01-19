import { NavLink } from "react-router-dom";
import TeamsCompoent from "../components/TeamsCompoent";

const TeamsPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-row justify-between m-0 p-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Gestión de Equipos 🏆
        </h1>
        <NavLink
          to="/teams/create"
          className="bg-gray-800 text-white rounded cursor-pointer flex justify-center items-center px-8 py-3 mb-6"
        >
          Agregar Equipo
        </NavLink>
      </div>
      <TeamsCompoent />
    </div>
  );
};

export default TeamsPage;
