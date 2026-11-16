import { useEffect, useState } from "react";
import "./App.css";

const INITIAL_STUDENTS = [
  {
    nim: "2204101",
    nama: "Fajar Nugroho",
    noHp: "085211447701",
    email: "fajar.nugroho@kampus.ac.id",
    alamat: "Yogyakarta",
    prodi: "Teknik Informatika",
    tahunMasuk: 2022,
  },
  {
    nim: "2304108",
    nama: "Nadia Kusuma",
    noHp: "085622558812",
    email: "nadia.kusuma@kampus.ac.id",
    alamat: "Bandung",
    prodi: "Bisnis Digital",
    tahunMasuk: 2023,
  },
  {
    nim: "2304115",
    nama: "Rizky Ramadhan",
    noHp: "081333669923",
    email: "rizky.ramadhan@kampus.ac.id",
    alamat: "Semarang",
    prodi: "Ilmu Komputer",
    tahunMasuk: 2023,
  },
  {
    nim: "2404104",
    nama: "Salsabila Azzahra",
    noHp: "082144770034",
    email: "salsabila.a@kampus.ac.id",
    alamat: "Jakarta",
    prodi: "Desain Komunikasi Visual",
    tahunMasuk: 2024,
  },
  {
    nim: "2404119",
    nama: "Teguh Santiko",
    noHp: "087855881145",
    email: "teguh.santiko@kampus.ac.id",
    alamat: "Solo",
    prodi: "Rekayasa Perangkat Lunak",
    tahunMasuk: 2024,
  },
];

function formatClock(date) {
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function formatDate(date) {
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function App() {
  const [students] = useState(INITIAL_STUDENTS);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="page">
      <div className="container">
        <header className="page-header">
          <h1>Student Management</h1>
          <h2>Daftar Data Mahasiswa</h2>
        </header>

        <section className="info-bar" aria-label="Ringkasan dan waktu">
          <div className="info-card">
            <span className="info-label">Jumlah Mahasiswa</span>
            <strong className="info-value">{students.length} Mahasiswa</strong>
          </div>

          <div className="info-card clock-card">
            <span className="info-label">
              <span className="live-dot" aria-hidden="true" />
              Waktu Saat Ini
            </span>
            <time className="clock-time" dateTime={currentTime.toISOString()}>
              {formatClock(currentTime)}
            </time>
            <span className="clock-date">{formatDate(currentTime)}</span>
          </div>
        </section>

        <section className="table-card" aria-label="Tabel data mahasiswa">
          <div className="table-wrapper">
            <table className="student-table">
              <thead>
                <tr>
                  <th>NIM</th>
                  <th>Nama Mahasiswa</th>
                  <th>No. Hp</th>
                  <th>Email</th>
                  <th>Alamat</th>
                  <th>Program Studi</th>
                  <th>Tahun Masuk</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.nim}>
                    <td className="mono">{student.nim}</td>
                    <td className="student-name">{student.nama}</td>
                    <td className="mono">{student.noHp}</td>
                    <td>{student.email}</td>
                    <td>{student.alamat}</td>
                    <td>
                      <span className="prodi-badge">{student.prodi}</span>
                    </td>
                    <td className="mono">{student.tahunMasuk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
