'use client';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  getAllDokumentasi,
  getAllDokumentasiByJenisKegiatan,
  getAllDokumentasiByYear,
} from '@/app/api/User/Dokumentasi/routes';
import { isResponseError } from '@/app/pages/admin/posisi.jsx';
import useModalContent from '@/lib/customHooks/useModalContent.jsx';
import { useRouter } from 'next/navigation';

const Dokumentasi_kegiatan = ({ params }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchYear, setSearchYear] = useState('');
  const [groupImage, setGroupImage] = useState([
    {
      jenis_kegiatan: '',
      tahun: '',
      images: '',
    },
  ]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [photos, setPhotos] = useState([]);
  const { modalContent, setModalContent, clearState } = useModalContent();
  const router = useRouter();

  const getDokumentasi = async (jenisKegiatan) => {
    try {
      let res = await getAllDokumentasiByJenisKegiatan(jenisKegiatan);
      if (isResponseError(res, setModalContent, clearState)) return;
      res = await res.json();
      const data = res.data;
  
      // Buat objek untuk menyimpan data dokumentasi berdasarkan tahun
      const yearMap = {};
  
      // Iterasi melalui data dan kelompokkan berdasarkan tahun
      data.forEach((item) => {
        const year = item.tahun;
        if (!yearMap[year]) {
          yearMap[year] = {
            tahun: year,
            jenis_kegiatan: item.jenis_kegiatan,
            images: [],
          };
        }
        yearMap[year].images.push(...item.images);
      });
  
      // Ubah objek tahun menjadi array
      const groupedData = Object.values(yearMap);
  
      // Perbarui groupImage dan photos dengan data yang telah dikelompokkan
      setGroupImage(groupedData);
      setPhotos(groupedData);
    } catch (error) {
      setErrorMessage('Error getting documentation: ' + error.message);
    }
  };
  
  useEffect(() => {
    getDokumentasi(params.jenis_kegiatan);
  }, []);

  const photosByYearAndJenisKegiatan = async (jenis_kegiatan, year) => {
    try {
      const res = await getAllDokumentasiByYear(jenis_kegiatan, year);
      const responseData = await res.json();
      const data = responseData.data;
      // Memperbarui groupImage sesuai dengan data yang diterima dari backend
      setGroupImage(data);
      // Memperbarui photos sesuai dengan data yang diterima dari backend
      setPhotos(data);
    } catch (error) {
      setModalIsOpen(true);
      console.error('Error fetching documentation by year:', error);
      // Tampilkan pesan kesalahan jika terjadi kesalahan saat memanggil API
      setErrorMessage('Error fetching documentation by year: ' + error.message);
    }
  };

  const handleChange = (e) => {
    let year = e.target.value;
    setSearchYear(year);
  };

  const handleSearch = async () => {
    if (!searchYear) {
      setModalContent('validation', {
        message: 'Harap masukkan tahun pencarian terlebih dahulu',
        typeMessage: 'failed',
        action: clearState,
      });
      return;
    }
    try {
      setIsLoading(true); // Tambahkan ini untuk menampilkan indikator loading
      await photosByYearAndJenisKegiatan(params.jenis_kegiatan, searchYear);
    } catch (error) {
      setErrorMessage('Error searching documentation by year: ' + error.message);
    } finally {
      setIsLoading(false); // Tambahkan ini untuk menyembunyikan indikator loading setelah selesai
    }
  };
  

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const handleGoBack = () => {
    router.push('/pages/dok/');
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="container mx-auto py-8 overflow-x-auto ">
      <button
        className="flex ml-5 text-secondary font-semibold mt-3 mb-5"
        onClick={handleGoBack}
      >
        <img src="/img/assets/left-arrow (1).png" className="mr-2" /> Kembali
      </button>
      <h1 className="text-3xl font-semibold mb-6 text-center">Dokumentasi</h1>
      <div className="flex justify-center mb-4">
        <input
          type="number"
          placeholder="Masukkan tahun"
          className="border border-gray-300 p-2 rounded-md"
          value={searchYear}
          onChange={handleChange}
          min="1900" // Batas tahun minimal
          max={new Date().getFullYear()} // Batas tahun maksimal berdasarkan tahun sekarang
        />
        <button
          className="ml-2 bg-secondary text-white px-4 py-2 rounded-md"
          onClick={handleSearch}
        >
          Cari
        </button>
      </div>
      {groupImage.length > 0 &&
        groupImage.map((photos, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-xl font-semibold mb-2 text-center">
              {photos.tahun}
            </h2>
            <div className="flex space-x-4 overflow-x-auto ml-5">
              {Array.isArray(photos.images) &&
                photos.images.map((photo, photoIndex) => (
                  <div
                    key={photoIndex}
                    className="flex-shrink-0 overflow-hidden rounded-lg shadow-md cursor-pointer"
                    onClick={() => setSelectedPhoto(photo)}
                  >
                    {/* Pastikan bahwa properti 'url' dan 'jenis_kegiatan' ada dalam objek 'photo' */}
                    <img
                      src={photo.url}
                      alt={photo.jenis_kegiatan}
                      className="w-52 h-56 object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}

      {/* Modal for Empty Search Result */}
      <Modal
        isOpen={modalIsOpen && groupImage.length === 0} // Munculkan modal jika data kosong
        onRequestClose={closeModal}
        contentLabel="Empty Search Result Modal"
        className="m-auto w-1/2 bg-white rounded-md p-8"
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Peringatan!!!
          </h2>
          <p className="text-red-500 text-center">
            Tidak ada foto untuk tahun {searchYear}.
          </p>
          <button
            className="bg-red-600 text-white px-4 py-2 mt-4 rounded-md w-28 mx-auto"
            onClick={closeModal}
          >
            Tutup
          </button>
        </div>
      </Modal>

      {/* Modal for Found Data */}
      {/* <Modal
        isOpen={modalIsOpen && groupImage.length > 0} // Munculkan modal jika data ditemukan
        onRequestClose={closeModal}
        contentLabel="Found Data Modal"
        className="m-auto w-1/2 bg-white rounded-md p-8"
      >
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Data ditemukan untuk {params.jenis_kegiatan} tahun {searchYear}.
          </h2>
          {/* Tampilkan data yang ditemukan di sini */}
      {/* {groupImage.map((item, index) => (
            <div key={index} className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-center">
                {item.tahun}
              </h2>
              <div className="flex space-x-4 overflow-x-auto ml-5">
                {Array.isArray(item.images) &&
                  item.images.map((photo, photoIndex) => (
                    <div
                      key={photoIndex}
                      className="flex-shrink-0 overflow-hidden rounded-lg shadow-md cursor-pointer"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <img
                        src={photo.url}
                        alt={`Image ${photoIndex}`}
                        className="w-52 h-56 object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
          <button
            className="bg-red-600 text-white px-4 py-2 mt-4 rounded-md w-28 mx-auto"
            onClick={closeModal}
          >
            Tutup
          </button>
        </div>
      // </Modal> */}

      {selectedPhoto && (
        <div className="fixed top-0 left-0 w-full h-full bg-neutral-950 bg-opacity-75 flex items-center justify-center ">
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
            className="max-w-full max-h-full"
          />
          <button
            className="absolute top-4 right-4 h-10 w-10 text-white"
            onClick={handleClose}
          >
            <img src="/img/assets/logout (1).png" alt="" />
          </button>
        </div>
      )}
      {modalContent}
      {/* Di dalam render: */}
    </div>
  );
};

export default Dokumentasi_kegiatan;
