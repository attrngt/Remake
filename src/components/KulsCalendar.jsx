import React, { useState } from "react";
import gameData from "../data/data.json";

const KulsCalendar = () => {
  const [selectedDosen, setSelectedDosen] = useState(null);

  //dosen data dari data.json
  const dosenData = gameData.dosen;

  const days = Array.from({ length: 35 }, (_, i) => i + 1); // Grid 35 kotak (5 minggu)
  const dayNames = [
    { full: "SUNDAY", short: "SUN" },
    { full: "MONDAY", short: "MON" },
    { full: "TUESDAY", short: "TUE" },
    { full: "WEDNESDAY", short: "WED" },
    { full: "THURSDAY", short: "THU" },
    { full: "FRIDAY", short: "FRI" },
    { full: "SATURDAY", short: "SAT" },
  ];

  return (
    <section className="w-full min-h-screen bg-[#FEFFEE] py-20 px-4 sm:px-6 flex flex-col items-center">
      <h2 className="text-5xl font-bold font-['Irish_Grover'] tracking-widest text-[#1A4D2E] mb-12 drop-shadow-sm">
        KULS Lecturer
      </h2>

      {/* --- GRID KALENDER --- */}
      <div className="w-full max-w-[1200px] border-2 border-black bg-white shadow-[10px_10px_0px_rgba(0,0,0,1)] overflow-x-auto">
        {/* Header Nama Hari */}
        <div className="grid grid-cols-7 min-w-[560px] border-b-2 border-black">
          {dayNames.map((day) => (
            <div
              key={day.full}
              className="py-3 text-center font-bold text-[9px] sm:text-[10px] md:text-sm tracking-widest border-r-2 border-black last:border-r-0"
            >
              <span className="inline md:hidden">{day.short}</span>
              <span className="hidden md:inline">{day.full}</span>
            </div>
          ))}
        </div>

        {/* Angka & Kotak Dosen */}
        <div className="grid grid-cols-7 min-w-[560px]">
          {days.map((d, index) => {
            const dosen = dosenData.find((item) => item.day === d);
            const isPurple = [8, 11, 28].includes(d);

            return (
              <div
                key={index}
                onClick={() => dosen && setSelectedDosen(dosen)}
                className={`relative md:aspect-square h-[90px] md:h-auto border-r-2 border-b-2 border-black last:border-r-0 flex flex-col p-2 transition-all group ${dosen ? "cursor-pointer hover:brightness-95" : ""} ${dosen ? dosen.color : isPurple ? "bg-[#6259A8]" : "bg-white"}`}
              >
                {/* Angka Tanggal (Kiri Atas) */}
                <span
                  className={`text-lg font-bold ${dosen || isPurple ? "text-white" : "text-black"} ${dosen ? "hidden md:block" : "block"}`}
                >
                  {d <= 31 ? d : ""}
                </span>

                {/* Foto Dosen (Greyscale ke Warna saat Hover) */}
                {dosen && (
                  <img
                    src={dosen.img}
                    alt={dosen.name}
                    className="absolute inset-0 md:inset-auto md:bottom-0 md:right-0 w-full h-full md:w-[90%] md:h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* --- MODAL ELEGAN --- */}
      {selectedDosen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
            {/* Dekorasi Header Modal */}
            <div
              className={`h-24 ${selectedDosen.color} flex items-end justify-center pb-4`}
            >
              <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden bg-gray-200 -mb-10 shadow-lg">
                <img
                  src={selectedDosen.img}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="pt-14 pb-10 px-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-1">
                {selectedDosen.name}
              </h3>
              <p className="text-teal-600 font-medium mb-6">
                {selectedDosen.matkul}
              </p>

              <div className="space-y-4 text-left border-t pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Department</span>
                  <span className="text-gray-700 font-semibold">
                    Media Production
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Office Hour</span>
                  <span className="text-gray-700 font-semibold">
                    10:00 - 15:00
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedDosen(null)}
                className="mt-8 w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default KulsCalendar;
