import React, { useEffect, useRef, useState } from "react";

const Monopoli = () => {
  const canvasRef = useRef(null);
  const [playerPos, setPlayerPos] = useState(0);

  const size = 500;
  const tileCount = 10;
  const tileSize = size / tileCount;

  const getPath = () => {
    const path = [];

    // atas
    for (let i = 0; i < 10; i++) path.push([i, 0]);
    // kanan
    for (let i = 1; i < 10; i++) path.push([9, i]);
    // bawah
    for (let i = 8; i >= 0; i--) path.push([i, 9]);
    // kiri
    for (let i = 8; i > 0; i--) path.push([0, i]);

    return path;
  };

  const drawBoard = (ctx) => {
    for (let i = 0; i < tileCount; i++) {
      for (let j = 0; j < tileCount; j++) {
        if (i === 0 || i === tileCount - 1 || j === 0 || j === tileCount - 1) {
          ctx.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize);
        }
      }
    }
  };

  const drawPlayer = (ctx, pos) => {
    const path = getPath();
    const [x, y] = path[pos % path.length];

    ctx.beginPath();
    ctx.arc(
      x * tileSize + tileSize / 2,
      y * tileSize + tileSize / 2,
      10,
      0,
      Math.PI * 2,
    );
    ctx.fillStyle = "red";
    ctx.fill();
  };

  const draw = (ctx) => {
    ctx.clearRect(0, 0, size, size);
    drawBoard(ctx);
    drawPlayer(ctx, playerPos);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    draw(ctx);
  }, [playerPos]);

  const rollDice = () => {
    const dice = Math.floor(Math.random() * 6) + 1;
    setPlayerPos((prev) => prev + dice);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <canvas ref={canvasRef} width={size} height={size} className="border" />
      <button
        onClick={rollDice}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Roll Dice 🎲
      </button>
    </div>
  );
};

export default Monopoli;
