import React, { useState, useEffect } from "react";

// Daftar Brand (Bisa dipindah ke data.json nanti)
// Untuk sementara saya pakai URL gambar publik & teks agar langsung terlihat bagus
const BRAND_LIST = [
  {
    id: "crocs",
    type: "img",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Crocs_logo_black.svg/512px-Crocs_logo_black.svg.png",
  },
  {
    id: "apple",
    type: "img",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  },
  {
    id: "puma",
    type: "img",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Puma_Logo.svg/512px-Puma_Logo.svg.png",
  },
  {
    id: "asus",
    type: "img",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/512px-ASUS_Logo.svg.png",
  },
  {
    id: "corkcicle",
    type: "text",
    text: "CORKCICLE.",
    font: "font-black tracking-tighter",
  },
  { id: "locknlock", type: "text", text: "LocknLock", font: "font-bold" },
  {
    id: "longchamp",
    type: "text",
    text: "LONGCHAMP",
    font: "font-serif tracking-widest uppercase",
  },
  {
    id: "fabercastell",
    type: "text",
    text: "Faber Castell",
    font: "font-serif",
  },
];

const LinkItUp = ({
  // Menerima daftar semua pemain dari Map/GameDetail
  players = [
    { id: 0, name: "P1", color: "#ef4444" },
    { id: 1, name: "P2", color: "#6366f1" },
    { id: 2, name: "P3", color: "#f97316" },
  ],
  onChallengeDone,
}) => {
  const [showIntro, setShowIntro] = useState(true);
  const [introStep, setIntroStep] = useState(0);

  const [targetBrand, setTargetBrand] = useState(null);
  const [clickedPlayers, setClickedPlayers] = useState([]); // Menyimpan urutan klik
  const [showScoreScreen, setShowScoreScreen] = useState(false);

  // Acak logo saat komponen dimuat
  useEffect(() => {
    const randomBrand =
      BRAND_LIST[Math.floor(Math.random() * BRAND_LIST.length)];
    setTargetBrand(randomBrand);
  }, []);

  // Logika saat avatar diklik
  const handlePlayerClick = (playerId) => {
    // Jika belum diklik, masukkan ke daftar
    if (!clickedPlayers.includes(playerId)) {
      const newClickedOrder = [...clickedPlayers, playerId];
      setClickedPlayers(newClickedOrder);

      // Jika semua pemain sudah klik, selesaikan game
      if (newClickedOrder.length === players.length) {
        setTimeout(() => {
          setShowScoreScreen(true);
          // Beri jeda lalu kembalikan skor ke Map
          setTimeout(() => {
            if (onChallengeDone) {
              // Kita bisa mengirim objek skor kembali (Opsional tergantung logika Map)
              onChallengeDone(newClickedOrder);
            }
          }, 4000);
        }, 500);
      }
    }
  };

  const titleText = "LINK IT UP".split("");
  const raceTitleText = "RACE AND FIND IT !".split("");
  const nextColors = ["#F37021", "#247B5B", "#F14624", "#6259A8"];
  const titleColors = ["#F37021", "#E58EB5", "#F14624", "#247B5B", "#6259A8"];

  return (
    <div className="min-h-screen w-full bg-[#FFFDF0] flex flex-col items-center justify-center font-poppins relative overflow-hidden p-6">
      {/* --- MODAL INTRO (TUTORIAL 3 STEP) --- */}
      {showIntro && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FFFDF0] p-6 animate-fadeIn">
          <div className="w-full max-w-4xl flex flex-col items-center relative">
            {/* Judul LINK IT UP */}
            <div className="flex flex-wrap justify-center gap-1 mb-8">
              {titleText.map((char, index) => {
                if (char === " ") return <span key={index} className="w-4" />;
                return (
                  <span
                    key={index}
                    className="text-5xl md:text-7xl font-['Irish_Grover'] font-black inline-block transform rotate-2 drop-shadow-[2px_2px_0px_#222]"
                    style={{ color: titleColors[index % titleColors.length] }}
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Banner Pink Instruksi */}
            <div
              className="w-full bg-[#E58EB5] py-16 px-12 md:px-20 flex items-center justify-center shadow-lg relative min-h-[200px]"
              style={{
                clipPath:
                  "polygon(30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px), 0 30px)",
              }}
            >
              {/* Panah Kiri (Muncul di Step 1 & 2) */}
              {introStep > 0 && (
                <span
                  className="absolute left-8 md:left-12 text-5xl md:text-7xl text-[#247B5B] font-black drop-shadow-md cursor-pointer"
                  onClick={() => setIntroStep(introStep - 1)}
                >
                  &lt;
                </span>
              )}

              <h2 className="text-2xl md:text-4xl font-medium text-white text-center leading-snug max-w-xl mx-auto">
                {introStep === 0 && (
                  <>
                    Spot and grab a{" "}
                    <span className="font-black drop-shadow-sm">
                      real-life <br /> object
                    </span>{" "}
                    around you that <br /> matches the brand.
                  </>
                )}
                {introStep === 1 && (
                  <>
                    Show it, then{" "}
                    <span className="font-black drop-shadow-sm">
                      hit the <br /> button as fast
                    </span>{" "}
                    as you can.
                  </>
                )}
                {introStep === 2 && (
                  <>
                    The{" "}
                    <span className="font-black drop-shadow-sm">fastest</span>{" "}
                    valid match <br />{" "}
                    <span className="font-black drop-shadow-sm">
                      earns points
                    </span>
                    .
                  </>
                )}
              </h2>

              {/* Panah Kanan (Muncul di Step 0 & 1) */}
              {introStep < 2 && (
                <span
                  className="absolute right-8 md:right-12 text-5xl md:text-7xl text-[#247B5B] font-black drop-shadow-md cursor-pointer"
                  onClick={() => setIntroStep(introStep + 1)}
                >
                  &gt;
                </span>
              )}
            </div>

            {/* Tombol NEXT / PLAY */}
            <div className="w-full flex justify-end mt-8">
              <button
                onClick={() => {
                  if (introStep < 2) setIntroStep(introStep + 1);
                  else setShowIntro(false);
                }}
                className="bg-[#E58EB5] px-8 py-3 flex items-center gap-1 hover:scale-105 active:scale-95 transition-transform shadow-md"
                style={{
                  clipPath:
                    "polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)",
                }}
              >
                {(introStep < 2
                  ? ["N", "E", "X", "T"]
                  : ["P", "L", "A", "Y"]
                ).map((char, i) => (
                  <span
                    key={i}
                    className="text-3xl font-['Irish_Grover'] drop-shadow-[2px_2px_0px_#222]"
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

      {/* --- LAYAR UTAMA GAME --- */}
      <div
        className={`w-full max-w-4xl flex flex-col items-center transition-all duration-500 ${showScoreScreen ? "scale-90 opacity-0" : "scale-100 opacity-100"} ${showIntro ? "hidden" : "flex"}`}
      >
        {/* Judul RACE AND FIND IT ! */}
        <div className="flex flex-wrap justify-center gap-1 mb-8">
          {raceTitleText.map((char, index) => {
            if (char === " ") return <span key={index} className="w-3" />;
            return (
              <span
                key={index}
                className="text-4xl md:text-6xl font-['Irish_Grover'] font-black inline-block transform -rotate-1 drop-shadow-[2px_2px_0px_#222]"
                style={{ color: titleColors[index % titleColors.length] }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* AREA LOGO BRAND */}
        <div
          className="w-full max-w-[500px] aspect-[4/3] bg-[#E58EB5] flex items-center justify-center shadow-xl p-8 mb-12"
          style={{
            clipPath:
              "polygon(30px 0, calc(100% - 30px) 0, 100% 30px, 100% calc(100% - 30px), calc(100% - 30px) 100%, 30px 100%, 0 calc(100% - 30px), 0 30px)",
          }}
        >
          {targetBrand && targetBrand.type === "img" ? (
            <img
              src={targetBrand.src}
              alt="Brand Logo"
              className="max-w-[80%] max-h-[80%] object-contain drop-shadow-md"
            />
          ) : targetBrand ? (
            <span
              className={`text-4xl md:text-6xl text-black ${targetBrand.font}`}
            >
              {targetBrand.text}
            </span>
          ) : null}
        </div>

        {/* AREA AVATAR PEMAIN (TOMBOL KLIK) */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {players.map((player) => {
            const isClicked = clickedPlayers.includes(player.id);
            const clickRank = clickedPlayers.indexOf(player.id) + 1; // Juara 1, 2, 3...

            return (
              <button
                key={player.id}
                onClick={() => handlePlayerClick(player.id)}
                disabled={isClicked}
                className={`relative flex flex-col items-center transition-all duration-300 ${isClicked ? "opacity-50 scale-95" : "hover:scale-110 active:scale-95 animate-bounce"}`}
              >
                {/* Visual Avatar ala Bawang/Turnip */}
                <div className="relative w-20 h-20 md:w-24 md:h-24">
                  {/* Daun Hijau di atas */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-8 flex justify-center gap-1">
                    <div className="w-4 h-6 bg-[#247B5B] rounded-full rotate-[-30deg]"></div>
                    <div className="w-5 h-8 bg-[#247B5B] rounded-full"></div>
                  </div>

                  {/* Badan Karakter (Sesuai warna pemain) */}
                  <div
                    className="w-full h-full rounded-full border-4 border-white flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: player.color }}
                  >
                    {/* Wajah Imut */}
                    <div className="flex gap-2">
                      <div className="w-2 h-4 bg-white rounded-full"></div>
                      <div className="w-2 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Kaki Kecil */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-4">
                    <div className="w-4 h-3 bg-amber-900 rounded-sm"></div>
                    <div className="w-4 h-3 bg-amber-900 rounded-sm"></div>
                  </div>
                </div>

                <span className="mt-4 font-black text-xl text-slate-700 bg-white px-3 rounded-full border-2 border-slate-200">
                  {player.name}
                </span>

                {/* Indikator Juara Jika Sudah Klik */}
                {isClicked && (
                  <div className="absolute -top-4 -right-4 w-10 h-10 bg-yellow-400 rounded-full border-4 border-white flex items-center justify-center font-black text-xl text-yellow-900 shadow-md transform rotate-12">
                    #{clickRank}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* --- LAYAR SKOR (SCOREBOARD AKHIR) --- */}
      {showScoreScreen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center">
          <div className="absolute inset-0 bg-[#F37021]">
            <svg
              className="absolute top-0 left-0 w-full h-full"
              viewBox="0 0 1000 500"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 C150,0 200,100 250,250 C300,400 200,500 0,500 Z"
                fill="#E58EB5"
              />
              <path
                d="M250,0 C350,0 450,150 500,250 C550,350 450,500 350,500 L1000,500 L1000,0 Z"
                fill="#F14624"
              />
              <path
                d="M1000,0 L750,0 C800,100 850,250 800,350 C750,450 800,500 1000,500 Z"
                fill="#6259A8"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col gap-4 items-center animate-slideUp">
            <h2 className="text-5xl font-['Irish_Grover'] text-white drop-shadow-xl mb-4">
              FINAL RESULTS
            </h2>
            {clickedPlayers.map((pId, index) => {
              const player = players.find((p) => p.id === pId);
              // Logika Poin: Juara 1 = 3, Juara 2 = 2, Juara 3 = 1, sisanya 0
              let points = 0;
              if (index === 0) points = 3;
              else if (index === 1) points = 2;
              else if (index === 2) points = 1;

              return (
                <div
                  key={pId}
                  className="bg-[#FFFDF0] px-8 py-4 flex items-center justify-between gap-8 shadow-2xl w-[350px]"
                  style={{
                    clipPath:
                      "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-black text-slate-400">
                      #{index + 1}
                    </span>
                    <span className="text-[#247B5B] font-['Irish_Grover'] text-3xl uppercase">
                      {player?.name}
                    </span>
                  </div>
                  <div
                    className={`text-white font-['Irish_Grover'] text-3xl px-4 py-1 shadow-lg transform rotate-3 ${points > 0 ? "bg-[#F14624]" : "bg-slate-400"}`}
                    style={{
                      borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                    }}
                  >
                    +{points}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkItUp;
