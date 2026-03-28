import React from "react";

const Hero = ({
  title = "Headline",
  subtitle = "",
  bgColor = "bg-[#F3E5D8]", // Default warna krem
  textColor = "text-[#4A6741]", // Default warna hijau tua
  image = "", // URL Gambar latar kanan
  logo = "", // URL Logo di atas gambar
  height = "h-[450px]", // Tinggi hero bisa diatur
}) => {
  return (
    <section
      className={`relative w-full ${height} flex items-center overflow-hidden ${bgColor}`}
    >
      {/* --- SISI KIRI: Konten Teks --- */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-10 z-10">
        <h1
          className={`text-4xl md:text-6xl font-extrabold ${textColor} tracking-wider text-center uppercase leading-tight`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-4 text-sm md:text-base font-medium ${textColor} opacity-80 uppercase tracking-[0.2em]`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* --- SISI KANAN: Gambar Melengkung --- */}
      <div className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] lg:w-[55%] h-full">
        {/* Clip Path untuk lengkungan oval di kiri gambar */}
        <div
          className="relative h-full w-full bg-cover bg-center transition-all duration-700"
          style={{
            backgroundImage: `url('${image}')`,
            clipPath: "ellipse(85% 100% at 100% 50%)",
          }}
        >
          {/* Overlay tipis agar logo lebih kontras */}
          <div className="absolute inset-0 bg-black/5"></div>

          {/* Logo di tengah gambar */}
          {logo && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
              <img
                src={logo}
                alt="Logo Page"
                className="w-32 h-32 md:w-52 md:h-52 object-contain drop-shadow-xl animate-in zoom-in duration-700"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
