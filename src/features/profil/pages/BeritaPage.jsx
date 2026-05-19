import ProfilLayout from "../layouts/ProfilLayout";

const beritaList = [
  {
    id: 1,
    kategori: "Pengumuman",
    title: "Pengumuman Kelulusan Siswa Kelas XII",
    date: "20 Juni 2024",
    penulis: "Admin Sekolah",
    desc: "Kelulusan siswa akan diumumkan pada tanggal 20 Juni 2024 melalui website resmi sekolah. Seluruh siswa diharapkan hadir pada acara wisuda yang akan dilaksanakan di aula sekolah.",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80",
  },
  {
    id: 2,
    kategori: "Kegiatan",
    title: "Kegiatan Pramuka Tingkat Kabupaten",
    date: "10 Mei 2024",
    penulis: "Guru Pembina",
    desc: "Kegiatan pramuka berjalan dengan lancar dan penuh semangat kebersamaan antar siswa. Tim SMK Negeri 3 Balige berhasil meraih juara umum.",
    img: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?w=400&q=80",
  },
  {
    id: 3,
    kategori: "Prestasi",
    title: "Juara LKS Bidang Teknik Komputer",
    date: "15 April 2024",
    penulis: "Humas Sekolah",
    desc: "Siswa kami berhasil meraih juara pertama pada Lomba Kompetensi Siswa bidang Teknik Komputer dan Jaringan tingkat provinsi Sumatera Utara.",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
  },
  {
    id: 4,
    kategori: "Kegiatan",
    title: "Kunjungan Industri ke Perusahaan Teknologi",
    date: "28 Maret 2024",
    penulis: "Ketua Jurusan TKJ",
    desc: "Program kunjungan industri dilaksanakan agar siswa dapat melihat langsung penerapan ilmu di dunia kerja dan mempersiapkan diri memasuki industri.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&q=80",
  },
  {
    id: 5,
    kategori: "Pengumuman",
    title: "Jadwal Ujian Akhir Semester Genap 2024",
    date: "1 Maret 2024",
    penulis: "Wakil Kurikulum",
    desc: "Jadwal ujian akhir semester genap telah ditetapkan. Siswa diwajibkan mempersiapkan diri dengan baik dan memperhatikan tata tertib pelaksanaan ujian.",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80",
  },
  {
    id: 6,
    kategori: "Prestasi",
    title: "Siswa Lolos Seleksi Beasiswa Nasional",
    date: "10 Februari 2024",
    penulis: "Bidang Kesiswaan",
    desc: "Tiga siswa berprestasi dari SMK Negeri 3 Balige berhasil lolos seleksi beasiswa nasional untuk melanjutkan pendidikan ke perguruan tinggi terkemuka.",
    img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&q=80",
  },
];

const kategoriColors = {
  Pengumuman: "#5A82F2",
  Kegiatan: "#F4C430",
  Prestasi: "#1f2c5c",
};

export default function BeritaPage() {
  return (
    <ProfilLayout>

      {/* HERO */}
      <section className="smk-subpage-hero">
        <div className="smk-container smk-center">
          <span className="smk-badge">Informasi Terkini</span>
          <h1 className="smk-subpage-title">Berita &amp; Informasi</h1>
          <p className="smk-subpage-subtitle">
            Ikuti perkembangan terbaru seputar kegiatan, prestasi, dan pengumuman
            penting dari SMK Negeri 3 Balige.
          </p>
        </div>
      </section>

      {/* FILTER */}
      <section className="smk-section" style={{ paddingBottom: "0", paddingTop: "40px" }}>
        <div className="smk-container smk-center">
          <div className="smk-berita-filters">
            {["Semua", "Pengumuman", "Kegiatan", "Prestasi"].map((f) => (
              <button key={f} className="smk-filter-btn">
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BERITA GRID */}
      <section className="smk-section">
        <div className="smk-container">
          <div className="smk-berita-grid">
            {beritaList.map((item) => (
              <div className="smk-berita-card" key={item.id}>
                <div className="smk-berita-img">
                  <img src={item.img} alt={item.title} />
                  <span
                    className="smk-berita-tag"
                    style={{ background: kategoriColors[item.kategori] || "#5A82F2" }}
                  >
                    {item.kategori}
                  </span>
                </div>
                <div className="smk-berita-body">
                  <div className="smk-berita-meta">
                    <span>{item.date}</span>
                    <span>· {item.penulis}</span>
                  </div>
                  <h3 className="smk-berita-title">{item.title}</h3>
                  <p className="smk-berita-desc">{item.desc}</p>
                  <a href="#" className="smk-berita-link">Baca Selengkapnya →</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </ProfilLayout>
  );
}
