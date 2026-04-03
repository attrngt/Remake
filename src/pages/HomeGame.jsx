import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const avatars = [
  { id: 1, label: "Avatar 1", color: "bg-blue-500" },
  { id: 2, label: "Avatar 2", color: "bg-red-500" },
  { id: 3, label: "Avatar 3", color: "bg-green-500" },
  { id: 4, label: "Avatar 4", color: "bg-indigo-500" },
  { id: 5, label: "Avatar 5", color: "bg-orange-500" },
];

const HomeGame = ({ navbarVisible, setNavbarVisible }) => {
  const [playerCount, setPlayerCount] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State baru untuk custom dropdown
  const [step, setStep] = useState("select");
  const [players, setPlayers] = useState([]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [avatarSlot, setAvatarSlot] = useState(0);

  const navigate = useNavigate();

  const openWarning = (message) => {
    setWarningMessage(message);
    setWarningOpen(true);
  };

  const closeWarning = () => setWarningOpen(false);

  const handlePlayClick = () => {
    if (!playerCount) {
      openWarning("Pilih jumlah pemain dulu di menu sebelah tombol Play.");
      return;
    }

    const count = Number(playerCount);
    const initialPlayers = Array.from({ length: count }, (_, index) => ({
      id: index,
      name: "",
      avatar: null,
    }));

    setPlayers(initialPlayers);
    setActivePlayer(0);
    setStep("setup");
  };

  const handlePlayerNameChange = (index, value) => {
    setPlayers((current) =>
      current.map((player, idx) =>
        idx === index ? { ...player, name: value } : player,
      ),
    );
  };

  const openAvatarModal = (index) => {
    setAvatarSlot(index);
    setAvatarModalOpen(true);
  };

  const handleAvatarSelect = (avatar) => {
    setPlayers((current) =>
      current.map((player, idx) =>
        idx === avatarSlot ? { ...player, avatar } : player,
      ),
    );
    setActivePlayer(avatarSlot);
    setAvatarModalOpen(false);
  };

  const canStart =
    players.length > 0 &&
    players.every(
      (player) => player.name.trim().length > 0 && player.avatar !== null,
    );

  const handleStartClick = () => {
    if (!canStart) {
      openWarning("Lengkapi nama dan avatar untuk semua pemain dulu.");
      return;
    }

    const storagePlayers = players.map((player) => ({
      name: player.name,
      avatarLabel: player.avatar?.label ?? "",
      colorClass: player.avatar?.color ?? "bg-slate-500",
    }));

    localStorage.setItem("homeGamePlayers", JSON.stringify(storagePlayers));

    // Hapus memori state map sebelumnya agar permainan dimulai benar-benar baru
    localStorage.removeItem("kulsMapState");

    navigate("/Map", { state: { players } });
  };

  const toggleNavbar = () => setNavbarVisible(!navbarVisible);

  return (
    <>
      <div
        className={`relative min-h-screen w-full overflow-hidden flex flex-col items-center gap-6 px-6 pb-6 ${
          navbarVisible ? "pt-24" : "pt-6"
        } font-poppins`}
      >
        {/* --- 1. BACKGROUND WAVY SVG --- */}
        <div className="absolute inset-0 -z-10">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 1000 500"
            preserveAspectRatio="none"
          >
            {/* Base Orange */}
            <path d="M0,0 L1000,0 L1000,500 L0,500 Z" fill="#F37021" />
            {/* Pink Wave */}
            <path
              d="M245,0 C260,150 150,250 100,350 C50,450 150,500 340,500 L0,500 L0,0 Z"
              fill="#E58EB5"
            />
            {/* Red Wave */}
            <path
              d="M340,500 C150,500 50,450 100,350 C150,250 260,150 245,0 L500,0 C480,150 550,250 600,350 C650,450 550,500 340,500 Z"
              fill="#F14624"
            />
            {/* Purple Wave */}
            <path
              d="M1000,0 L800,0 C820,150 750,250 700,350 C650,450 750,500 1000,500 Z"
              fill="#6259A8"
            />
          </svg>
        </div>

        {/* --- 2. MODALS --- */}
        {warningOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6">
            <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl text-center">
              <h3 className="text-2xl font-black text-red-500 mb-4">
                Perhatian!
              </h3>
              <p className="text-slate-600 font-medium mb-6">
                {warningMessage}
              </p>
              <button
                type="button"
                onClick={closeWarning}
                className="w-full rounded-full bg-[#2e8555] px-5 py-3 text-lg font-bold text-white hover:brightness-110"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {avatarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-[2.5rem] bg-white p-8 shadow-2xl">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black text-[#2e8555]">
                    Avatar Pemain {avatarSlot + 1}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Pilih salah satu avatar di bawah ini.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAvatarModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700 text-3xl font-bold leading-none"
                >
                  ×
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 max-h-[60vh] overflow-y-auto">
                {avatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => handleAvatarSelect(avatar)}
                    className="flex items-center gap-4 rounded-3xl border-2 border-slate-100 bg-white p-4 text-left transition hover:border-[#2e8555] hover:bg-slate-50"
                  >
                    <div
                      className={`h-14 w-14 rounded-full ${avatar.color} flex items-center justify-center text-lg font-bold text-white shadow-md`}
                    >
                      {avatar.label.slice(-1)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{avatar.label}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 3. KONTEN UTAMA --- */}
        {step === "select" ? (
          <div className="flex flex-col items-center gap-7 text-center relative z-10 pt-7">
            {/* Judul KULSTOPIA */}
            <h1 className="text-8xl md:text-[11rem] font-irish text-[#247B5B] drop-shadow-[10px_10px_0px_white] tracking-tighter leading-none transform -rotate-2 font-['Irish_Grover']">
              KULSTOPIA
            </h1>

            {/* CUSTOM DROPDOWN & PLAY KAPSUL */}
            <div className="relative flex flex-col items-center z-20">
              <div className="inline-flex items-center bg-[#cfcfcf] rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.2)] p-1.5 border-[3px] border-white/20">
                {/* Tombol Play */}
                <button
                  onClick={handlePlayClick}
                  className="bg-[#fcfcfc] text-[#2e8555] font-['Irish_Grover'] text-4xl px-12 py-2 rounded-full shadow-sm hover:brightness-95 active:scale-95 transition-all"
                >
                  PLAY
                </button>

                {/* Area Klik Chevron */}
                <div
                  className="px-6 cursor-pointer text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-8 w-8 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={4}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {/* Menu List Dropdown */}
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 md:-right-12 w-56 bg-white rounded-4xl shadow-2xl overflow-y-auto flex flex-col border border-slate-100 animate-fadeIn max-h-52">
                  {[1, 2, 3].map((num, index) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => {
                        setPlayerCount(num.toString());
                        setIsDropdownOpen(false);
                      }}
                      className={`py-3 px-4 text-center text-xl font-bold transition-colors ${
                        playerCount === num.toString()
                          ? "bg-slate-100 text-[#2e8555]"
                          : "text-black hover:bg-slate-50"
                      } ${index !== 7 ? "border-b border-slate-200" : ""}`}
                    >
                      {num} Player
                    </button>
                  ))}
                </div>
              )}

              {/* Indikator Pilihan (Biar user tahu sudah milih) */}
              {playerCount && !isDropdownOpen && (
                <div className="mt-6 px-6 py-2 bg-white/90 backdrop-blur-sm rounded-full font-bold text-[#2e8555] shadow-md border-2 border-white text-sm">
                  ✓ {playerCount} Pemain Dipilih
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center relative z-10">
            <div className="w-full max-w-5xl space-y-8 bg-white/20 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border-4 border-white/30 shadow-2xl">
              <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-5xl font-irish text-white drop-shadow-md">
                  PENGATURAN PEMAIN
                </h2>
              </div>

              <div className="grid w-full gap-8 justify-items-center md:grid-cols-2 lg:grid-cols-3">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className={`w-full max-w-sm rounded-[2.5rem] border-4 p-8 transition-all ${
                      activePlayer === index
                        ? "border-[#2e8555] bg-white scale-105 shadow-xl"
                        : "border-transparent bg-white/90 opacity-90"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-6 text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setActivePlayer(index);
                          openAvatarModal(index);
                        }}
                        className={`h-24 w-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-2xl transition hover:scale-110 ${player.avatar ? player.avatar.color : "bg-slate-300 animate-pulse"}`}
                      >
                        {player.avatar ? player.avatar.label.slice(-1) : "?"}
                      </button>

                      <div className="w-full">
                        <p className="text-xs font-black tracking-widest uppercase text-slate-400 mb-2">
                          Pemain {index + 1}
                        </p>
                        <input
                          type="text"
                          value={player.name}
                          onChange={(event) =>
                            handlePlayerNameChange(index, event.target.value)
                          }
                          placeholder="NAMA KAMU"
                          className="w-full text-center bg-transparent border-b-4 border-slate-200 py-2 text-xl font-bold text-slate-800 outline-none transition focus:border-[#2e8555] placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-6 pt-8 items-center">
                <button
                  type="button"
                  onClick={handleStartClick}
                  className={`inline-flex items-center justify-center rounded-full px-16 py-4 text-2xl font-['irish_grover'] text-white shadow-xl transition-all ${
                    canStart
                      ? "bg-[#2e8555] hover:scale-105"
                      : "bg-slate-400 opacity-70 cursor-not-allowed"
                  }`}
                >
                  START !
                </button>
              </div>
            </div>
          </div>
        )}

        {/* --- 4. FOOTER BUTTONS --- */}
        <div className="w-full max-w-5xl flex flex-wrap justify-center gap-4 relative z-10 mt-4">
          {step === "setup" && (
            <button
              type="button"
              onClick={() => setStep("select")}
              className="rounded-full border-2 border-white/40 bg-white/20 backdrop-blur-md px-6 py-3 text-sm font-bold text-white hover:bg-white/40 transition"
            >
              Reset Pemain
            </button>
          )}
        </div>

        {/* tombol kecil "kembali ke kuls" di bawah */}
        {step === "select" && (
          <Link
            to="/peminatan/kuls"
            className="fixed bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/40 bg-white/70 px-4 py-2 text-xs font-semibold text-[#2e8555] shadow-lg backdrop-blur-sm hover:bg-white transition "
          >
            Kembali ke Kuls
          </Link>
        )}
      </div>
    </>
  );
};

export default HomeGame;
