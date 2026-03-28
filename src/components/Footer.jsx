import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaRegEnvelope } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[#2D4096] text-white pt-16 pb-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        {/* --- GRID UTAMA (3 Kolom) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* KOLOM 1: LOGO & MEMBERSHIP */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-4 mb-8">
                <img src="/src/assets/polar-logo.png" alt="Polar Logo" className="w-full h-full object-contain" />
              
            
            </div>
            <Link 
              to="/membership" 
              className="px-8 py-2 border-2 border-white rounded-full text-sm font-bold hover:bg-white hover:text-[#2D4096] transition-all uppercase"
            >
              Membership
            </Link>
          </div>

          {/* KOLOM 2: PRODUKSI MEDIA UI (Links) */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold uppercase mb-4 border-b border-white/30 pb-2">
              Produksi Media UI
            </h3>
            <div className="flex flex-col gap-4 font-bold text-sm">
              <Link to="/" className="hover:translate-x-2 transition-transform">Home</Link>
              <Link to="/membership" className="hover:translate-x-2 transition-transform">Membership</Link>
              <div className="group relative cursor-pointer">
                <Link to="/peminatan" className="flex items-center gap-1 hover:translate-x-2 transition-transform">
                  Peminatan
                </Link>
              </div>
              <Link to="/partners" className="hover:translate-x-2 transition-transform">Partners</Link>
              <Link to="/playbook" className="hover:translate-x-2 transition-transform">Studio Playbook</Link>
              <Link to="/contact" className="hover:translate-x-2 transition-transform border-b border-white/30 pb-4">Contact Us</Link>
            </div>
          </div>

          {/* KOLOM 3: CONTACT INFORMATION */}
          <div className="flex flex-col">
            <h3 className="text-xl font-bold uppercase mb-4 border-b border-white/30 pb-2 text-center md:text-left">
              Contact Information
            </h3>
            <div className="flex flex-col gap-6 text-sm">
              {/* Email */}
              <div className="flex items-center gap-4">
             <FaRegEnvelope size={24} />
                <span className="font-semibold leading-tight">lab.promed@vokasi.ui.ac.id</span>
              </div>
              {/* Alamat */}
              <div className="flex items-start gap-4">
                <MdOutlineLocationOn size={24} />
                <span className="font-semibold leading-tight">
                  Gedung Business Center Lt.2, Vokasi UI, Jawa Barat 16424
                </span>
              </div>
              {/* Instagram */}
              <div className="flex items-center gap-4">
                <FaInstagram size={24} />
                <span className="font-semibold leading-tight uppercase tracking-widest">lab.promed.ui</span>
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR (Privacy & Copyright) --- */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs opacity-80 gap-4">
          <div className="flex gap-6 font-bold uppercase">
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms & Condition</Link>
          </div>
          <div className="text-center md:text-right font-bold uppercase">
            Copyright © 2025 Polar LAB UI Media Production Lab and Teaching Factory. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;