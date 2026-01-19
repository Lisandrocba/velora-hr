/* eslint-disable */
import {
  randomPokemons,
  sortByAttack,
  sortByName,
} from "../utils/oderPokemons";

describe("orderPokemons utilities", () => {
  let mockPokemons;

  beforeEach(() => {
    mockPokemons = [
      {
        id: 1,
        name: "pikachu",
        stats: { attack: 55 },
      },
      {
        id: 2,
        name: "charizard",
        stats: { attack: 84 },
      },
      {
        id: 3,
        name: "blastoise",
        stats: { attack: 83 },
      },
      {
        id: 4,
        name: "alakazam",
        stats: { attack: 50 },
      },
    ];
  });

  describe("randomPokemons", () => {
    beforeEach(() => {
      jest.spyOn(Math, "random");
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should return an array with the same length", () => {
      Math.random.mockReturnValue(0.5);
      const result = randomPokemons(mockPokemons);

      expect(result).toHaveLength(mockPokemons.length);
    });

    it("should return an array with the same elements", () => {
      Math.random.mockReturnValue(0.5);
      const result = randomPokemons(mockPokemons);

      mockPokemons.forEach((pokemon) => {
        expect(result).toContain(pokemon);
      });
    });

    it("should not modify the original array", () => {
      Math.random.mockReturnValue(0.5);
      const originalArray = [...mockPokemons];

      randomPokemons(mockPokemons);

      expect(mockPokemons).toEqual(originalArray);
    });

    it("should work with empty array", () => {
      const result = randomPokemons([]);

      expect(result).toEqual([]);
    });

    it("should work with single element", () => {
      const singlePokemon = [mockPokemons[0]];
      const result = randomPokemons(singlePokemon);

      expect(result).toEqual(singlePokemon);
    });

    it("should actually shuffle the array (probabilistic test)", () => {
      const iterations = 100;
      let orderChanges = 0;

      for (let i = 0; i < iterations; i++) {
        const result = randomPokemons(mockPokemons);

        if (result[0].id !== mockPokemons[0].id) {
          orderChanges++;
        }
      }

      expect(orderChanges).toBeGreaterThan(iterations * 0.3);
    });
  });

  describe("sortByAttack", () => {
    it("should sort pokemons by attack in descending order", () => {
      const result = sortByAttack(mockPokemons);

      expect(result).toEqual([
        { id: 2, name: "charizard", stats: { attack: 84 } },
        { id: 3, name: "blastoise", stats: { attack: 83 } },
        { id: 1, name: "pikachu", stats: { attack: 55 } },
        { id: 4, name: "alakazam", stats: { attack: 50 } },
      ]);
    });

    it("should handle equal attack values correctly", () => {
      const pokemonsWithEqualAttack = [
        { id: 1, name: "pokemon1", stats: { attack: 50 } },
        { id: 2, name: "pokemon2", stats: { attack: 50 } },
        { id: 3, name: "pokemon3", stats: { attack: 60 } },
      ];

      const result = sortByAttack(pokemonsWithEqualAttack);

      expect(result[0].stats.attack).toBe(60);
      expect(result[1].stats.attack).toBe(50);
      expect(result[2].stats.attack).toBe(50);
    });

    it("should not modify the original array", () => {
      const originalArray = [...mockPokemons];

      sortByAttack(mockPokemons);

      expect(mockPokemons).toEqual(originalArray);
    });

    it("should work with empty array", () => {
      const result = sortByAttack([]);

      expect(result).toEqual([]);
    });

    it("should work with single element", () => {
      const singlePokemon = [mockPokemons[0]];
      const result = sortByAttack(singlePokemon);

      expect(result).toEqual(singlePokemon);
    });

    it("should handle negative attack values", () => {
      const pokemonsWithNegativeAttack = [
        { id: 1, name: "weak", stats: { attack: -10 } },
        { id: 2, name: "normal", stats: { attack: 50 } },
      ];

      const result = sortByAttack(pokemonsWithNegativeAttack);

      expect(result[0].stats.attack).toBe(50);
      expect(result[1].stats.attack).toBe(-10);
    });
  });

  describe("sortByName", () => {
    it("should sort pokemons by name in alphabetical order", () => {
      const result = sortByName(mockPokemons);

      expect(result).toEqual([
        { id: 4, name: "alakazam", stats: { attack: 50 } },
        { id: 3, name: "blastoise", stats: { attack: 83 } },
        { id: 2, name: "charizard", stats: { attack: 84 } },
        { id: 1, name: "pikachu", stats: { attack: 55 } },
      ]);
    });

    it("should handle names with different cases correctly", () => {
      const pokemonsWithMixedCase = [
        { id: 1, name: "Zubat", stats: { attack: 45 } },
        { id: 2, name: "abra", stats: { attack: 20 } },
        { id: 3, name: "Pikachu", stats: { attack: 55 } },
      ];

      const result = sortByName(pokemonsWithMixedCase);

      expect(result[0].name).toBe("abra");
      expect(result[1].name).toBe("Pikachu");
      expect(result[2].name).toBe("Zubat");
    });

    it("should handle special characters and accents", () => {
      const pokemonsWithSpecialChars = [
        { id: 1, name: "ñoño", stats: { attack: 30 } },
        { id: 2, name: "abc", stats: { attack: 20 } },
        { id: 3, name: "árbol", stats: { attack: 40 } },
      ];

      const result = sortByName(pokemonsWithSpecialChars);

      expect(result.map((p) => p.name)).toEqual(["abc", "árbol", "ñoño"]);
    });

    it("should not modify the original array", () => {
      const originalArray = [...mockPokemons];

      sortByName(mockPokemons);

      expect(mockPokemons).toEqual(originalArray);
    });

    it("should work with empty array", () => {
      const result = sortByName([]);

      expect(result).toEqual([]);
    });

    it("should work with single element", () => {
      const singlePokemon = [mockPokemons[0]];
      const result = sortByName(singlePokemon);

      expect(result).toEqual(singlePokemon);
    });

    it("should handle duplicate names correctly", () => {
      const pokemonsWithDuplicates = [
        { id: 1, name: "pikachu", stats: { attack: 55 } },
        { id: 2, name: "pikachu", stats: { attack: 60 } },
        { id: 3, name: "charizard", stats: { attack: 84 } },
      ];

      const result = sortByName(pokemonsWithDuplicates);

      expect(result[0].name).toBe("charizard");
      expect(result[1].name).toBe("pikachu");
      expect(result[2].name).toBe("pikachu");
    });
  });

  describe("Integration tests", () => {
    it("should work correctly when chaining operations", () => {
      const sortedByName = sortByName(mockPokemons);
      const result = sortByAttack(sortedByName);

      expect(result[0].stats.attack).toBeGreaterThanOrEqual(
        result[1].stats.attack
      );
      expect(result[1].stats.attack).toBeGreaterThanOrEqual(
        result[2].stats.attack
      );
    });

    it("should preserve all pokemon data through operations", () => {
      const shuffled = randomPokemons(mockPokemons);
      const sortedByAttack = sortByAttack(shuffled);
      const sortedByName = sortByName(sortedByAttack);

      expect(sortedByName).toHaveLength(mockPokemons.length);
      mockPokemons.forEach((originalPokemon) => {
        const found = sortedByName.find((p) => p.id === originalPokemon.id);
        expect(found).toBeDefined();
        expect(found).toEqual(originalPokemon);
      });
    });
  });
});
