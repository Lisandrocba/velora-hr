/* eslint-disable */
import { render, screen, fireEvent } from "@testing-library/react";
import TeamsCompoent from "../components/TeamsCompoent";
import useTeamStore from "../../../store/useTeamStore";

jest.mock("../../../store/useTeamStore");

jest.mock("../components/TeamPokemonList", () => {
  return function MockedTeamPokemonList({ pokemons, idTeam }) {
    return (
      <div data-testid={`team-pokemon-list-${idTeam}`}>
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} data-testid={`pokemon-${pokemon.id}`}>
            {pokemon.name}
          </div>
        ))}
      </div>
    );
  };
});

describe("TeamsCompoent UI Tests", () => {
  const mockReorderRandomPokemons = jest.fn();

  const mockTeamsData = [
    {
      id: "team-1",
      name: "Equipo Fuego",
      pokemons: [
        { id: 1, name: "charizard", stats: { attack: 84 } },
        { id: 2, name: "arcanine", stats: { attack: 110 } },
      ],
    },
    {
      id: "team-2",
      name: "Equipo Agua",
      pokemons: [
        { id: 3, name: "blastoise", stats: { attack: 83 } },
        { id: 4, name: "gyarados", stats: { attack: 125 } },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    useTeamStore.mockReturnValue({
      teams: mockTeamsData,
      reorderRandomPokemons: mockReorderRandomPokemons,
    });
  });

  describe("when there are teams", () => {
    it("should render all teams with correct structure", () => {
      render(<TeamsCompoent />);

      expect(screen.getByText("Equipo Fuego")).toBeInTheDocument();
      expect(screen.getByText("Equipo Agua")).toBeInTheDocument();

      const teamCards = screen.getAllByRole("heading", { level: 2 });
      expect(teamCards).toHaveLength(2);
    });

    it("should render team names as h2 headings", () => {
      render(<TeamsCompoent />);

      const teamNames = screen.getAllByRole("heading", { level: 2 });
      expect(teamNames[0]).toHaveTextContent("Equipo Fuego");
      expect(teamNames[1]).toHaveTextContent("Equipo Agua");
    });

    it("should render action buttons for each team", () => {
      render(<TeamsCompoent />);

      const randomButtons = screen.getAllByText("Orden Aleatorio");
      const attackButtons = screen.getAllByText("Mayor Ataque");
      const alphabetButtons = screen.getAllByText("Orden Alfabetico");

      expect(randomButtons).toHaveLength(2);
      expect(attackButtons).toHaveLength(2);
      expect(alphabetButtons).toHaveLength(2);
    });

    it("should render TeamPokemonList component for each team", () => {
      render(<TeamsCompoent />);

      expect(
        screen.getByTestId("team-pokemon-list-team-1")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("team-pokemon-list-team-2")
      ).toBeInTheDocument();
    });

    describe("button interactions", () => {
      it("should call reorderRandomPokemons with correct parameters when clicking random order", () => {
        render(<TeamsCompoent />);

        const randomButton = screen.getAllByText("Orden Aleatorio")[0];
        fireEvent.click(randomButton);

        expect(mockReorderRandomPokemons).toHaveBeenCalledTimes(1);
        expect(mockReorderRandomPokemons).toHaveBeenCalledWith(
          "team-1",
          expect.any(Function)
        );
      });

      it("should call reorderRandomPokemons when clicking attack order", () => {
        render(<TeamsCompoent />);

        const attackButton = screen.getAllByText("Mayor Ataque")[0];
        fireEvent.click(attackButton);

        expect(mockReorderRandomPokemons).toHaveBeenCalledTimes(1);
        expect(mockReorderRandomPokemons).toHaveBeenCalledWith(
          "team-1",
          expect.any(Function)
        );
      });

      it("should call reorderRandomPokemons when clicking alphabetic order", () => {
        render(<TeamsCompoent />);

        const alphabeticButton = screen.getAllByText("Orden Alfabetico")[0];
        fireEvent.click(alphabeticButton);

        expect(mockReorderRandomPokemons).toHaveBeenCalledTimes(1);
        expect(mockReorderRandomPokemons).toHaveBeenCalledWith(
          "team-1",
          expect.any(Function)
        );
      });

      it("should call reorderRandomPokemons with correct team id for different teams", () => {
        render(<TeamsCompoent />);

        const secondTeamRandomButton =
          screen.getAllByText("Orden Aleatorio")[1];
        fireEvent.click(secondTeamRandomButton);

        expect(mockReorderRandomPokemons).toHaveBeenCalledWith(
          "team-2",
          expect.any(Function)
        );
      });
    });
  });

  describe("when there are no teams", () => {
    beforeEach(() => {
      useTeamStore.mockReturnValue({
        teams: [],
        reorderRandomPokemons: mockReorderRandomPokemons,
      });
    });

    it("should display no teams message", () => {
      render(<TeamsCompoent />);

      expect(
        screen.getByText("No tienes equipos creados aún.")
      ).toBeInTheDocument();
    });

    it("should not render any team cards", () => {
      render(<TeamsCompoent />);

      const teamHeadings = screen.queryAllByRole("heading", { level: 2 });
      expect(teamHeadings).toHaveLength(0);
    });

    it("should not render any action buttons", () => {
      render(<TeamsCompoent />);

      expect(screen.queryByText("Orden Aleatorio")).not.toBeInTheDocument();
      expect(screen.queryByText("Mayor Ataque")).not.toBeInTheDocument();
      expect(screen.queryByText("Orden Alfabetico")).not.toBeInTheDocument();
    });

    it("should have correct styling for empty state message", () => {
      render(<TeamsCompoent />);

      const emptyMessage = screen.getByText("No tienes equipos creados aún.");
      expect(emptyMessage).toHaveClass("text-gray-900", "text-xl");
    });
  });

  describe("component structure and accessibility", () => {
    beforeEach(() => {
      useTeamStore.mockReturnValue({
        teams: mockTeamsData,
        reorderRandomPokemons: mockReorderRandomPokemons,
      });
    });

    it("should have proper heading hierarchy", () => {
      render(<TeamsCompoent />);

      const h1Elements = screen.queryAllByRole("heading", { level: 1 });
      const h2Elements = screen.getAllByRole("heading", { level: 2 });
      const h3Elements = screen.queryAllByRole("heading", { level: 3 });

      expect(h1Elements).toHaveLength(0);
      expect(h2Elements).toHaveLength(2);
      expect(h3Elements).toHaveLength(0);
    });

    it("should render buttons as button elements", () => {
      render(<TeamsCompoent />);

      const allButtons = screen.getAllByRole("button");
      expect(allButtons).toHaveLength(6);

      allButtons.forEach((button) => {
        expect(button.tagName).toBe("BUTTON");
      });
    });

    it("should maintain proper component composition", () => {
      render(<TeamsCompoent />);

      expect(screen.getByTestId("pokemon-1")).toHaveTextContent("charizard");
      expect(screen.getByTestId("pokemon-2")).toHaveTextContent("arcanine");
      expect(screen.getByTestId("pokemon-3")).toHaveTextContent("blastoise");
      expect(screen.getByTestId("pokemon-4")).toHaveTextContent("gyarados");
    });
  });
});
