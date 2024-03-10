'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, motion, useAnimation } from 'framer-motion';
import { get_jadwal } from '@/app/api/User/jadwalmisa/route';
import AuthService from '@/app/api/Auth/route';

function JadwalMisaSection() {
  const refJadwalSec = useRef(null);
  const inView = useInView(refJadwalSec, { once: false });
  const mainControlls = useAnimation();

  const [Jadwal, setJadwal] = useState([]);

  const fetchData = async () => {
    const res = await get_jadwal();
    const hariMap = {
        'minggu': 0,
        'senin': 1,
        'selasa': 2,
        'rabu': 3,
        'kamis': 4,
        'jumat': 5,
        'sabtu': 6
    };

    const sortedJadwal = res.data.sort((a, b) => {
        const hariA = hariMap[a.hari];
        const hariB = hariMap[b.hari];
        return hariA - hariB;
    });

    setJadwal(sortedJadwal);
};
  function changeTimeformat(waktu) {

    // Memecah waktu menjadi array
    const waktuArray = waktu.split(':');
    // Menggabungkan jam dan menit tanpa detik
    return  waktuArray[0] + ':' + waktuArray[1];
  }

  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    Jadwal.forEach((val) =>{
      val.waktu_mulai = changeTimeformat(val.waktu_mulai);
      val.waktu_selesai = changeTimeformat(val.waktu_selesai);
    })
  },[Jadwal])
  

  useEffect(() => {
    if (inView) {
      mainControlls.start('visible');
    }
  }, [inView]);

  return (
    <section className="snap-always snap-center w-full h-screen flex justify-center items-center px-5 py-5 overflow-hidden bg-fixed bg-jadwalMisa bg-no-repeat bg-cover bg-center">
      <div className="w-full max-w-2xl mt-10">
        <h1 className="text-secondary text-center text-2xl font-bold text-shadow ">
          Jadwal Misa
        </h1>
        <div className="w-full h-full mt-5 flex flex-col justify-center items-center">
          <div
            ref={refJadwalSec}
            className="md:flex w-full h-full justify-center items-center mx-auto gap-10 px-5"
          >
            {/* Card on right */}
            <motion.div
              variants={{
                hiddenLeft: { opacity: 0, x: -80 },
                hiddenRight: { opacity: 0, x: 80 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hiddenRight"
              animate={mainControlls}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-md flex justify-center md:justify-start items-center w-full h-full "
            >
              {Jadwal?.length > 0 && (
                <div className="border md:ml-16 bg-white w-full md:max-h-[400px] min-w-[300px] md:min-h-[400px] md:min-w-[350px] max-w-[500px] h-full border-secondary rounded-sm p-5 shadow-sm shadow-primary">
                  <h1 className="text-sm md:text-xl font-light text-center mt-[-0.5rem]">
                    Jadwal Dalam Seminggu
                  </h1>
                  <table className='w-full'>
                    <thead >
                      <tr>
                        <th className="py-2 px-2 border-b text-[10px] md:text-[15px]">Hari</th>
                        <th className="py-2 px-2 border-b text-[10px] md:text-[15px]">Jenis Misa</th>
                        <th className="py-2 px-2 border-b text-[10px] md:text-[15px]">Waktu Mulai</th>
                        <th className="py-2 px-2 border-b text-[10px] md:text-[15px]">Waktu selesai</th>
                      </tr>
                    </thead>
                    <tbody>
                    {Jadwal?.map((row, index) => (
                      <tr key={index} className="border-b border-black text-[12px] text-center h-full overflow-y-auto">
                        <td className="text-primary font-boldpy-2">{row.hari}</td>
                        <td className='py-2'>{row.jenis_misa.jenis}</td>
                        <td className='py-2'>{row.waktu_mulai}</td>
                        <td className='py-2'>{row.waktu_selesai}</td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default JadwalMisaSection;
