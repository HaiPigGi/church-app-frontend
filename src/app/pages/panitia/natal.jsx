import MainLayout from '@/components/Layouts/MainLayout/index';
import Footer from '@/components/Fragments/Footer';
import Navbar from '@/components/Fragments/Navbar';
import { useEffect, useState } from 'react';
import { getAllDataPanitiaNatal } from '@/app/api/User/Panitia Natal/route';
import Loading from '@/components/Fragments/Loading/loading';

export default function natal() {
  const [NatalData, setNatalData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  const fetchData = async () => {
    try {
      setLoadingState(true);
      let res = await getAllDataPanitiaNatal();
      res = await res.json();
      const responseJson = res.data;

      // Filter data berdasarkan organitation_name
      const filteredData = responseJson.filter(
        (item) => item.organitation_name === 'Panitia Natal',
      );
      setNatalData(filteredData);
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
    <MainLayout>
      <section className="snap-y snap-mandatory h-screen w-full overflow-y-auto">
        <Navbar />
        {loadingState && <Loading />}
        <div className="relative items-center justify-center mb-[5rem] mt-[-3rem]">
          <section>
            <div className="flex flex-col items-center">
              <h2 className="text-black font-poppins  md:text-5xl md:font-bold leading-[112px] pt-20 min-[357px]:text-primary min-[357px]:text-xl min-[357px]:mt-10 min-[357px]:mb-5  max-[775px]:text-black md:text-black">
                Panitia Natal
              </h2>
              <div className="flex flex-col md:flex-row justify-center items-center relative">
                {/* Gambar Ketua */}
                {NatalData.map(
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
                {NatalData.map(
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

              <div className="flex flex-col md:flex-row justify-center items-center relative mt-[4rem]">
                {/* Gambar Sekretaris 1 */}
                {NatalData.map(
                  (data, index) =>
                    data.position_name === 'Sekretaris 1' && (
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

                {/* Gambar Sekretaris 2 */}
                {NatalData.map(
                  (data, index) =>
                    data.position_name === 'Sekretaris 2' && (
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

                {/* Gambar Bendahara 1 */}
                {NatalData.map(
                  (data, index) =>
                    data.position_name === 'Bendahara 1' && (
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
                {/* Gambar Bendahara 2 */}
                {NatalData.map(
                  (data, index) =>
                    data.position_name === 'Bendahara 2' && (
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
              </div>

              {/* card anggota */}
              <div className="flex flex-col md:flex-row justify-center items-center relative mt-[4rem] overflow-x-auto">
                {/* Gambar Anggota */}
                {NatalData.map(
                  (data, index) =>
                    data.position_name === 'Anggota Panitia Natal' && (
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
                            Anggota
                          </p>
                        </div>
                      </div>
                    ),
                )}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </section>
    </MainLayout>
  );
}
