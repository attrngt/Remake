import React, { useState } from "react";

const NavGuideModal = () => {
  // State untuk mengatur modal terbuka atau tertutup
  const [isOpen, setIsOpen] = useState(true);

  // Jika isOpen false, komponen tidak me-render apa-apa
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn p-4 font-poppins">
      {/* Container Modal */}
      <div className="bg-[#FFFDF0] border-4 border-[#247B5B] rounded-[2.5rem] p-8 max-w-md w-full shadow-[8px_8px_0_#247B5B] relative flex flex-col items-center text-center animate-slideUp">
        {/* Tombol X (Close) di pojok kanan atas */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-6 text-3xl font-black text-slate-400 hover:text-red-500 transition-colors hover:scale-110 active:scale-95"
        >
          ✕
        </button>

        {/* Judul */}
        <h2 className="text-4xl font-['Irish_Grover'] text-[#F37021] mb-4 drop-shadow-sm mt-2">
          Hey, Explorers! 
        </h2>

        {/* Teks Instruksi */}
        <p className="text-base md:text-lg text-slate-700 font-medium mb-6 leading-relaxed">
          Pintu masuk KULSTOPIA ada di atas! <br />
          Silakan arahkan kursor ke menu <br />
          <span className="font-bold text-[#247B5B] bg-green-100 px-2 py-1 rounded inline-block my-1 shadow-sm">
            Peminatan ▾
          </span>{" "}
          <br />
          lalu klik opsi <span className="font-black text-[#6259A8]">KULS</span>
          .
        </p>

        {/* Ilustrasi Menu Singkat (Visual Cue) */}
        <div className="bg-white border-2 border-slate-200 rounded-xl p-4 w-full mb-8 text-left shadow-inner">
          <ul className="text-sm font-bold text-slate-400 space-y-3">
            <li className="pl-3">SPICE</li>
            {/* Sorotan KULS */}
            <li className="pl-3 bg-blue-50 text-blue-600 py-2 border-l-4 border-blue-600 rounded-r-md animate-pulse">
              KULS 👈{" "}
              <span className="text-xs font-normal text-slate-500">
                (Klik yang ini!)
              </span>
            </li>
            <li className="pl-3">MOSAIC</li>
          </ul>
        </div>

        {/* Tombol OKAY */}
        <div className="bg-[#247B5B] text-white text-2xl font-serif px-10 py-3 rounded-full shadow-[0_5px_0_#1a5c3f] hover:translate-y-[2px] hover:shadow-[0_3px_0_#1a5c3f] transition-all">
          kindly refresh the site when it's laggy :D
        </div>
      </div>
    </div>
  );
};

export default NavGuideModal;
