import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Peminatan = () => {
  const listPeminatan = [
    {
      id: "wire",
      name: "WIRE",
      desc: "Audio & Podcast",
      img: "src/assets/wire.jpg",
    },
    {
      id: "kuls",
      name: "KULS",
      desc: "Culture & Art",
      img: "src/assets/kuls.jpg",
    },
    {
      id: "orfil",
      name: "ORFIL",
      desc: "Film Production",
      img: "src/assets/orfil.jpg",
    },
    // ... masukkan semua 13 lab di sini
  ];

  return (
    <>
    <div className="pt-32 pb-20 px-6 md:px-20 bg-white">
      {/* HEADER DESKRIPSI */}
      <div className="max-w-4xl mb-16">
        <h1 className="text-5xl font-semibold text-black mb-6">
          Peminatan Produksi Media
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed text-justify">
          Kurikulum akademik di Produksi Media sudah lengkap dengan berbagai
          aspek dari media digital dan mahasiswa dapat memilih bidang/aspek
          sesuai dengan minat/preferensi masing-masing. Kaprodi Produksi Media
          membagi bidang/aspek media digital tersebut menjadi 13
          Studio/Peminatan Media agar memudahkan mahasiswa untuk memilih
          kelanjutan studi nya (magang, capstone, tugas akhir, dan skripsi).
        </p>
      </div>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listPeminatan.map((item) => (
          <Link
            to={`/peminatan/${item.id}`}
            key={item.id}
            className="group relative h-[300px] overflow-hidden rounded-2xl shadow-lg transition-all hover:-translate-y-2"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{ backgroundImage: `url(${item.img})` }}
            ></div>
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Teks di dalam Card */}
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-2xl font-bold uppercase tracking-wider">
                {item.name}
              </h3>
              <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
    <Footer />
    </> 
  );
};

export default Peminatan;
