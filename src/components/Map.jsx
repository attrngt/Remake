import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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

const getPathPoints = (width, height, steps) => {
  return Array.from({ length: steps }, (_, index) => {
    const ratio = index / (steps - 1);
    return {
      x: width * (0.1 + 0.8 * ratio),
      y: height * (0.45 + Math.sin(ratio * Math.PI * 2) * 0.08),
    };
  });
};

const Map = () => {
  const canvasRef = useRef(null);
  const imageRef = useRef(new Image());
  const location = useLocation();
  const [players, setPlayers] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [lastRoll, setLastRoll] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const savedPlayers = location.state?.players || [];

  useEffect(() => {
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
    const steps = 20;
    const pathPoints = getPathPoints(width, height, steps);

    ctx.clearRect(0, 0, width, height);

    if (mapLoaded) {
      ctx.drawImage(imageRef.current, 0, 0, width, height);
    } else {
      ctx.fillStyle = "#e2e8f0";
      ctx.fillRect(0, 0, width, height);
    }

    ctx.strokeStyle = "rgba(255,255,255,0.85)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    pathPoints.forEach((point, index) => {
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.stroke();

    ctx.fillStyle = "rgba(255,255,255,0.9)";
    pathPoints.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    players.forEach((player, index) => {
      const tileIndex = Math.min(player.tile, steps - 1);
      const { x, y } = pathPoints[tileIndex];

      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fillStyle = player.color;
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(player.name, x, y - 28);
      ctx.fillText(index + 1, x, y + 6);
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const width = Math.min(window.innerWidth - 32, 1200);
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

  const handleRoll = (value) => {
    setLastRoll(value);
    setPlayers((current) =>
      current.map((player, index) => {
        if (index !== currentTurn) return player;
        return {
          ...player,
          tile: Math.min(player.tile + value, 19),
        };
      }),
    );
    setCurrentTurn((currentTurn + 1) % players.length);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 pb-2">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">KULSTOPIA MAP</h1>
            <p className=" text-xl text-black font-bold">
              Pemain: {players.length} • Giliran: {players[currentTurn]?.name}
            </p>
          </div>
          <Link
            to="/peminatan/kuls"
            className="inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Keluar ke Kuls
          </Link>
        </div>

        <div
          className="mx-auto flex flex-col lg:flex-row items-start justify-between gap-6"
          style={{ width: "100%", maxWidth: "1200px" }}
        >
          <div
            className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm"
            style={{ width: "70vw", maxWidth: "840px" }}
          >
            <canvas
              ref={canvasRef}
              className="w-full rounded-3xl"
              style={{ display: "block" }}
            />
          </div>

          <div
            className="rounded-3xl p-4 text-center shadow-2xl ring-1 ring-slate-200 backdrop-blur-sm"
            style={{ minWidth: "180px" }}
          >
            <div className="text-2xl font-bold text-slate-600 pb-3">ROLL</div>
            <DiceRoll onRoll={handleRoll} size={80} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;
