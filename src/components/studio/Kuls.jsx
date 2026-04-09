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
import logoCorner from "../../assets/KulsUI.png";

const Kuls = () => {
  const handleScrollToSection = () => {
    const section = document.getElementById("section_2");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // "smooth" bikin efek meluncurnya pelan dan elegan
    }
  };
  return (
    <>
      <style>
        {`
          @keyframes slideInTL {
            0% { transform: translate(-100%, -100%); opacity: 0; }
            100% { transform: translate(0, 0); opacity: 1; }
          }
          @keyframes slideInTR {
            0% { transform: translate(100%, -100%); opacity: 0; }
            100% { transform: translate(0, 0); opacity: 1; }
          }
          @keyframes slideInBL {
            0% { transform: translate(-100%, 100%); opacity: 0; }
            100% { transform: translate(0, 0); opacity: 1; }
          }
          @keyframes slideInBR {
            0% { transform: translate(100%, 100%); opacity: 0; }
            100% { transform: translate(0, 0); opacity: 1; }
          }

          .animate-tl { animation: slideInTL 1s ease-out forwards; }
          .animate-tr { animation: slideInTR 1s ease-out forwards; }
          .animate-bl { animation: slideInBL 1s ease-out forwards; }
          .animate-br { animation: slideInBR 1s ease-out forwards; }
        `}
      </style>

      <section className="section_1 w-full h-screen min-h-[600px] relative overflow-hidden flex items-center justify-center pb-7 bg-[#257356]">
        {/* 1. KIRI ATAS */}
        <div className="hidden lg:block absolute z-0 top-0 left-0 w-[220px] aspect-square pointer-events-none animate-tl">
          {/* Blue Blob */}
          <svg
            className="absolute top-[-5%] left-[-5%] w-[65%] h-auto drop-shadow-md"
            viewBox="0 0 194 220"
            fill="none"
          >
            <path
              d="M36.1766 41.7375C-10.721 3.18508 -25.9501 54.0512 -8.29255 79.2311C-68.7838 95.086 -38.3157 155.535 -6.29403 147.987C-36.3211 199.33 23.8681 209.42 46.8618 187.904C67.8265 248.447 115.302 208.53 115.302 175.587C176.167 205.562 183.2 143.386 160.748 120.386C220.937 95.1593 184.553 46.7838 151.009 53.0162C164.265 -9.90155 106.239 -0.701301 94.3368 28.3824C69.9906 -25.1864 36.1766 8.49891 36.1766 41.7375Z"
              fill="#7DB4D1"
            />
          </svg>
          {/* Pink Wave */}
          <svg
            className="absolute top-[10%] left-[10%] w-[90%] h-auto drop-shadow-md"
            viewBox="0 0 282 199"
            fill="none"
          >
            <path
              d="M0.661721 86.2016C-1.81079 106.612 8.99168 166.209 14.702 193.456L54.6284 176.856L44.4551 134.11C36.0258 98.6913 43.8772 96.4356 52.287 93.2727C60.6969 90.1098 63.9707 94.1055 92.209 122.745C120.447 151.384 149.555 148.973 157.273 145.072C164.991 141.17 181.531 135.298 182.751 92.163C183.971 49.0281 183.174 46.7657 196.202 41.8585C204.572 38.4211 219.771 63.3508 232.947 91.0581L265.76 81.4412C263.335 75.0495 252.466 42.6646 230.336 20.4426C215.583 5.62828 192.362 -3.55675 174.943 1.87923C157.525 7.31521 150.295 19.2309 150.32 54.5846C150.346 89.9383 142.401 95.0553 129.054 98.619C118.376 101.47 103.577 83.3891 97.5119 73.9923C87.3455 59.2911 61.4773 31.4643 39.3351 37.7664C11.6574 45.644 3.75236 60.6884 0.661721 86.2016Z"
              fill="#E391BF"
              stroke="black"
              strokeWidth="0.600158"
            />
          </svg>
        </div>

        {/* 2. KANAN ATAS (Logo UI/KULS) */}
        <div className="hidden lg:block absolute z-10 top-4 right-5 w-[170px] animate-tr">
          <img
            src={logoCorner}
            alt="Logo UI"
            className="w-full h-auto drop-shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 3. KIRI BAWAH */}
        <div className="hidden lg:block absolute z-0 bottom-0 left-0 w-[220px] aspect-square pointer-events-none animate-bl">
          <svg
            className="absolute bottom-[20%] left-[10%] w-[55%] h-auto drop-shadow-md"
            viewBox="0 0 174 277"
            fill="none"
          >
            <path
              d="M43.9992 59.0729C182.721 156.899 72.655 203.723 0.281427 214.907L12.6851 276.307C280.456 196.972 154.332 59.2944 57.7982 0.372672L43.9992 59.0729Z"
              fill="#A18594"
              stroke="#F38787"
              strokeWidth="0.473944"
            />
          </svg>
          <svg
            className="absolute bottom-[-10%] left-[-15%] w-[85%] h-auto drop-shadow-md"
            viewBox="0 0 292 219"
            fill="none"
          >
            <path
              d="M25.7283 18.7083L36.4217 79.2924L-28.6768 65.8486L17.0985 115.259L-48 129.925L0.214172 167.986L-48 201.683H17.0985L-8.228 253.363L54.6193 232.062V293.868L105.272 245.506L136.602 301.725L151.048 245.506L209.017 281.472L199.449 222.983L260.983 232.062L225.902 181.43L291 167.986L225.902 139.876L281.432 93.9583H209.017L233.218 41.0563L174.123 65.8486V0.725098L127.034 47.8655L95.7045 0.725098L79.9458 56.7698L25.7283 18.7083Z"
              fill="#FFC942"
              stroke="black"
              strokeWidth="0.600158"
            />
          </svg>
        </div>

        {/* 4. KANAN BAWAH */}
        <div className="hidden lg:block absolute z-0 bottom-0 right-0 w-[280px] aspect-square pointer-events-none animate-br">
          <svg
            className="absolute bottom-[-10%] right-[-20%] w-[100%] h-auto drop-shadow-md"
            viewBox="0 0 316 298"
            fill="none"
          >
            <path
              d="M117.361 48.4603L142.529 126.06L53.4594 96.8391C-28.6495 93.4332 2.33797 136.316 28.0953 158.184L117.361 191.855L43.0386 232.881C18.0285 289.078 61.3243 296.289 86.0986 292.871L164.943 232.881V311.835C203.009 363.388 233.368 333.315 243.788 311.835L234.744 232.881L310.639 266.553C365.379 265.469 353.241 230.881 340.329 213.723L258.535 171.343L329.908 126.06C372.693 35.9592 312.081 36.7849 276.427 48.4603L206.627 114.256L190.111 27.9476C142.45 -30.5716 121.752 17.2397 117.361 48.4603Z"
              fill="#FA8484"
              stroke="#F38787"
              strokeWidth="0.600158"
            />
          </svg>
          <svg
            className="absolute bottom-[5%] right-[-10%] w-[60%] h-auto drop-shadow-md"
            viewBox="0 0 208 376"
            fill="none"
          >
            <path
              d="M6.49804 308.276C20.5227 331.97 100.756 364.17 143.102 375.636C167.551 374.793 165.956 354.148 162.103 343.931C147.528 348.681 77.4596 311.994 44.2475 293.057C24.9947 252.691 45.5008 251.305 58.1605 255.658C84.1233 279.154 112.563 288.452 123.538 290.165C210.387 297.645 189.123 240.853 167.634 211.523C121.571 169.571 129.788 147.775 139.654 142.12C199.267 186.013 220.52 130.712 223.695 97.5748C225.953 88.1335 210.674 49.7737 202.752 31.7739C195.786 -32.0159 154.454 16.5384 165.234 43.2781L183.655 88.9694C189.108 128.621 164.569 117.388 151.618 106.815C105.292 97.7253 95.2693 141.101 96.0487 163.926C88.3937 183.993 120.41 217.315 137.375 231.468C154.847 263.458 131.071 259.261 116.998 253.164L72.1467 223.058C9.27317 183.216 -11.4341 277.981 6.49804 308.276Z"
              fill="#F04323"
              stroke="black"
              strokeWidth="0.600158"
            />
          </svg>
        </div>

        {/* --- TENGAH --- */}
        <div className="relative w-full max-w-[1000px] h-[600px] flex items-center justify-center">
          <h2 className="absolute top-[10%] left-1/2 -translate-x-1/2 text-white text-4xl md:text-5xl font-['Irish_Grover'] drop-shadow-lg">
            WELCOME TO
          </h2>
          <div className="relative z-10 w-[80%] md:w-[620px]">
            <img
              src={logoKuls}
              alt="Logo Kuls"
              className="w-full h-auto  hover:scale-105 transition-transform duration-500"
            />
          </div>
          <h3
            className="absolute bottom-0 mb-3 left-6 md:left-20 text-white text-2xl md:text-5xl font-['Irish_Grover'] text-center leading-tight drop-shadow-lg cursor-pointer z-20"
            onClick={handleScrollToSection}
          >
            Get to <br /> know us
          </h3>
          <div className="absolute bottom-0 right-6 md:right-20 z-20">
            <Link
              to="/Home-Game"
              className="block text-white text-2xl md:text-5xl font-['Irish_Grover'] text-center leading-tight drop-shadow-lg animate-bounce transition-all duration-200 active:scale-95 cursor-pointer"
            >
              Play <br /> Games
            </Link>
          </div>
        </div>
      </section>

      {/* Section selanjutnya */}
      <section
        id="section_2"
        className="section_2 h-auto w-full bg-[#FEFFEE] flex flex-col items-center justify-center py-5"
      >
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
