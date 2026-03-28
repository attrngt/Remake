import React from "react";
import Hero from "../components/Hero";
import logo from "../assets/polar-logo.png";
import Footer from "../components/Footer";


const ContactSection = () => {
  return (
    <>
      <Hero
      title="Hubungi Kami"
      subtitle="Temukan kami di sini"
      bgColor="bg-gradient-to-br from-blue-900 to-blue-700"
      textColor="text-white"
      image=""
      logo={logo}
      height="h-[450px]"
      />
    <section className="py-20 px-6 md:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* CONTAINER MAP */}
        <div className="w-full h-[500px] rounded-t-[40px] overflow-hidden shadow-2xl relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d991.2982656743384!2d106.820191!3d-6.3690563!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eda844d97c25%3A0x1a60fedba8d73bf9!2sLembaga%20Vokasi%20UI%20(Training%20Center%20Lemkasi)!5e0!3m2!1sid!2sid!4v1774722545967!5m2!1sid!2sid"
            className="w-full h-full grayscale-[0.3]"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* CONTAINER 3 CARDS (Biru Tua) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-10 relative z-10 px-4">
          
          {/* Card Narahubung */}
          <div className="bg-[#2D4096] text-white p-8 rounded-[30px] flex flex-col items-center text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Narahubung</h3>
            <p className="text-sm opacity-80 mb-6 text-balance">Ada pertanyaan tambahan? Kunjungi akun instagram kami di bawah ini!</p>
            <div className="flex items-center gap-3">
               <span className="text-2xl">📸</span>
               <a href="https://www.instagram.com/lab.promed.ui/" className="font-semibold hover:text-blue-300 transition-colors duration-300">@lab.promed.ui</a>
            </div>
          </div>

          {/* Card Alamat */}
          <div className="bg-[#2D4096] text-white p-8 rounded-[30px] flex flex-col items-center text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Alamat</h3>
            <p className="text-sm opacity-80 mb-6">Kunjungi Program Pendidikan Vokasi dan Produksi Media di alamat ini ya!</p>
            <div className="flex items-start gap-3">
               <span className="text-2xl">🏠</span>
               <span className="text-sm font-semibold">Gedung Business Center Lt.2, Vokasi UI, Jawa Barat 16424</span>
            </div>
          </div>

          {/* Card Email */}
          <div className="bg-[#2D4096] text-white p-8 rounded-[30px] flex flex-col items-center text-center shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Kirimkan Pesan</h3>
            <p className="text-sm opacity-80 mb-6">Ingin menjalin relasi dan kolaborasi? Hubungi email di bawah!</p>
            <div className="flex items-center gap-3">
               <span className="text-2xl">📧</span>
               <span className="text-sm font-bold">lab.promed@vokasi.ui.ac.id</span>
            </div>
          </div>

        </div>
      </div>
    </section>
    <Footer />
</>
  );
};

export default ContactSection;