import React from "react";
import { useParams } from "react-router-dom";
import Kuls from "../components/studio/Kuls";
// ... tambahkan import studio lainnya

const LabDetail = () => {
  const { id } = useParams(); // Mengambil 'wire', 'orfil', dll dari URL

  // Mapping ID URL ke Komponen Studio
  const studioComponents = {
    kuls: <Kuls />,
    // Masukkan semua 13 studio di sini sesuai id-nya
  };

  return (
    <>
      {/* Hanya merender komponen studio yang dipilih. 
        Jika ID tidak terdaftar, muncul pesan Error sederhana.
      */}
      {studioComponents[id] || (
        <div className="pt-32 text-center">Studio Tidak Ditemukan</div>
      )}
    </>
  );
};

export default LabDetail;
