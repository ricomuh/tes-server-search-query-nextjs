import { GamePlatform } from "@/app";

export const fetchGames = async (
  searchQuery = "",
  sortBy = "latest",
  page = 1
) => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/games?search=${encodeURIComponent(
        searchQuery
      )}&sort=${sortBy}&page=${page}`,
      {
        // cache: "force-cache",
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );

    if (!res.ok) {
      console.error(`Error fetching games: ${res.status} - ${res.statusText}`);
      throw new Error("Failed to fetch games");
    }

    const data = await res.json();

    console.log("Fetched data:", data);

    if (
      !data ||
      !data.data ||
      !data.data.games ||
      !Array.isArray(data.data.games.data)
    ) {
      // console.error("API did not return a valid games array:", data);
      // return { data: [], total: 0 };
      throw new Error("API did not return a valid games array");
    }

    return {
      data: data.data.games.data.map((game: GamePlatform) => ({
        id: game.id,
        title: game.title,
        slug: game.slug,
        cover_url: game.cover_url,
        logo_url: game.logo_url,
        createdAt: game.release_date,
        platforms: game.platforms.map((p) => ({
          name: p.name,
          icon_color_url: p.icon_color_url,
          icon_white_url: p.icon_white_url,
        })),
        genres: game.genres || [],
      })),
      total: data.data.games.total || 0,
    };
  } catch (error) {
    console.error("Error fetching games:", error);
    return { data: [], total: 0 };
  }
};
