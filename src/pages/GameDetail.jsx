import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import komponen minigame yang sudah Yang Mulia buat
import JingleChallenge from "../components/JingleChallenge";
// import LinkItUp from "./LinkItUp"; 

const GameDetail = ({ setNavbarVisible }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Menangkap data yang dikirim otomatis dari Map.jsx
  const { gameType, playerName, tileIndex } = location.state || {};

  // Menyembunyikan navbar saat masuk ke arena Minigame
  useEffect(() => {
    if (setNavbarVisible) {
      setNavbarVisible(false);
      return () => {
        setNavbarVisible(true);
      };
    }
  }, [setNavbarVisible]);

  // Fungsi ini akan dipanggil oleh minigame saat game-nya sudah selesai
  const handleChallengeDone = (score) => {
    // Di sini Yang Mulia bisa tambahkan logika untuk simpan skor ke state/localStorage
    console.log(`${playerName} menyelesaikan game dan mendapat skor: ${score}`);

    // Setelah selesai, otomatis tendang balik ke Peta
    navigate("/Map");
  };

  // --- LOGIKA PANGGILAN KOMPONEN (THE SWITCHER) ---

  if (gameType === "sing_the_jingle") {
    // Layar akan 100% diambil alih oleh JingleChallenge
    return (
      <JingleChallenge
        playerName={playerName || "Pemain"}
        onChallengeDone={handleChallengeDone}
      />
    );
  }

  if (gameType === "link_it_up") {
    // Layar akan 100% diambil alih oleh LinkItUp (kalau sudah dibuat)
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-100 font-poppins">
        <h1 className="text-4xl font-black text-blue-600">
          KOMPONEN LINK IT UP BELUM JADI 🚧
        </h1>
        <button
          onClick={() => navigate("/Map")}
          className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-full font-bold"
        >
          Kembali
        </button>
      </div>
      // Nanti ganti dengan: <LinkItUp playerName={playerName} onChallengeDone={handleChallengeDone} />
    );
  }

  // --- FALLBACK (Jika terjadi error / tidak ada game yang terpilih) ---
  return (
    <div className="min-h-screen bg-[#FFFDF0] flex flex-col items-center justify-center p-6 font-poppins">
      <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-lg w-full border-4 border-red-500">
        <h1 className="text-4xl font-black text-red-500 mb-4">WADUH! 🚨</h1>
        <p className="text-xl text-slate-600 font-semibold mb-8">
          Sistem kebingungan. Game tidak ditemukan atau Yang Mulia masuk lewat
          jalur ilegal!
        </p>
        <button
          onClick={() => navigate("/Map")}
          className="bg-slate-800 text-white px-8 py-4 rounded-full font-bold text-xl hover:bg-slate-700 hover:scale-105 transition-all shadow-lg"
        >
          Kembali ke Peta
        </button>
      </div>
    </div>
  );
};

export default GameDetail;
