import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import DiceRoll from "react-dice-roll";
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
    { x: 0.097, y: 0.85 },
    { x: 0.39, y: 0.79 },
    { x: 0.52, y: 0.78 },
    { x: 0.68, y: 0.86 },
    { x: 0.82, y: 0.62 },
    { x: 0.72, y: 0.44 },
    { x: 0.55, y: 0.43 },
    { x: 0.38, y: 0.49 },
    { x: 0.24, y: 0.53 },
    { x: 0.14, y: 0.32 },
    { x: 0.22, y: 0.17 },
    { x: 0.38, y: 0.14 },
    { x: 0.55, y: 0.15 },
    { x: 0.82, y: 0.18 },
  ];
  return relativePoints.map((p) => ({ x: p.x * width, y: p.y * height }));
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

  // 🔥 FLAG ANTI-INFINITE LOOP
  const processedResultKey = useRef(null);

  // --- STATE UNTUK MODAL TUTORIAL ---
  const [showMapIntro, setShowMapIntro] = useState(false);
  const [introStep, setIntroStep] = useState(0);

  const savedPlayers = location.state?.players || [];

  // Hide Navbar saat masuk Map
  useEffect(() => {
    if (setNavbarVisible) {
      setNavbarVisible(false);
      return () => setNavbarVisible(true);
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
          score: 0,
        }))
      : [{ id: 0, name: "P1", color: "#2563eb", tile: 0, score: 0 }];

    setPlayers(normalized);
  }, [savedPlayers]);

  // 🔥 FIX: Handle game result dari GameDetail
  // 🔥 FIX BUG: Handle game result dari GameDetail
  useEffect(() => {
    const state = location.state;

    if (
      state &&
      state.gameResult !== undefined &&
      state.gameType &&
      state.playerName &&
      processedResultKey.current !== location.key
    ) {
      processedResultKey.current = location.key;

      setPlayers((prevPlayers) => {
        const updatedPlayers = prevPlayers.map((player) => {
          if (state.gameType === "sing_the_jingle") {
            if (player.id !== state.playerId) return player;
            return {
              ...player,
              score: player.score + Number(state.gameResult),
            };
          }

          if (state.gameType === "link_it_up") {
            const position = state.gameResult.indexOf(player.id) + 1;
            const bonus =
              position === 1 ? 3 : position === 2 ? 2 : position === 3 ? 1 : 0;
            return { ...player, score: player.score + bonus };
          }

          return player;
        });

        // 🔥 KUNCI SOLUSI DI SINI 🔥
        // Ambil savedTurn yang ASLI dari localStorage, JANGAN pake currentTurn yang lagi telat update
        const activeState = JSON.parse(
          localStorage.getItem("kulsMapState") || "{}",
        );
        const realTurn =
          activeState.savedTurn !== undefined
            ? activeState.savedTurn
            : currentTurn;

        // Simpan ke localStorage pake realTurn
        localStorage.setItem(
          "kulsMapState",
          JSON.stringify({
            savedPlayersState: updatedPlayers,
            savedTurn: realTurn,
          }),
        );

        return updatedPlayers;
      });

      window.history.replaceState({}, document.title);
    }
  }, [location, currentTurn]);

  // 🔥 FIX: Pindahkan logika Cek Finish dan Navigate Leaderboard ke sini
  useEffect(() => {
    if (players.length > 0) {
      const allFinished = players.every((player) => player.tile === 13);
      if (allFinished) {
        setTimeout(() => {
          navigate("/leaderboard", { state: { players: players } });
        }, 1500);
      }
    }
  }, [players, navigate]);

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

    // Cari giliran selanjutnya yang belum finish
    let nextTurn = (currentTurn + 1) % players.length;
    let safeGuard = 0;
    while (players[nextTurn]?.tile === 13 && safeGuard < players.length) {
      nextTurn = (nextTurn + 1) % players.length;
      safeGuard++;
    }

    let targetTile = 0;
    let currentPlayerId = null;

    const updatedPlayers = players.map((player, index) => {
      if (index !== currentTurn) return player;

      const newTile = player.tile + value;
      targetTile = Math.min(newTile, 13);
      currentPlayerId = player.id;

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
            playerId: currentPlayerId,
            playerName: updatedPlayers.find((p) => p.id === currentPlayerId)
              .name,
            tileIndex: targetTile,
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
                      earn <br /> points along
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
      <div
        className={`flex flex-col lg:flex-row items-start gap-6 ${showMapIntro ? "hidden" : "flex"}`}
      >
        <div className="relative w-full max-w-[900px]">
          <canvas
            ref={canvasRef}
            className="w-full rounded-[2rem] shadow-2xl bg-[#E8D1A7] block border-4 border-white/20"
          />

          <div className="absolute top-4 right-4 bg-white p-2 md:p-3 rounded-2xl shadow-xl flex flex-col items-center border-4 border-[#2d7350]">
            <div className="hover:scale-105 active:scale-95 transition-transform cursor-pointer">
              <DiceRoll onRoll={handleRoll} size={50} faceDotColor="#111" />
            </div>
            {lastRoll && (
              <span className="text-xs font-bold text-slate-500 mt-1">
                +{lastRoll}
              </span>
            )}
          </div>
        </div>

        <div className="z-10 shrink-0">
          <div className="bg-white rounded-[28px] border-4 border-[#2d7350] shadow-[8px_8px_0px_rgba(0,0,0,0.15)] overflow-hidden w-full lg:w-64">
            <div className="bg-[#C4D600] text-white font-['Irish_Grover'] text-base md:text-lg px-4 py-2 uppercase tracking-[0.24em] text-center">
              Turn & Skor
            </div>
            <div className="p-3 space-y-2">
              {players.map((player, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between gap-3 p-3 rounded-2xl border transition ${
                    currentTurn === index
                      ? "border-[#F37021] bg-[#fff8e0] shadow-[0_0_12px_rgba(243,112,33,0.25)] scale-[1.02]"
                      : "border-transparent bg-[#f7f5f0]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="inline-flex h-3.5 w-3.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: player.color }}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {player.name}
                      </p>
                      {currentTurn === index && (
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#92561f] animate-pulse">
                          giliran
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      skor
                    </p>
                    <p className="text-lg font-black text-slate-800 leading-none">
                      {player.score}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

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
