'use client';
import MainLayout from '@/components/Layouts/MainLayout/index';
import Footer from '@/components/Fragments/Footer';
import Navbar from '@/components/Fragments/Navbar';
import { getAllDataMisdinar } from '@/app/api/User/misdinar/route';
import { useEffect, useState } from 'react';
import Loading from '@/components/Fragments/Loading/loading';

export default function Mesdinar() {
  const [misdinarData, setMisdinarData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [jenisAnggota, setJenisAnggota] = useState([
    'Seksi Liturgi',
    'Seksi UsahaDana',
    'Seksi Kreativitas',
    'Seksi Dokumentasi',
    'Seksi Kebersihan',
    'Seksi Konsumsi',
  ]);

  const fetchData = async () => {
    try {
      setLoadingState(true);
      let res = await getAllDataMisdinar();
      res = await res.json();
      const responseJson = res.data;

      // Filter data berdasarkan organitation_name
      console.log(responseJson);
      const filteredData = responseJson.filter(
        (item) => item.organitation_name === 'Misdinar',
      );
      setMisdinarData(filteredData);
      setLoadingState(false);
    } catch (error) {
      console.log(error);
      setLoadingState(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className=" h-screen w-full ">
      <MainLayout>
        <Navbar />
        {loadingState && <Loading />}
        <div className="relative items-center justify-center mb-[5rem] mt-[-3rem]">
          <section>
            <div className="items-center">
              <h2 className="text-black text-center font-poppins  md:text-5xl md:font-bold leading-[112px] pt-20 min-[357px]:text-primary min-[357px]:text-xl min-[357px]:mt-10 min-[357px]:mb-5  max-[775px]:text-black md:text-black">
                Struktur Organisasi Misdinar
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center relative">
                {/* Gambar Ketua */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Ketua' && (
                      <div
                        key={index}
                        className="relative mb-5 md:mr-10 md:mb-[-1.4rem] min-[357px]:mb-8"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
                        />
                        <img
                          className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src="/img/Rectangle 20.png"
                          alt=""
                        />
                        <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-white text-lg font-bold">
                            {data.members_name}
                          </p>
                        </div>
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}

                {/* Gambar wakil */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Wakil' && (
                      <div
                        key={index}
                        className="relative min-[357px]:mt-10 min-[357px]:mb-5"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
                        />
                        <img
                          className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src="/img/Rectangle 20.png"
                          alt=""
                        />
                        <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-white text-lg font-bold">
                            {data.members_name}
                          </p>
                        </div>
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}
              </div>

              <div className="flex justify-center items-center mb-5 overflow-x-auto  mt-10 h-[500px]" >
                {/* Gambar Sekretaris 1 */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Sekretaris 1' && (
                      <div
                        key={index}
                        className="relative  md:mr-10 "
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
                        />
                        <img
                          className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src="/img/Rectangle 20.png"
                          alt=""
                        />
                        <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-white text-lg font-bold">
                            {data.members_name}
                          </p>
                        </div>
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}

                {/* Gambar Bendahara 1 */}
                {misdinarData.map(
                  (data, index) =>
                    data.position_name === 'Bendahara 1' && (
                      <div
                        key={index}
                        className="relative md:mr-10"
                      >
                        <img
                          className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src={data.image.url}
                          alt=""
                        />
                        <img
                          className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                          src="/img/Rectangle 20.png"
                          alt=""
                        />
                        <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-white text-lg font-bold">
                            {data.members_name}
                          </p>
                        </div>
                        <div className="absolute top-[26rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                          <p className="text-primary text-lg font-bold">
                            {data.position_name}
                          </p>
                        </div>
                      </div>
                    ),
                )}
                
              </div>
              {/* card anggota */}
              <div className="block justify-center items-center mb-5 overflow-x-auto w-[800px] md:w-[1500px] mx-auto">
                {/* Gambar Anggota */}
                {jenisAnggota.map((jenis) => {
                  return (
                    <div className='relative flex  mb-20 h-full max-w-[100rem]'>
                      {
                      misdinarData.map((data, index) => {
                        return (
                          data.position_name == jenis && (
                            <div
                            key={index}
                            className="relative md:mr-10 min-[357px]:mb-8 min-w-[300px]"
                            >
                              <img
                                className="object-cover rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                                src={data.image.url}
                                alt=""
                              />
                              <img
                                className="object-cover absolute top-0 left-0 rounded-[0.9rem] h-[25rem] w-full md:w-[20rem]"
                                src="/img/Rectangle 20.png"
                                alt=""
                              />
                              <div className="absolute top-[21rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                                <p className="text-white text-lg font-bold">
                                  {data.members_name}
                                </p>
                              </div>
                              <div className="absolute top-[25.5rem] left-1/2 transform -translate-x-1/2 text-center w-full md:w-[20rem]">
                                <p className="text-primary text-lg font-bold">
                                  {jenis}
                                </p>
                              </div>
                            </div>
                          )
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </MainLayout>
    </section>
  );
}
