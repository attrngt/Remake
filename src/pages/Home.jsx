import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const faqData = {
  "Produksi Media": [
    {
      q: "Apa itu Produksi Media?",
      a: "Produksi Media adalah sebuah program studi di Vokasi Universitas Indonesia dengan jenjang Diploma 4 (D4) yang mempersiapkan mahasiswa untuk menguasai bidang dan terjun ke industri Media Digital.",
    },
    {
      q: "Berapa lama periode kuliah di Produksi Media?",
      a: "Mahasiswa Produksi Media menempuh perkuliahan selama 4 tahun dengan total 8 semester. Perkuliahan 8 semester tersebut dibagi menjadi 2 fase, yaitu fase generalist (perkuliahan awal) dan fase specialist (magang dan perkuliahan akhir) yang masing-masing berjumlah 4 semester.",
    },
    {
      q: "Apa gelar alumni Produksi Media?",
      a: "Alumni jenjang program studi D4 akan mendapat gelar Sarjana Terapan (S.Tr.). Begitu pula alumni dari Produksi Media yang akan mendapat gelar sarjana terapan khusus di bidang Komunikasi dan Media, yaitu Sarjana Terapan Komunikasi (S.Tr.Kom.).",
    },
    {
      q: "Bagaimana alumni Produksi Media melanjutkan studi?",
      a: "Setelah menyelesaikan studi di Produksi Media dan mendapat gelar Sarjana Terapan Komunikasi (S.Tr.Kom.), alumni dapat langsung melanjutkan studi ke jenjang Magister (S2) atau Sarjana (S1) di bidang yang relevan seperti Komunikasi, Media Digital, dan sebagainya.",
    },
    {
      q: "Apa saja prospek kerja Produksi Media?",
      a: "Mahasiswa Produksi Media akan mendapat kesempatan dan prospek kerja yang baik dengan adanya mitra-mitra program studi yang berasal dari industri Media Digital & Kreatif.",
    },
  ],
  "Peminatan Produksi Media": [
    {
      q: "Apa saja 13 Peminatan/Studio Media di Produksi Media?",
      a: "Berikut adalah nama 13 Peminatan/Studio Media di Produksi Media dengan fokus utamanya: 1. MVP E-Sports, 2. MOSAIC, 3. VOTE. Media, 4. ICON, 5. TOBO Studio, 6. Orang Film UI, 7. Pixel Pals, 8. PojoKomik, 9. FLUI Media, 10. S.P.I.C.E. Studio, 11. OX-Laboratory, 12. WIRE Music Studio, 13. KULS Creative.",
    },
    {
      q: "Bagaimana proses penentuan peminatan internship/magang?",
      a: "Mahasiswa akan mendapatkan kesempatan internship/magang di semester 5 sebagai awal dari fase specialist. Skema tiap mahasiswa dalam internship/magang ini akan ditentukan oleh Kaprodi di akhir semester 4 dengan beberapa pertimbangan yaitu: Peminatan/studio media pilihan, CV & Portfolio, serta kualitas akademik tiap mahasiswa berdasarkan IPK semester 4.",
    },
  ],
  "Dosen/Pengajar/Mitra": [
    {
      q: "Siapa saja Mitra Industri Produksi Media?",
      a: "Program studi Produksi Media telah menjalin relasi dengan berbagai industri media digital & kreatif seperti Visinema, Jakarta Fashion Week, Google Indonesia, Sony Music Indonesia, Spotify Indonesia, Harper’s Bazaar Indonesia.",
    },
    {
      q: "Siapa saja Dosen/Pengajar Produksi Media?",
      a: "Mayoritas dosen Produksi Media adalah dosen tamu kontrak dari mitra-mitra industri. Beberapa dosen ternama diantaranya Diandra Paramita Sastrowardoyo (Aktris), Nadif Zahirudin (Kuy! Entertainment), Dr. Soraya Haque (Model), Lukman Sardi (Sutradara & Produser), dan Achmad Istamar (Google Indonesia).",
    },
  ],
  "Media Pesta Karya": [
    {
      q: "Apa itu Media Pesta Karya?",
      a: "Media Pesta Karya adalah sebuah event yang bertujuan untuk memperluas engagement dan mengeksternalisasikan karya-karya mahasiswa Produksi Media agar lebih dikenal oleh masyarakat luas.",
    },
    {
      q: "Bagaimana pelaksanaan Media Pesta Karya 2025?",
      a: "Karya-karya mahasiswa Produksi Media akan di-showcase dan dipamerkan melalui media digital sepenuhnya, yaitu melalui website promedui.com ini dan melalui media sosial TikTok dan Instagram.",
    },
  ],
};

const Home = () => {
  const [activeTab, setActiveTab] = useState("Produksi Media");
  const [openIndex, setOpenIndex] = useState(0);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setOpenIndex(0); // Reset accordion to first item when switching tabs
  };

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gray-50 text-gray-800 font-sans">
        {/* 1. HERO SECTION */}
        <section className="relative w-full h-[500px] md:h-screen flex items-center justify-center overflow-hidden bg-black">
          <div
            className="absolute inset-0 w-full h-full z-0 opacity-40 bg-cover bg-center transition-transform duration-1000 scale-105 hover:scale-100"
            style={{ backgroundImage: "url('src/assets/Lab-Polar-In.jpg')" }}
          ></div>
          <div className="relative z-10 text-center px-6">
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight uppercase leading-none drop-shadow-2xl">
              Produksi <br className="md:hidden" />
              <span className="text-transparent px-2 bg-clip-text bg-gradient-to-br from-blue-300 to-blue-600">
                Media
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-gray-300 tracking-[0.3em] md:tracking-[0.5em] uppercase font-light drop-shadow-md">
              Vokasi Universitas Indonesia
            </p>
          </div>
        </section>

        {/* 2. ABOUT/INTRO SECTION */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 relative">
          <div className="w-full md:w-1/2 space-y-8 z-10">
            <div className="space-y-4">
              <h3 className="text-blue-600 font-bold tracking-widest uppercase text-sm">
                Tentang Program Studi
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                Produksi Media Vokasi <br /> Universitas Indonesia
              </h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed text-justify">
              Produksi Media adalah sebuah program studi di Vokasi Universitas
              Indonesia dengan jenjang Diploma 4 (D4) yang mempersiapkan
              mahasiswa untuk menguasai bidang dan terjun ke industri Media
              Digital.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-4 px-8 py-4 bg-blue-700 text-white font-bold rounded-tr-xl rounded-bl-xl hover:bg-blue-800 hover:rounded-tl-xl hover:rounded-br-xl hover:rounded-tr-none hover:rounded-bl-none transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
            >
              Jelajahi lebih lanjut
            </Link>
          </div>
          <div className="w-full md:w-1/2 relative h-[500px] flex items-center justify-center">
            {/* Gambar Background Utama (Lengkungan Khas) */}
            <div
              className="absolute w-[320px] h-[450px] md:w-[400px] md:h-[550px] bg-cover bg-center shadow-xl grayscale-[30%] brightness-90"
              style={{
                backgroundImage: "url('src/assets/Vokasi-View-1.jpg')",
                borderRadius: "150px 300px 100px 300px",
              }}
            ></div>

            {/* Gambar Lingkaran Tengah */}
            <div
              className="absolute top-5 right-0 w-56 h-56 md:w-72 md:h-72 rounded-full border-[6px] border-white shadow-2xl bg-cover bg-center z-10 transition-transform hover:scale-105 duration-500"
              style={{ backgroundImage: "url('src/assets/Lab-Polar-In.jpg')" }}
            ></div>

            {/* Gambar Lingkaran Kecil Bawah */}
            <div
              className="absolute bottom-0 right-5 w-44 h-44 md:w-60 md:h-60 rounded-full border-[8px] border-white shadow-2xl bg-cover bg-center z-20 transition-transform hover:scale-105 duration-500"
              style={{ backgroundImage: "url('src/assets/Vokasi-View-1.jpg')" }}
            ></div>
          </div>
        </section>

        {/* 3. KARYA MAHASISWA (STUDENT WORKS) */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -ml-32 -mt-32"></div>

          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <h3 className="text-blue-600 font-bold tracking-widest uppercase text-sm">
                  Portfolio
                </h3>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  Karya Mahasiswa
                </h2>
                <p className="text-gray-500 max-w-lg">
                  Eksplorasi karya inovatif, kreatif, dan inspiratif dari
                  mahasiswa Produksi Media yang berkolaborasi dari berbagai
                  studio peminatan.
                </p>
              </div>
              <Link
                to="/karya"
                className="hidden md:flex items-center gap-2 text-blue-700 font-bold hover:gap-4 transition-all uppercase tracking-wider text-sm"
              >
                Lihat Semua Karya <span>&rarr;</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Karya 1 */}
              <div className="group rounded-2xl overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-blue-800 opacity-90 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold mb-2">
                      Stars in Your Eyes
                    </h3>
                    <div className="w-12 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                  </div>
                </div>
                <div className="p-8 relative bg-white">
                  <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                    <span className="text-blue-600 font-black text-xl">🎵</span>
                  </div>
                  <p className="text-xs text-blue-600 font-black mb-1 uppercase tracking-wider">
                    Musics / Wire
                  </p>
                  <p className="text-gray-800 font-bold text-lg mb-6">
                    Oleh: Noufal Adika
                  </p>
                  <button className="w-full py-3 bg-gray-50 text-blue-700 font-bold rounded-xl group-hover:bg-blue-700 group-hover:text-white transition-colors duration-300">
                    Detail Karya
                  </button>
                </div>
              </div>

              {/* Karya 2 */}
              <div className="group rounded-2xl overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-pink-800 opacity-90 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold mb-2">
                      Animal Resource Dept
                    </h3>
                    <div className="w-12 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                  </div>
                </div>
                <div className="p-8 relative bg-white">
                  <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                    <span className="text-purple-600 font-black text-xl">
                      🎮
                    </span>
                  </div>
                  <p className="text-xs text-purple-600 font-black mb-1 uppercase tracking-wider">
                    Game / OxLab
                  </p>
                  <p className="text-gray-800 font-bold text-lg mb-6">
                    Oleh: Dicari Programmer
                  </p>
                  <button className="w-full py-3 bg-gray-50 text-purple-700 font-bold rounded-xl group-hover:bg-purple-700 group-hover:text-white transition-colors duration-300">
                    Detail Karya
                  </button>
                </div>
              </div>

              {/* Karya 3 */}
              <div className="group rounded-2xl overflow-hidden shadow-xl bg-white hover:shadow-2xl transition-all duration-500 border border-gray-100">
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600 to-red-700 opacity-90 group-hover:scale-110 transition-transform duration-700"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-3xl font-bold mb-2">Daisy's Diary</h3>
                    <div className="w-12 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
                  </div>
                </div>
                <div className="p-8 relative bg-white">
                  <div className="absolute -top-6 right-6 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-100">
                    <span className="text-orange-600 font-black text-xl">
                      🎨
                    </span>
                  </div>
                  <p className="text-xs text-orange-600 font-black mb-1 uppercase tracking-wider">
                    Comics / Pojokomik
                  </p>
                  <p className="text-gray-800 font-bold text-lg mb-6">
                    Oleh: Haura Shalihah
                  </p>
                  <button className="w-full py-3 bg-gray-50 text-orange-700 font-bold rounded-xl group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                    Detail Karya
                  </button>
                </div>
              </div>
            </div>

            <Link
              to="/karya"
              className="mt-12 flex justify-center items-center gap-2 text-blue-700 font-bold uppercase tracking-wider text-sm md:hidden"
            >
              Lihat Semua Karya <span>&rarr;</span>
            </Link>
          </div>
        </section>

        {/* 4. BERITA & UPDATE SECTION */}
        <section className="py-24 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16 space-y-4">
              <h3 className="text-blue-600 font-bold tracking-widest uppercase text-sm">
                Pembaruan & Artikel
              </h3>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                Berita Terbaru
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title:
                    "Vokasi UI mengembangkan studio mini human computer interaction",
                  cat: "HCI / SPICE",
                  tags: "POLAR LAB",
                  color: "from-blue-500 to-blue-700",
                },
                {
                  title: "Promed Streams, tentukan peranmu di POLAR LAB",
                  cat: "PROMATES",
                  tags: "POLAR LAB",
                  color: "from-emerald-500 to-teal-700",
                },
                {
                  title: "Aplikasi Game Pertama Promed & Vokasi UI",
                  cat: "GAME / OX-Lab",
                  tags: "POLAR LAB",
                  color: "from-rose-500 to-red-700",
                },
              ].map((news, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl p-6 transition-all duration-300 border border-gray-100 flex flex-col h-full"
                >
                  <div
                    className={`h-40 rounded-xl mb-6 bg-gradient-to-br ${news.color} opacity-90 group-hover:opacity-100 transition-opacity flex items-end p-4`}
                  >
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-wider">
                      {news.tags}
                    </span>
                  </div>
                  <p className="text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">
                    {news.cat}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900 leading-snug mb-4 group-hover:text-blue-600 transition-colors flex-grow">
                    {news.title}
                  </h3>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-500 font-medium">
                      Oleh: Reiky Perkasa
                    </p>
                    <a
                      href="#"
                      className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    >
                      &rarr;
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 & 6. FAQ & TABS SECTION */}
        <section className="py-24 max-w-5xl mx-auto px-6 md:px-12">
          {/* Tabs Desktop */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {Object.keys(faqData).map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-6 py-2 rounded-full font-bold text-sm md:text-base border-none transition-colors ${
                  activeTab === tab
                    ? "bg-[#2a4397] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {faqData[activeTab].map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className="flex flex-col">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`w-full text-left p-5 flex justify-between items-center font-bold border-none text-sm md:text-base transition-colors ${
                      isOpen
                        ? "bg-[#2a4397] text-white rounded-t-lg"
                        : "bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200"
                    }`}
                  >
                    <span>{item.q}</span>
                    <span className="text-xl ml-4 font-black leading-none">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="border border-t-0 border-gray-100 bg-white p-6 rounded-b-lg text-gray-700 text-sm md:text-base leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
