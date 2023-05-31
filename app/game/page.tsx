
const games = [
  { id: 1, name: "Game 1", date: "2021-01-01", category: "Strategy", img: "/game1.png" },
  { id: 2, name: "Game 2", date: "2021-02-02", category: "Action", img: "/game2.png" },
  { id: 3, name: "Game 3", date: "2021-03-03", category: "Puzzle", img: "/game3.jpeg" },
  { id: 4, name: "Game 4", date: "2021-04-04", category: "Adventure", img: "/game1.png" },
  { id: 5, name: "Game 5", date: "2021-05-05", category: "RPG", img: "/game2.png" },
  { id: 6, name: "Game 6", date: "2021-06-06", category: "Strategy", img: "/game1.png" },
];

import Link from 'next/link'

export default function GameList() {
  return (
    <div className="flex flex-wrap justify-around">
      {games.map((game) => (
        <div key={game.id} className="m-4 max-w-sm transform hover:scale-105 transition-transform duration-200 cursor-pointer">
          <Link href={`/game/${game.id}`}>
            <div className="overflow-hidden rounded-lg shadow-lg">
              <img className="w-full h-64 object-cover" src={game.img} alt={game.name} />
              <div className="bg-white rounded-b-lg px-6 py-4  transition-colors duration-200">
                <h2 className="text-2xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-indigo-500">{game.name}</h2>
                <p className="text-gray-800  transition-colors duration-200 mt-1"><strong className="font-semibold">Release date:</strong> {game.date}</p>
                <p className="text-gray-800  transition-colors duration-200 mt-1"><strong className="font-semibold">Category:</strong> {game.category}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}


