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
  const [step, setStep] = useState("select");
  const [players, setPlayers] = useState([]);
  const [activePlayer, setActivePlayer] = useState(0);
  const [warningOpen, setWarningOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [avatarSlot, setAvatarSlot] = useState(0);

  const openWarning = (message) => {
    setWarningMessage(message);
    setWarningOpen(true);
  };

  const closeWarning = () => setWarningOpen(false);

  const handlePlayClick = () => {
    if (!playerCount) {
      openWarning("Pilih jumlah pemain dulu sebelum lanjut.");
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

  const navigate = useNavigate();

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
    navigate("/Map", { state: { players } });
  };

  const selectedPlayer = players[activePlayer] || {};
  const toggleNavbar = () => setNavbarVisible(!navbarVisible);

  return (
    <>
      <div
        className={`relative min-h-screen w-full bg-slate-100 flex flex-col items-center gap-6 px-6 pb-6 ${navbarVisible ? "pt-24" : "pt-6"}`}
      >
        {warningOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Perhatian
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {warningMessage}
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={closeWarning}
                  className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {avatarModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 py-6">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    Popup Avatar Pemain {avatarSlot + 1}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Pilih salah satu avatar dari menu ini.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setAvatarModalOpen(false)}
                  className="text-slate-400 hover:text-slate-700"
                >
                  ×
                </button>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {avatars.map((avatar) => (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => handleAvatarSelect(avatar)}
                    className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 text-left transition hover:border-blue-400"
                  >
                    <div
                      className={`h-14 w-14 rounded-full ${avatar.color} flex items-center justify-center text-sm font-semibold text-white`}
                    >
                      {avatar.label.slice(-1)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {avatar.label}
                      </p>
                      <p className="text-xs text-slate-500">Pilih avatar ini</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === "select" ? (
          <div className="flex flex-col items-center gap-10 text-center">
            <div>
              <h1 className="text-5xl font-bold text-slate-900">KULSTOPIA</h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                Pilih jumlah pemain terlebih dahulu agar tombol Play bisa
                digunakan. Setelah itu kamu akan diarahkan ke halaman untuk
                memasukkan nama dan memilih avatar.
              </p>
            </div>

            <div className="w-full max-w-md rounded-3xl bg-slate-50 p-8 shadow-sm">
              <div className="mb-4 flex justify-between items-center gap-3">
                <span className="text-sm font-semibold text-slate-700">
                  Jumlah Pemain
                </span>
              </div>
              <select
                value={playerCount}
                onChange={(event) => setPlayerCount(event.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              >
                <option value="">Pilih jumlah pemain</option>
                <option value="1">1 Pemain</option>
                <option value="2">2 Pemain</option>
                <option value="3">3 Pemain</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handlePlayClick}
              className={`inline-flex items-center justify-center rounded-full px-10 py-4 text-lg font-semibold text-white transition ${
                playerCount
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-slate-400 cursor-default"
              }`}
            >
              Play
            </button>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <div className="w-full max-w-5xl space-y-8">
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-slate-900">
                    Pengaturan Pemain
                  </h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Masukkan nama dan pilih avatar untuk setiap pemain.
                  </p>
                </div>
              </div>

              <div className="grid w-full gap-6 justify-items-center md:grid-cols-2 lg:grid-cols-3">
                {players.map((player, index) => (
                  <div
                    key={player.id}
                    className={`w-full max-w-sm rounded-3xl border p-6 ${
                      activePlayer === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-4 text-center">
                      <div className="flex h-24 w-24 items-center justify-center rounded-full border border-slate-300 bg-slate-100 text-xs font-semibold uppercase text-slate-500">
                        {player.avatar ? player.avatar.label : "Avatar"}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-600">
                          Pemain {index + 1}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {activePlayer === index
                            ? "Sedang dipilih"
                            : "Klik untuk aktifkan"}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActivePlayer(index);
                          openAvatarModal(index);
                        }}
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200"
                      >
                        Pilih Avatar
                      </button>

                      <input
                        type="text"
                        value={player.name}
                        onChange={(event) =>
                          handlePlayerNameChange(index, event.target.value)
                        }
                        placeholder="Masukkan nama"
                        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 border-t border-slate-200 pt-6 text-slate-600">
                <p className="text-sm">
                  Setelah semua pemain memilih nama dan avatar, tekan Start.
                </p>
                <button
                  type="button"
                  onClick={handleStartClick}
                  className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold text-white transition ${
                    canStart
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-slate-300 text-slate-600"
                  }`}
                >
                  Start
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="w-full max-w-5xl flex flex-wrap justify-center gap-3">
          {step === "setup" && (
            <button
              type="button"
              onClick={() => setStep("select")}
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Kembali
            </button>
          )}
          <Link
            to="/peminatan/kuls"
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Kembali ke Kuls
          </Link>
          <button
            type="button"
            onClick={toggleNavbar}
            className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Toggle Navbar
          </button>
        </div>
      </div>
    </>
  );
};

export default HomeGame;
