import React, { useState, useEffect } from "react";

const JINGLE_VIDEOS = [
  "dQw4w9WgXcQ", // Gantilah dengan ID video jingle iklan asli
  "3JZ_D3ELwOQ",
  "L_jWHffIx5E",
];

const JingleChallenge = ({ playerName = "Player 1", onChallengeDone }) => {
  const [videoId, setVideoId] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showScoreScreen, setShowScoreScreen] = useState(false);

  useEffect(() => {
    const randomVideo =
      JINGLE_VIDEOS[Math.floor(Math.random() * JINGLE_VIDEOS.length)];
    setVideoId(randomVideo);
  }, []);

  const handleManualEnd = () => {
    setIsEvaluating(true);
  };

  const handleEvaluation = (success) => {
    setIsEvaluating(false);
    if (success) {
      setShowScoreScreen(true);
      setTimeout(() => {
        if (onChallengeDone) onChallengeDone(3);
      }, 3000);
    } else {
      if (onChallengeDone) onChallengeDone(0);
    }
  };

  const titleColors = ["#F37021", "#E58EB5", "#F14624", "#247B5B", "#6259A8"];
  const titleText = "SING THE JINGLE".split("");

  return (
    <div className="h-full w-full bg-[#FFFDF0] flex flex-col items-center justify-center font-poppins relative overflow-hidden p-6">
      {/* 1. LAYAR UTAMA */}
      <div
        className={`w-full max-w-5xl flex flex-col items-center transition-all duration-500 ${showScoreScreen ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
      >
        {/* Judul Warna-Warni */}
        <div className="flex flex-wrap justify-center gap-1 mb-8">
          {titleText.map((char, index) => {
            if (char === " ") return <span key={index} className="w-4" />;
            const color = titleColors[index % titleColors.length];
            return (
              <span
                key={index}
                className="text-5xl md:text-7xl font-['Irish_Grover'] font-black inline-block transform rotate-2 drop-shadow-[3px_3px_0px_#fff]"
                style={{ color: color }}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Video Player (Iframe) */}
        <div className="w-full max-w-[700px] aspect-video bg-black rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white relative">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&modestbranding=1`}
            title="Jingle Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>

        {/* Tombol Selesai (Trigger Manual) */}
        <button
          onClick={handleManualEnd}
          className="mt-8 bg-[#247B5B] text-white px-10 py-4 rounded-full font-black text-2xl shadow-xl hover:scale-105 active:scale-95 transition-all animate-bounce"
        >
          SELESAI MENYANYI! 🎤
        </button>
      </div>

      {/* 2. MODAL EVALUASI */}
      {isEvaluating && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-sm mx-4">
            <h2 className="text-3xl font-['Irish_Grover'] text-[#247B5B] mb-6">
              GIMANA HASILNYA?
            </h2>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleEvaluation(true)}
                className="w-full py-4 rounded-2xl bg-[#F37021] text-white font-bold text-xl"
              >
                KEREN BANGET! 🎉 (+3)
              </button>
              <button
                onClick={() => handleEvaluation(false)}
                className="w-full py-4 rounded-2xl bg-slate-200 text-slate-500 font-bold"
              >
                MAAF, GAGAL... 👎
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. LAYAR SKOR (PERBAIKAN STYLE SESUAI GAMBAR KEDUA) */}
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

          <div
            className="relative z-10 bg-[#FFFDF0] px-12 py-6 flex items-center gap-6 shadow-2xl"
            style={{
              clipPath:
                "polygon(15px 0, calc(100% - 15px) 0, 100% 15px, 100% calc(100% - 15px), calc(100% - 15px) 100%, 15px 100%, 0 calc(100% - 15px), 0 15px)",
            }}
          >
            <span className="text-[#247B5B] font-['Irish_Grover'] text-5xl uppercase tracking-wider">
              {playerName} SCORE
            </span>
            <div
              className="bg-[#F14624] text-white font-['Irish_Grover'] text-5xl px-6 py-2 shadow-lg rotate-6"
              style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }}
            >
              +3
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JingleChallenge;
