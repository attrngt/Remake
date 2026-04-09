import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import komponen minigame yang sudah Yang Mulia buat
import JingleChallenge from "../components/JingleChallenge";
import LinkItUp from "../components/LinkItUp";

const GameDetail = ({ setNavbarVisible }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. TANGKAP DATA 'players' DARI MAP
  const { gameType, playerId, playerName, tileIndex, players } =
    location.state || {};

  // Menyembunyikan navbar saat masuk ke arena Minigame
  useEffect(() => {
    if (setNavbarVisible) {
      setNavbarVisible(false);
      return () => {
        setNavbarVisible(true);
      };
    }
  }, [setNavbarVisible]);

  const handleChallengeDone = (score) => {
    navigate("/Map", {
      state: { gameResult: score, gameType, playerId, playerName },
    });
  };

  // --- LOGIKA PANGGILAN KOMPONEN (THE SWITCHER) ---

  if (gameType === "sing_the_jingle") {
    return (
      <JingleChallenge
        playerName={playerName || "Pemain"}
        onChallengeDone={handleChallengeDone}
      />
    );
  }

  if (gameType === "link_it_up") {
    return (
      // 2. KIRIM DATA 'players' KE LINK IT UP
      <LinkItUp players={players} onChallengeDone={handleChallengeDone} />
    );
  }

  // 3. FALLBACK RETURN (PENCEGAH LAYAR NYANGKUT/CRASH)
  return (
    <div className="min-h-screen bg-[#FFFDF0] flex flex-col items-center justify-center p-6 font-poppins">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center border-4 border-red-500">
        <h1 className="text-4xl font-black text-red-500 mb-4">WADUH! 🚨</h1>
        <p className="text-xl text-slate-600 font-semibold mb-8">
          Sistem kebingungan mencari game. Mari kita kembali ke Map!
        </p>
        <button
          onClick={() => navigate("/Map")}
          className="bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-all"
        >
          Kembali ke Peta
        </button>
      </div>
    </div>
  );
};

export default GameDetail;
