import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Import komponen minigame yang sudah Yang Mulia buat
import JingleChallenge from "../components/JingleChallenge";
import LinkItUp from "../components/LinkItUp";

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
      <LinkItUp
        playerName={playerName || "Pemain"}
        onChallengeDone={handleChallengeDone}
      />
    );
  }
};

export default GameDetail;
