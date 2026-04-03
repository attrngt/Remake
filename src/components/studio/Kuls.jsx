import Footer from "../Footer";
import section1 from "../../assets/sect1.png";
import logoKuls from "../../assets/logo-kuls.png";
import corkboardBg from "../../assets/corkboard-polos.png";
import fotoTestimoni from "../../assets/testimoni-1.png";
import fotoBeyondScreen from "../../assets/beyond-screen.png";
import fotoRecap from "../../assets/beyond-recap.png";
import KulsCalendar from "../KulsCalendar";
import { Link } from "react-router-dom";
import top from "../../assets/top.png";
import HomeGame from "../../pages/HomeGame";
import Carousel from "../Carousel";
import c1 from "../../assets/Carousel/c1.png";
import c2 from "../../assets/Carousel/c2.png";
import c3 from "../../assets/Carousel/c3.png";
import c4 from "../../assets/Carousel/c4.png";
import c5 from "../../assets/Carousel/c5.png";
import c6 from "../../assets/Carousel/c6.png";
import c7 from "../../assets/Carousel/c7.png";
import c8 from "../../assets/Carousel/c8.png";
import c9 from "../../assets/Carousel/c9.png";
import c10 from "../../assets/Carousel/c10.png";
import c11 from "../../assets/Carousel/c11.png";
import c12 from "../../assets/Carousel/c12.png";

const Kuls = () => {
  return (
    <>
      <section
        className="section_1 w-full h-screen relative overflow-hidden flex items-center justify-center
        pb-7"
        style={{
          backgroundImage: `url(${section1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* WRAPPER UTAMA UNTUK LOGO DAN TEKS */}
        <div className="relative w-full max-w-[1000px] h-[600px] flex items-center justify-center">
          {/* 1. Teks "Welcome to," (Posisi Atas Tengah) */}
          <h2 className="absolute top-[10%] left-1/2 -translate-x-1/2 text-white text-4xl md:text-5xl font-['Irish_Grover'] drop-shadow-lg">
            WELCOME TO
          </h2>

          {/* 2. Logo KULS (Tengah) */}
          <div className="relative z-10 w-[650px]">
            <img
              src={logoKuls}
              alt="Logo Kuls"
              className="w-full h-auto drop-shadow-[5px_5px_5px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* 3. Teks "Get to know us" (Kiri Bawah) */}
          <h3 className="absolute bottom-0 left-10 md:left-20 text-white text-3xl md:text-5xl font-['Irish_Grover'] text-center leading-tight drop-shadow-lg">
            Get to <br /> know us
          </h3>

          {/* 4. Teks "Play Games" (Kanan Bawah) */}
          <h3 className="absolute bottom-0 right-10 md:right-20 text-white text-3xl md:text-5xl font-['Irish_Grover'] text-center leading-tight drop-shadow-lg">
            <Link to="/Home-Game">
              Play <br /> Games
            </Link>
          </h3>
        </div>
      </section>

      {/* Section selanjutnya */}
      <section className="section_2 h-auto w-full bg-[#FEFFEE] flex flex-col items-center justify-center py-5">
        <div className="text-[#247B5B] text-4xl font-bold py-4">
          Peminatan Digital Advertising, Gig Media, & Gamification
        </div>
        <div className="text-slate-900 text-justify w-full px-24 pb-10 mb-5 font-semibold items-center">
          Peminatan Digital Advertising, Gig Media, dan Gamifikasi Produksi
          Media Universitas Indonesia berfokus pada pengembangan keterampilan
          manajerial dan teknis dalam menciptakan promosi produk, gig media, dan
          konsep gamifikasi. Mahasiswa di peminatan ini mempelajari berbagai
          aspek seperti perencanaan konten, analisis brand & produk, konsep
          aplikasi, dan sebagainya.
        </div>
      </section>

      <section className="section_3 relative w-full min-h-screen overflow-hidden flex flex-col gap-20 items-center justify-center pt-20 pb-40">
        {/* 1. BACKGROUND 5 WARNA (Paling Belakang) */}
        <div className="absolute inset-0 flex w-full h-full -z-10">
          <div className="flex-1 h-full bg-[#F37021]"></div>
          <div className="flex-1 h-full bg-[#E58EB5]"></div>
          <div className="flex-1 h-full bg-[#247B5B]"></div>
          <div className="flex-1 h-full bg-[#F14624]"></div>
          <div className="flex-1 h-full bg-[#6259A8]"></div>
        </div>

        {/* 2. AREA PAPAN (Kontainer Utama) */}
        <div className="relative w-full max-w-6xl aspect-[16/10] z-10 mx-10 group">
          {/* GAMBAR PAPAN GABUS (Base Layer) */}
          <img
            src={corkboardBg}
            alt="Board"
            className="w-full h-full object-contain drop-shadow-2xl"
          />

          {/* --- KONTEN DI ATAS PAPAN (Gunakan % agar responsif) --- */}

          {/* Memo Teks Kiri Atas */}
          <div className="absolute top-[10%] left-[7%] w-[35%] p-4 md:p-6 bg-[#FFF9C4] shadow-xl rotate-[-2deg] border-t-4 border-yellow-400">
            <p className="text-[#1A4D2E] text-justify text-[10px] md:text-sm font-bold leading-tight">
              KULS Creative merupakan studio yang menjadi wadah kreatif bagi
              para mahasiswa Produksi Media Universitas Indonesia konsentrasi
              Periklanan, Media Gig, dan Gamifikasi untuk bersama-sama belajar,
              berkembang, dan menciptakan proyek & konten kreatif yang positif
              dan berdampak dari sisi strategi hingga kreatif.
            </p>
          </div>

          {/* Foto Beyond Screen (Tengah) */}
          <div className="absolute top-[8%] left-[45%] w-[25%] p-1 bg-white shadow-2xl rotate-[5deg] hover:rotate-0 transition-transform duration-300">
            <img
              src={fotoBeyondScreen}
              alt="Beyond"
              className="w-full h-auto"
            />
          </div>

          {/* Testimoni Orange (Kanan Atas) */}
          <div className="absolute top-[12%] right-[7%] w-[22%] p-1 bg-[#F37021] shadow-2xl rotate-[-4deg] border-4 border-[#F37021] hover:rotate-0 transition-transform duration-300">
            <img src={fotoTestimoni} alt="Testi" className="w-full h-auto" />
          </div>

          {/* Recap Polkadot (Kanan Tengah) */}
          <div className="absolute top-[45%] right-[8%] w-[25%] p-2 bg-pink-100 shadow-2xl rotate-[3deg] border-4 border-pink-200 hover:rotate-0 transition-transform duration-300">
            <img src={fotoRecap} alt="Recap" className="w-full h-auto" />
          </div>

          {/* Logo KULS Transparan (Hiasan Papan) */}
          <img
            src={logoKuls}
            className="absolute top-0 left-0 w-[19%] pointer-events-none rotate-[-15deg]"
            alt="deco"
          />
        </div>
        {/* B. DUA PAPAN KECIL (BAWAH) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full h-[400px]">
          {/* Papan Kecil 1 (Kiri) */}
          <div className="relative h-full">
            <img
              src={corkboardBg}
              alt="Small Board 1"
              className="w-full h-full object-cover "
            />
          </div>

          {/* Papan Kecil 2 (Kanan) */}
          <div className="relative h-full">
            <img
              src={corkboardBg}
              alt="Small Board 2"
              className="w-full h-full object-cover md:-mr-16 ml-auto"
            />
          </div>
        </div>
      </section>

      <section className="section_4 w-full min-h-screen relative flex flex-col items-center justify-center bg-[#E58EB5] px-6 py-20 overflow-hidden font-poppins">
        {/* 1. HEADER AREA - Dibuat lebih menyatu */}
        <div className="w-full max-w-5xl text-center space-y-4 mb-16">
          <h3 className="text-white/80 text-lg md:text-6xl font-medium tracking-[0.3em] uppercase">
            KULSPEEPZ’S FOOTPRINT ACROSS
          </h3>

          {/* Gambar "TOP COMPANIES" yang dibuat lebih besar dan center */}
          <div className="flex justify-center transform hover:scale-105 transition-transform duration-500">
            <img
              src={top}
              alt="Top Companies"
              className="h-20 md:h-32 w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>

        {/* 2. CAROUSEL AREA - Dikasih container biar rapi */}
        <div className="w-full relative">
          {/* Sedikit gradasi transparan di pinggir biar carouselnya 'fading' (estetik) */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#E58EB5] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#E58EB5] to-transparent z-10 pointer-events-none"></div>

          <Carousel
            images={[c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12]}
          />
        </div>

        {/* 3. DEKORASI TYPE (Opsional: Tulisan transparan di latar) */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[15rem] font-black text-white/5 whitespace-nowrap pointer-events-none select-none">
          FOOTPRINT
        </div>
      </section>

      <KulsCalendar />

      <Footer />
    </>
  );
};

export default Kuls;
