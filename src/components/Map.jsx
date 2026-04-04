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

// 1. FUNGSI KOORDINAT MANUAL
const getPathPoints = (width, height) => {
  const relativePoints = [
    { x: 0.097, y: 0.85 }, // [0] START
    { x: 0.39, y: 0.79 }, // [1] Petak 1
    { x: 0.52, y: 0.78 }, // [2] Petak 2
    { x: 0.68, y: 0.86 }, // [3] Petak 3
    { x: 0.82, y: 0.62 }, // [4] Petak 4
    { x: 0.72, y: 0.44 }, // [5] Petak 5
    { x: 0.55, y: 0.43 }, // [6] Petak 6
    { x: 0.38, y: 0.49 }, // [7] Petak 7
    { x: 0.24, y: 0.53 }, // [8] Petak 8
    { x: 0.14, y: 0.32 }, // [9] Petak 9
    { x: 0.22, y: 0.17 }, // [10] Petak 10
    { x: 0.38, y: 0.14 }, // [11] Petak 11
    { x: 0.55, y: 0.15 }, // [12] Petak 12
    { x: 0.82, y: 0.18 }, // [13] FINISH
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

  // --- STATE UNTUK MODAL TUTORIAL ---
  const [showMapIntro, setShowMapIntro] = useState(false);
  const [introStep, setIntroStep] = useState(0);

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
    const activeGameState = localStorage.getItem("kulsMapState");

    if (!activeGameState) {
      setShowMapIntro(true);
    } else {
      try {
        const { savedPlayersState, savedTurn } = JSON.parse(activeGameState);
        if (savedPlayersState && savedPlayersState.length > 0) {
          setPlayers(savedPlayersState);
          setCurrentTurn(savedTurn || 0);
          return;
        }
      } catch (error) {}
    }

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
          tile: 0,
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
    const pathPoints = getPathPoints(width, height);

    ctx.clearRect(0, 0, width, height);

    if (mapLoaded) {
      ctx.drawImage(imageRef.current, 0, 0, width, height);
    } else {
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(0, 0, width, height);
    }

    players.forEach((player, index) => {
      const tileIndex = Math.min(player.tile, 13);
      const basePoint = pathPoints[tileIndex];

      const offsetX = (index % 2 === 0 ? -1 : 1) * (index * 6);
      const offsetY = (index < 2 ? -1 : 1) * (index * 4);
      const x = basePoint.x + offsetX;
      const y = basePoint.y + offsetY;

      ctx.beginPath();
      ctx.arc(x, y, 18, 0, Math.PI * 2);
      ctx.fillStyle = player.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px poppins, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.shadowColor = "rgba(0,0,0,0.8)";
      ctx.shadowBlur = 4;
      ctx.fillText(`P${index + 1}`, x, y);

      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      // DIPERKECIL DI SINI: Maksimal lebar canvas sekarang 900px
      const width = Math.min(window.innerWidth - 32, 900);
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

  // 2. FUNGSI DADU
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

      return {
        ...player,
        tile: targetTile,
      };
    });

    setPlayers(updatedPlayers);
    setCurrentTurn(nextTurn);

    localStorage.setItem(
      "kulsMapState",
      JSON.stringify({
        savedPlayersState: updatedPlayers,
        savedTurn: nextTurn,
      }),
    );

    if (targetTile > 0 && targetTile < 13) {
      const minigames = ["sing_the_jingle", "link_it_up"];
      const randomGame =
        minigames[Math.floor(Math.random() * minigames.length)];

      setTimeout(() => {
        navigate("/gameDetail", {
          state: {
            gameType: randomGame,
            playerName: currentPlayerName,
            tileIndex: targetTile,
            // TAMBAHKAN BARIS INI AGAR LINK IT UP MENERIMA AVATAR PEMAIN
            players: updatedPlayers,
          },
        });
      }, 1500);
    }
  };

  const mapTitleText = "KULSTOPIA".split("");
  const nextColors = ["#F37021", "#247B5B", "#F14624", "#6259A8"];

  return (
    <div className="min-h-screen bg-[#2d7350] flex flex-col items-center justify-center p-4 font-poppins relative">
      {/* --- MODAL INTRO PETA --- */}
      {showMapIntro && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FFFDF0] p-6 animate-fadeIn">
          {/* ... (Kode Modal Intro tetap sama, saya skip komentar tambahan di sini) ... */}
          <div className="w-full max-w-5xl flex flex-col items-center relative">
            <div className="flex flex-wrap justify-center gap-1 mb-12">
              {mapTitleText.map((char, index) => (
                <span
                  key={index}
                  className={`text-6xl md:text-8xl font-['Irish_Grover'] font-black inline-block transform ${index % 2 === 0 ? "rotate-2" : "-rotate-2"} drop-shadow-[3px_3px_0px_#222] text-[#247B5B]`}
                >
                  {char}
                </span>
              ))}
            </div>

            <div
              className="w-full max-w-4xl bg-[#E58EB5] py-16 px-8 md:px-16 flex items-center justify-center shadow-lg relative min-h-[220px]"
              style={{
                clipPath:
                  "polygon(40px 0, calc(100% - 40px) 0, 100% 40px, 100% calc(100% - 40px), calc(100% - 40px) 100%, 40px 100%, 0 calc(100% - 40px), 0 40px)",
              }}
            >
              <h2 className="text-3xl md:text-5xl font-semibold text-white text-center leading-snug">
                {introStep === 0 && (
                  <>
                    <span className="font-extrabold drop-shadow-sm">
                      Roll the dice
                    </span>
                    , move forward, <br />
                    and take on the{" "}
                    <span className="font-extrabold drop-shadow-sm">
                      challenge
                    </span>{" "}
                    in <br />
                    each tile.
                  </>
                )}
                {introStep === 1 && (
                  <>
                    <span className="font-extrabold drop-shadow-sm">
                      Complete challenges
                    </span>{" "}
                    to{" "}
                    <span className="font-extrabold drop-shadow-sm">
                      earn <br />
                      points along
                    </span>{" "}
                    the way.
                  </>
                )}
                {introStep === 2 && (
                  <>
                    <span className="font-extrabold drop-shadow-sm">
                      Highest score
                    </span>{" "}
                    at the end{" "}
                    <span className="font-extrabold drop-shadow-sm">wins.</span>
                  </>
                )}
              </h2>
            </div>

            <div className="w-full max-w-4xl flex justify-end mt-8">
              <button
                onClick={() => {
                  if (introStep < 2) {
                    setIntroStep(introStep + 1);
                  } else {
                    setShowMapIntro(false);
                  }
                }}
                className="bg-[#E58EB5] px-8 py-4 flex items-center gap-1 hover:scale-105 active:scale-95 transition-transform shadow-md"
                style={{
                  clipPath:
                    "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)",
                }}
              >
                {(introStep < 2
                  ? ["N", "E", "X", "T"]
                  : ["P", "L", "A", "Y"]
                ).map((char, i) => (
                  <span
                    key={i}
                    className="text-4xl font-['Irish_Grover'] drop-shadow-[2px_2px_0px_#222]"
                    style={{ color: nextColors[i] }}
                  >
                    {char}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- KONTEN UTAMA PETA --- */}
      {/* DIPERKECIL DI SINI: max-w-[1200px] menjadi max-w-[900px] */}
      <div
        className={`relative w-full max-w-[900px] ${showMapIntro ? "hidden" : "block"}`}
      >
        {/* CANVAS PETA */}
        <canvas
          ref={canvasRef}
          className="w-full rounded-[2rem] shadow-2xl bg-[#E8D1A7] block"
        />

        {/* HUD 1: DADU DI POJOK KANAN ATAS PETA */}
        {/* Karena peta mengecil, Dadu kita geser keluar sedikit menggunakan min-right */}
        <div className="absolute top-4 right-4 md:-right-6 md:-top-4 bg-white p-2 md:p-3 rounded-2xl shadow-xl flex flex-col items-center border-4 border-[#2d7350]">
          <div className="hover:scale-105 active:scale-95 transition-transform cursor-pointer">
            <DiceRoll onRoll={handleRoll} size={60} faceDotColor="#111" />
          </div>
          {lastRoll && (
            <span className="text-sm font-bold text-slate-500 mt-2">
              +{lastRoll}
            </span>
          )}
        </div>

        {/* HUD 2: SCOREBOARD DI POJOK KANAN BAWAH PETA */}
        <div className="absolute bottom-4 right-4 md:-right-6 md:-bottom-4 flex flex-col items-center drop-shadow-xl z-10">
          {/* Header Score Kuning */}
          <div
            className="bg-[#C4D600] text-white font-['Irish_Grover'] text-xl md:text-2xl px-5 py-1 relative top-2 z-10 border-2 border-white/50"
            style={{
              borderRadius: "50% 50% 50% 50% / 30% 30% 70% 70%",
              transform: "rotate(-2deg)",
            }}
          >
            SCORE
          </div>

          {/* Kotak Putih Avatar Pemain */}
          <div className="bg-white rounded-2xl p-2 pt-5 md:p-3 md:pt-6 flex gap-2 justify-center items-end shadow-[0_8px_0_rgba(0,0,0,0.1)] min-w-[140px] border-4 border-[#2d7350]">
            {players.map((player, index) => (
              <div
                key={index}
                className={`flex flex-col items-center bg-[#E5D7D3] rounded-full pb-1 w-8 h-12 md:w-10 md:h-16 justify-end relative transition-all ${currentTurn === index ? "shadow-[0_0_10px_rgba(243,112,33,0.5)] scale-105" : "opacity-80"}`}
              >
                {/* Penanda Giliran Pemain */}
                {currentTurn === index && (
                  <div className="absolute -top-4 md:-top-5 text-lg animate-bounce">
                    🔻
                  </div>
                )}

                {/* Warna/Avatar Pemain */}
                <div
                  className="absolute top-1 md:top-2 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: player.color }}
                ></div>

                {/* Inisial Pemain */}
                <span className="font-bold text-slate-600 text-[9px] md:text-[10px] mt-auto">
                  {player.name.substring(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tombol Keluar (Pindah ke Pojok Kiri Bawah) */}
      <Link
        to="/peminatan/kuls"
        onClick={() => localStorage.removeItem("kulsMapState")}
        className={`absolute bottom-8 left-8 rounded-full border border-white/40 bg-white/90 px-6 py-3 text-sm font-bold text-[#2e8555] shadow-xl backdrop-blur-sm hover:bg-white hover:scale-105 transition ${showMapIntro ? "hidden" : "flex"}`}
      >
        Keluar Game
      </Link>
    </div>
  );
};

export default Map;
