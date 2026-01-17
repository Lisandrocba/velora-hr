import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../shared/layout";
import PokemonPage from "../features/pokemon/page/PokemonPage";
import TeamsPage from "../features/teams/page/TeamsPage";
import BattlePage from "../features/battle/page/BattlePage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/pokemons" replace />} />
          <Route path="pokemons" element={<PokemonPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="battles" element={<BattlePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
