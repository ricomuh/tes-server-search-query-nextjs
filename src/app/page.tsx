import { fetchGames } from "@/lib/api";
import Link from "next/link";
import Order from "./order";
import Search from "./search";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    search: string;
    sort: string;
    page: string;
  };
}) {
  const searchQuery: string = searchParams.search || "";
  const sortBy: string = searchParams.sort || "latest";
  const page: number = parseInt(searchParams.page) || 1;
  const games = await fetchGames(searchQuery, sortBy, page);

  return {
    title: "Game List",
    description: "A list of games with various sorting and filtering options.",
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string;
    sort: string;
    page: string;
  };
}) {
  const searchQuery: string = searchParams.search || "";
  const sortBy: string = searchParams.sort || "latest";
  const page: number = parseInt(searchParams.page) || 1;
  const games = await fetchGames(searchQuery, sortBy, page);

  return (
    <div>
      <h1 className="text-2xl font-bold">Game List</h1>

      {/* order */}
      <Order orderBy={sortBy} />

      {/* search */}
      <Search searchQuery={searchQuery} />

      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          {games.data.map((game) => (
            <div
              key={game.id}
              className="w-32 h-32 bg-gray-900 p-4 m-2 rounded-lg"
            >
              <h2>{game.title}</h2>
              <img src={game.cover_url} alt={game.title} />
              <p>
                Release Date: {new Date(game.createdAt).toLocaleDateString()}
              </p>
              <p>Platforms: {game.platforms.map((p) => p.name).join(", ")}</p>
              <p>Genres: {game.genres.join(", ")}</p>
              <img src={game.logo_url} alt={`${game.title} logo`} />
              <div className="platform-icons">
                {game.platforms.map((platform) => (
                  <img
                    key={platform.name}
                    src={platform.icon_color_url}
                    alt={platform.name}
                    className="platform-icon"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* pagination */}
        <div className="flex items-center">
          <Link
            className="bg-blue-500 text-white px-4 py-2 rounded"
            href={`?page=${
              page > 1 ? page - 1 : 1
            }&search=${searchQuery}&sort=${sortBy}`}
          >
            Previous
          </Link>
          <span className="mx-2">
            Page {page} of {Math.ceil(games.total / 7)}
          </span>
          <Link
            className="bg-blue-500 text-white px-4 py-2 rounded"
            href={`?page=${
              page < Math.ceil(games.total / 7) ? page + 1 : page
            }&search=${searchQuery}&sort=${sortBy}`}
          >
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
