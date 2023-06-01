
const games = [
  { id: 1, name: "Memory", date: "2023-06-01", category: "Puzzle", img: "/memory.png", url: 'http://8.219.157.52:5003/' },
  { id: 3, name: "Game 3", date: "2013-09-17", category: "Open-world", img: "/game3.jpeg", url: 'https://www.rockstargames.com/gta-v' },
];

import Link from 'next/link'

export default function GameList() {
  return (
    <div className="flex flex-wrap justify-around">
      {games.map((game) => (
        <div key={game.id} className="m-4 max-w-sm transform hover:scale-105 transition-transform duration-200 cursor-pointer">
          <Link href={game.url}>
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


