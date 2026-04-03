import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DiceRoll from "react-dice-roll";
// Pastikan path gambarnya sesuai dengan nama file peta Anda
import mapImage from "../assets/mapkuls.png";

const colorMap = {
  "bg-blue-500": "#2563eb",
  "bg-red-500": "#ef4444",
  "bg-green-500": "#22c55e",
  "bg-indigo-500": "#6366f1",
  "bg-orange-500": "#f97316",
  "bg-slate-500": "#64748b",
};

const getColorFromClass = (colorClass) => {
  if (!colorClass) return "#2563eb";
  return colorMap[colorClass] || "#2563eb";
};

// 1. FUNGSI KOORDINAT MANUAL (Disesuaikan dengan Gambar Frame 5)
const getPathPoints = (width, height) => {
  // Nilai x dan y adalah persentase dari kiri (x) dan atas (y)
  const relativePoints = [
    { x: 0.097, y: 0.85 }, // [0] START (Kiri Bawah)
    { x: 0.39, y: 0.79 }, // [1] Petak 1
    { x: 0.52, y: 0.78 }, // [2] Petak 2
    { x: 0.68, y: 0.86 }, // [3] Petak 3
    { x: 0.82, y: 0.62 }, // [4] Petak 4 (Tikungan Kanan Bawah)
    { x: 0.72, y: 0.44 }, // [5] Petak 5
    { x: 0.55, y: 0.43 }, // [6] Petak 6
    { x: 0.38, y: 0.49 }, // [7] Petak 7
    { x: 0.24, y: 0.53 }, // [8] Petak 8
    { x: 0.14, y: 0.32 }, // [9] Petak 9 (Tikungan Kiri Atas)
    { x: 0.22, y: 0.17 }, // [10] Petak 10
    { x: 0.38, y: 0.14 }, // [11] Petak 11
    { x: 0.55, y: 0.15 }, // [12] Petak 12
    { x: 0.82, y: 0.18 }, // [13] FINISH (Kanan Atas)
  ];

  return relativePoints.map((p) => ({
    x: p.x * width,
    y: p.y * height,
  }));
};

const Map = ({ setNavbarVisible }) => {
  const canvasRef = useRef(null);
  const imageRef = useRef(new Image());
  const navigate = useNavigate();
  const location = useLocation();
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [lastRoll, setLastRoll] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const savedPlayers = location.state?.players || [];

  // Hide Navbar saat masuk Map
  useEffect(() => {
    if (setNavbarVisible) {
      setNavbarVisible(false);
      return () => {
        setNavbarVisible(true);
      };
    }
  }, [setNavbarVisible]);

  useEffect(() => {
    // 1. Coba load game yang sedang berjalan (Misal habis kembali dari GameDetail)
    const activeGameState = localStorage.getItem("kulsMapState");
    if (activeGameState) {
      try {
        const { savedPlayersState, savedTurn } = JSON.parse(activeGameState);
        if (savedPlayersState && savedPlayersState.length > 0) {
          setPlayers(savedPlayersState);
          setCurrentTurn(savedTurn || 0);
          return; // Langsung return, lewati inisialisasi awal
        }
      } catch (error) {}
    }

    // 2. Jika tidak ada memori game yang berjalan, inisiasi dari HomeGame
    const stored = localStorage.getItem("homeGamePlayers");
    let parsed = [];
    if (stored) {
      try {
        parsed = JSON.parse(stored);
      } catch (error) {
        parsed = [];
      }
    }

    const source = savedPlayers.length ? savedPlayers : parsed;
    const normalized = source.length
      ? source.map((player, index) => ({
          id: index,
          name: player.name || `P${index + 1}`,
          color: getColorFromClass(player.colorClass),
          tile: 0, // Semua mulai dari index 0 (START)
        }))
      : [
          {
            id: 0,
            name: "P1",
            color: "#2563eb",
            tile: 0,
          },
        ];

    setPlayers(normalized);
  }, [savedPlayers]);

  useEffect(() => {
    const image = imageRef.current;
    image.src = mapImage;
    image.onload = () => setMapLoaded(true);
  }, []);

  const drawMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    // Ambil koordinat yang sudah dihitung
    const pathPoints = getPathPoints(width, height);

    ctx.clearRect(0, 0, width, height);

    // Gambar Base Map (Hanya Gambar Peta, garis putih dihapus agar bersih)
    if (mapLoaded) {
      ctx.drawImage(imageRef.current, 0, 0, width, height);
    } else {
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(0, 0, width, height);
    }

    // Gambar titik-titik relativePoints agar terlihat di web untuk diinspeksi
    pathPoints.forEach((point, index) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 10, 0, Math.PI * 2); // Radius 10

      // Menambahkan angka petak agar lebih jelas
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 10px poppins, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(index.toString(), point.x, point.y);
    });

    // Gambar Pemain di atas peta
    players.forEach((player, index) => {
      // Batasi posisi maksimal di FINISH (Index 13)
      const tileIndex = Math.min(player.tile, 13);
      const basePoint = pathPoints[tileIndex];

      // Tambahkan sedikit offset agar pemain tidak saling menutupi 100% jika di petak yang sama
      const offsetX = (index % 2 === 0 ? -1 : 1) * (index * 6);
      const offsetY = (index < 2 ? -1 : 1) * (index * 4);
      const x = basePoint.x + offsetX;
      const y = basePoint.y + offsetY;

      // Gambar Pin/Pion Lingkaran
      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fillStyle = player.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Label Nama/Angka Pemain
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px poppins, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Kasih shadow hitam tipis biar teks kebaca
      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 4;
      ctx.fillText(`P${index + 1}`, x, y);

      // Reset shadow biar gak bocor ke elemen lain
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const width = Math.min(window.innerWidth - 32, 1200);
      // Rasio disesuaikan dengan gambar Anda, sepertinya sekitar 16:7 atau 2:1
      const height = Math.round((width * 9) / 16);
      canvas.width = width;
      canvas.height = height;
      drawMap();
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [players, mapLoaded]);

  useEffect(() => {
    drawMap();
  }, [players, mapLoaded]);

  // 2. FUNGSI DADU DENGAN BATAS FINISH = 13
  const handleRoll = (value) => {
    setLastRoll(value);

    let nextTurn = (currentTurn + 1) % players.length;
    let targetTile = 0;
    let currentPlayerName = "";

    const updatedPlayers = players.map((player, index) => {
      if (index !== currentTurn) return player;

      const newTile = player.tile + value;
      targetTile = Math.min(newTile, 13);
      currentPlayerName = player.name;

      if (targetTile >= 13) {
        console.log(`${player.name} MENCAPAI FINISH!`);
      }

      return {
        ...player,
        tile: targetTile,
      };
    });

    setPlayers(updatedPlayers);
    setCurrentTurn(nextTurn);

    // Simpan posisi game ini ke localStorage sebelum diarahkan ke minigame
    localStorage.setItem(
      "kulsMapState",
      JSON.stringify({
        savedPlayersState: updatedPlayers,
        savedTurn: nextTurn,
      }),
    );

    // Pindah ke minigame jika bukan di START (0) dan belum mencapai FINISH (13)
    if (targetTile > 0 && targetTile < 13) {
      const minigames = ["sing_the_jingle", "link_it_up"];
      const randomGame =
        minigames[Math.floor(Math.random() * minigames.length)];

      // Jeda 1.5 detik agar pemain dapat melihat hasil kocokan dan bidak yang berpindah
      setTimeout(() => {
        navigate("/gameDetail", {
          state: {
            gameType: randomGame,
            playerName: currentPlayerName,
            tileIndex: targetTile,
          },
        });
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 pb-2 font-poppins">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-black text-[#2e8555] mt-2">
              KULSTOPIA MAP
            </h1>
            <p className=" text-xl text-slate-700 font-bold">
              Pemain: {players.length} • Giliran:{" "}
              <span className="text-[#F37021]">
                {players[currentTurn]?.name}
              </span>
            </p>
          </div>
        </div>

        <div
          className="mx-auto flex flex-col lg:flex-row items-start justify-between gap-6"
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          {/* AREA CANVAS PETA */}
          <div
            className="rounded-[3rem] border-4 border-white bg-white p-2 shadow-xl overflow-hidden"
            style={{ width: "70vw", maxWidth: "840px" }}
          >
            <canvas
              ref={canvasRef}
              className="w-full rounded-[2.5rem]"
              style={{ display: "block" }}
            />
          </div>

          {/* AREA DADU */}
          <div
            className="rounded-[2.5rem] bg-white p-8 text-center shadow-xl border-4 border-white flex flex-col items-center"
            style={{ minWidth: "220px" }}
          >
            <div className="text-3xl font-black text-[#2e8555] pb-6 font-irish">
              ROLL DICE
            </div>
            <div className="hover:scale-105 active:scale-95 transition-transform">
              <DiceRoll onRoll={handleRoll} size={90} faceDotColor="#fff" />
            </div>
            {lastRoll && (
              <div className="mt-6 text-slate-500 font-bold">
                Maju <span className="text-xl text-[#F37021]">{lastRoll}</span>{" "}
                langkah!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tombol Kembali ke Kuls */}
      <Link
        to="/peminatan/kuls"
        onClick={() => localStorage.removeItem("kulsMapState")}
        className="fixed bottom-9 right-4 -translate-x-1/2 rounded-full border border-white/40 bg-white/90 px-6 py-3 text-sm font-bold text-[#2e8555] shadow-xl backdrop-blur-sm hover:bg-white hover:scale-105 transition"
      >
        Keluar Game
      </Link>
    </div>
  );
};

export default Map;
