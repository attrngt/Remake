import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const LeaderboardFinal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const players = location.state?.players || [];

  // Sorting: Skor tertinggi di atas
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const handleRestart = () => {
    localStorage.removeItem("kulsMapState"); // Bersihkan state game
    navigate("/Home-Game");
  };

  const handleBackToHome = () => {
    navigate("/Home-Game");
  };

  const titleText = "LEADERBOARD".split("");
  const nextColors = ["#F37021", "#247B5B", "#F14624", "#6259A8"];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-[#2d7350] via-[#1a4a35] to-[#0f2a1f] p-2 md:p-4">
      <div className="relative w-full max-w-lg md:max-w-2xl bg-[#FEFFEE] border-[6px] border-black shadow-[15px_15px_0px_#257356] rounded-[30px] md:rounded-[40px] overflow-hidden animate-in fade-in zoom-in duration-500">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#257356] to-[#1a4a35] p-6 md:p-8 text-center border-b-[6px] border-black relative overflow-hidden">
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 mb-4">
            {titleText.map((char, index) => {
              if (char === " ")
                return <span key={index} className="w-2 md:w-4" />;
              const color = nextColors[index % nextColors.length];
              return (
                <span
                  key={index}
                  className="text-3xl md:text-5xl font-['Irish_Grover'] font-black inline-block transform rotate-1 drop-shadow-[2px_2px_0px_black]"
                  style={{ color: color }}
                >
                  {char}
                </span>
              );
            })}
          </div>

          <p className="text-[#FFC942] font-black text-lg md:text-xl mt-2 uppercase tracking-wider italic">
            FINAL RESULTS
          </p>
        </div>

        {/* List Pemain */}
        <div className="p-4 md:p-6 space-y-3 md:space-y-4 max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
          {sortedPlayers.map((player, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 border-3 border-black transition-all duration-300 hover:scale-105 ${
                index === 0
                  ? "bg-gradient-to-r from-[#FFC942] to-[#FFD700] shadow-[8px_8px_0px_black]"
                  : index === 1
                    ? "bg-gradient-to-r from-[#C0C0C0] to-[#A8A8A8] shadow-[6px_6px_0px_black]"
                    : index === 2
                      ? "bg-gradient-to-r from-[#CD7F32] to-[#B87333] shadow-[4px_4px_0px_black]"
                      : "bg-white shadow-[3px_3px_0px_black] hover:shadow-[6px_6px_0px_black]"
              }`}
            >
              <div className="flex items-center gap-3 md:gap-4">
                <div className="relative">
                  <span
                    className={`text-2xl md:text-3xl font-black italic ${
                      index === 0
                        ? "text-yellow-600"
                        : index === 1
                          ? "text-gray-600"
                          : index === 2
                            ? "text-amber-700"
                            : "text-slate-600"
                    }`}
                  >
                    #{index + 1}
                  </span>
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 text-lg md:text-xl">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </div>
                  )}
                </div>

                <div
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 md:border-3 border-black flex items-center justify-center text-white font-black text-lg md:text-xl shadow-[2px_2px_0px_black]"
                  style={{ backgroundColor: player.color }}
                >
                  {player.name.slice(0, 1).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-lg md:text-xl font-black uppercase truncate block max-w-[120px] md:max-w-[200px]">
                    {player.name}
                  </span>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: Math.min(player.score, 8) }).map(
                      (_, i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 bg-[#257356] rounded-full"
                        ></div>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs font-black text-slate-500 uppercase leading-none mb-1">
                  Score
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-3xl md:text-4xl font-black text-[#257356] drop-shadow-[1px_1px_0px_black]">
                    {player.score}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="p-4 md:p-6 bg-gradient-to-r from-slate-100 to-slate-200 border-t-[6px] border-black flex flex-col sm:flex-row gap-3 md:gap-4">
          <button
            onClick={handleRestart}
            className="flex-1 bg-gradient-to-r from-[#2e8555] to-[#257356] text-white font-['Irish_Grover'] text-xl md:text-2xl py-3 md:py-4 rounded-2xl border-3 border-black shadow-[6px_6px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 hover:scale-105"
          >
            PLAY AGAIN
          </button>

          <button
            onClick={handleBackToHome}
            className="flex-1 bg-gradient-to-r from-[#F37021] to-[#E55A00] text-white font-['Irish_Grover'] text-xl md:text-2xl py-3 md:py-4 rounded-2xl border-3 border-black shadow-[6px_6px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 hover:scale-105"
          >
            BACK TO HOME
          </button>

          <Link
            to="/peminatan/kuls"
            className="flex-1 bg-white text-[#2e8555] text-center font-['Irish_Grover'] text-xl md:text-2xl py-3 md:py-4 rounded-2xl border-3 border-black shadow-[6px_6px_0px_black] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200 hover:scale-105"
          >
            EXIT GAME
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardFinal;
