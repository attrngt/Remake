import React, { useState } from "react";

// Import gambar dosen (Sesuaikan nama file & ekstensi .png / .jpg jika berbeda)
import imgRangga from "../assets/dosen/1.png";
import imgBern from "../assets/dosen/2.png";
import imgNailul from "../assets/dosen/3.png";
import imgRichard from "../assets/dosen/4.png";
import imgGabriel from "../assets/dosen/5.png";
import imgDania from "../assets/dosen/7.png";
import imgMaulan from "../assets/dosen/11.png";
import imgGrace from "../assets/dosen/13.png";
import imgNana from "../assets/dosen/16.png";
import imgSabila from "../assets/dosen/20.png";
import imgArtha from "../assets/dosen/22.png";
import imgEmilia from "../assets/dosen/26.png";
import imgNicky from "../assets/dosen/28.png";
import imgJosefhine from "../assets/dosen/30.png";
import imgNico from "../assets/dosen/12.png";

// Contoh Data Dosen (Bisa Yang Mulia pindahkan ke file JSON/API nanti)
const dosenData = [
  {
    id: 1,
    day: 2,
    name: "Rangga Wisesa, M.I.Kom.",
    matkul: "Maestro Prodi Promed",
    color: "bg-[#247B5B]",
    img: imgRangga,
  },
  {
    id: 2,
    day: 4,
    name: "Bern Jonathan, M.T.I",
    matkul: "Data Analytics for Advertising",
    color: "bg-[#6259A8]",
    img: imgBern,
  },
  {
    id: 3,
    day: 6,
    name: "Nailul Mona, M.I.Kom.",
    matkul: "Mentor Kuls Creative",
    color: "bg-[#F37021]",
    img: imgNailul,
  },
  {
    id: 4,
    day: 8,
    name: "Richard Henokh K, MBA",
    matkul: "Strategic Brand Management",
    color: "bg-[#E58EB5]",
    img: imgRichard,
  },
  {
    id: 5,
    day: 11,
    name: "Gabriel Chemin, MBA",
    matkul: "Music for Advertising & Gig Media",
    color: "bg-[#F14624]",
    img: imgGabriel,
  },
  {
    id: 15,
    day: 12,
    name: "Nico Dharmaputra, M.Sc",
    matkul: "Transmedia-Storytelling",
    color: "bg-[#E58EB5]",
    img: imgNico,
  },
  {
    id: 6,
    day: 16,
    name: "Dania Rari Pratiwi, M.Sc.",
    matkul: "Technopreneurship",
    color: "bg-[#247B5B]",
    img: imgDania,
  },
  {
    id: 7,
    day: 14,
    name: "Maulan Arfi, M.M.",
    matkul: "Gamification for Advertising & Gig Media",
    color: "bg-[#6259A8]",
    img: imgMaulan,
  },
  {
    id: 8,
    day: 18,
    name: "Grace Amelia, M.M.",
    matkul: "Digital Marketing & Analytics",
    color: "bg-[#F37021]",
    img: imgGrace,
  },
  {
    id: 9,
    day: 20,
    name: "Nana Uli Kuinra, M.I.Kom.",
    matkul: "Digital CRM",
    color: "bg-[#E58EB5]",
    img: imgNana,
  },
  {
    id: 10,
    day: 22,
    name: "Sabila Anata, M.Sc.",
    matkul: "MBKM & Product Development",
    color: "bg-[#F14624]",
    img: imgSabila,
  },
  {
    id: 11,
    day: 24,
    name: "Artha Hanindito, M.Si.",
    matkul: "Advertisements Production, Market Research",
    color: "bg-[#247B5B]",
    img: imgArtha,
  },
  {
    id: 12,
    day: 26,
    name: "Emilia Natarina, M.I.Kom.",
    matkul: "Copywriting",
    color: "bg-[#6259A8]",
    img: imgEmilia,
  },
  {
    id: 13,
    day: 28,
    name: "Nicky P. Pandelaki, M.A.",
    matkul: "AR/VR for Advertising & Gig Media",
    color: "bg-[#F37021]",
    img: imgNicky,
  },
  {
    id: 14,
    day: 30,
    name: "Josefhine Chitra, M.Sc.",
    matkul: "Integrated Marketing Communication",
    color: "bg-[#E58EB5]",
    img: imgJosefhine,
  },
];

const KulsCalendar = () => {
  const [selectedDosen, setSelectedDosen] = useState(null);
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
