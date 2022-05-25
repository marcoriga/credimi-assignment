import axios from "axios";

interface CharactersArgs {
  series: string;
}

export const resolvers = {
  Query: {
    characters: async (_: any, args: CharactersArgs) => {
      try {
        const characters = await axios.get(
          `https://www.amiiboapi.com/api/amiibo/?gameseries=${args.series}`
        );

        return characters.data.amiibo
          .sort(() => Math.random() - 0.5)
          .slice(0, 6);
      } catch (error) {
        throw error;
      }
    },
  },
};
