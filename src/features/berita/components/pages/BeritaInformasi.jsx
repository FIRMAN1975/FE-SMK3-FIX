import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ProfilLayout from "../../../profil/layouts/ProfilLayout";
import "./BeritaPage.css";

// ── Hook: detect kapan elemen masuk viewport ──
function useInView(threshold = 0.15, once = true) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return [ref, isVisible];
}

// ── Komponen wrapper animasi ──
function Animate({
  children,
  animation = "fade-up",
  delay = 0,
  threshold = 0.15,
  style = {},
  className = "",
}) {
  const [ref, isVisible] = useInView(threshold);

  const hiddenStyles = {
    "fade-up":    { opacity: 0, transform: "translateY(40px)" },
    "fade-left":  { opacity: 0, transform: "translateX(-40px)" },
    "fade-right": { opacity: 0, transform: "translateX(40px)" },
    "fade-in":    { opacity: 0, transform: "none" },
    "zoom-in":    { opacity: 0, transform: "scale(0.92)" },
  };

  const visibleStyle = {
    opacity: 1,
    transform: "translateY(0) translateX(0) scale(1)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        willChange: "opacity, transform",
        ...(isVisible
          ? visibleStyle
          : hiddenStyles[animation] ?? hiddenStyles["fade-up"]),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ─── DATA ────────────────────────────────────────────────────
const agendaData = [
  {
    tanggal: "22",
    bulan: "FEB",
    judul: "Rapat Wali Murid Kelas X",
    lokasi: "Aula SMK N 3 Balige, 08.00 WIB",
  },
  {
    tanggal: "01",
    bulan: "MAR",
    judul: "Hari Pertama Belajar Semester Genap",
    lokasi: "Seluruh Kelas",
  },
  {
    tanggal: "15",
    bulan: "MAR",
    judul: "Ujian Tengah Semester Genap",
    lokasi: "Kelas X, XI & XII",
  },
  {
    tanggal: "20",
    bulan: "MAR",
    judul: "LKS Tingkat Provinsi Sumatera Utara",
    lokasi: "Medan, Sumatera Utara",
  },
];

const beritaUtama = {
  tanggal: "15 Februari 2025",
  judul: "SMK N 3 Balige Raih Akreditasi A dari BAN-SM Tahun 2024",
  ringkasan:
    "Setelah melalui proses penilaian panjang dan ketat, SMK Negeri 3 Balige berhasil meraih predikat Akreditasi A dari Badan Akreditasi Nasional Sekolah/Madrasah pada tahun ajaran 2024.",
  kategori: "PRESTASI",
  gambar:
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=700&q=80",
};

const beritaTerbaru = [
  {
    id: 1,
    kategori: "AKADEMIK",
    tanggal: "13 Maret 2025",
    judul: "Jadwal Ujian Akhir Semester Genap 2024/2025",
    ringkasan:
      "Jadwal UAS telah diterbitkan, siswa diharapkan mempersiapkan diri dengan baik.",
    gambar:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80",
  },
  {
    id: 2,
    kategori: "PRESTASI",
    tanggal: "13 Maret 2025",
    judul: "Juara I Lomba Masak Tingkat Kabupaten",
    ringkasan:
      "Siswa jurusan Multimedia berhasil membawa pulang medali emas di ajang Memasak Kabupaten Toba.",
    gambar:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80",
  },
  {
    id: 3,
    kategori: "KEGIATAN",
    tanggal: "13 Maret 2025",
    judul: "Pelaksanaan Praktik Kerja Lapangan Siswa Kelas XI",
    ringkasan:
      "Ratusan siswa kelas XI telah ditempatkan di 28 mitra industri untuk menjalani PKL semester ini.",
    gambar:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
  },
  {
    id: 4,
    kategori: "AKADEMIK",
    tanggal: "13 Maret 2025",
    judul: "Penandatanganan MoU dengan PT Sinom Pangkalan Susu",
    ringkasan:
      "SMK Negeri 3 Balige resmi menjalin kerja sama industri dengan PT Sinom Pangkalan Susu.",
    gambar:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&q=80",
  },
];

const pengumumanData = [
  {
    id: 1,
    judul: "Informasi PPDB Tahun Ajaran 2026/2027",
    isi: "Pendaftaran peserta didik baru akan dibuka mulai 1 Juni 2025 dengan 4 jalur pendaftaran.",
  },
  {
    id: 2,
    judul: "Jadwal Ulangan Semester Ganjil",
    isi: "UAS semester ganjil akan dilaksanakan tanggal 15-22 Desember 2026 untuk semua kelas.",
  },
  {
    id: 3,
    judul: "Jadwal Ulangan Semester Ganjil",
    isi: "UAS semester ganjil akan dilaksanakan tanggal 15-22 Desember 2026 untuk semua kelas.",
  },
  {
    id: 4,
    judul: "Jadwal Ulangan Semester Ganjil",
    isi: "UAS semester ganjil akan dilaksanakan tanggal 15-22 Desember 2026 untuk semua kelas.",
  },
];

const KATEGORI_COLOR = {
  AKADEMIK: "#F59E0B",
  PRESTASI: "#10B981",
  KEGIATAN: "#3B82F6",
  PENGUMUMAN: "#8B5CF6",
};

// ─── COMPONENT ───────────────────────────────────────────────
export default function BeritaPage() {
  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type"); // NULL, "pengumuman", atau "kegiatan"
  
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [search, setSearch] = useState("");

  const filters = ["Semua", "Berita", "Pengumuman", "Prestasi"];

  const filteredBerita = beritaTerbaru.filter((b) => {
    const matchFilter =
      activeFilter === "Semua" ||
      (activeFilter === "Berita" &&
        (b.kategori === "AKADEMIK" || b.kategori === "KEGIATAN")) ||
      (activeFilter === "Prestasi" && b.kategori === "PRESTASI") ||
      (activeFilter === "Pengumuman" && b.kategori === "PENGUMUMAN");
    const matchSearch =
      search === "" ||
      b.judul.toLowerCase().includes(search.toLowerCase()) ||
      b.ringkasan.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <ProfilLayout>
      {/* ── HERO ── */}
      <section className="bp-hero">
        <div className="bp-hero-content">
          <Animate animation="fade-up" delay={0} threshold={0.05}>
            <span className="bp-badge-tahun">Tahun Ajaran 2026/2027</span>
          </Animate>

          <Animate animation="fade-up" delay={100} threshold={0.05}>
            <h1 className="bp-hero-title">
              BERITA &amp; INFORMASI
              <br />
              SEKOLAH
            </h1>
          </Animate>

          <Animate animation="fade-up" delay={180} threshold={0.05}>
            <p className="bp-hero-desc">
              Temukan informasi terkini seputar kegiatan, prestasi,
              <br />
              dan pengumuman resmi dari SMK Negeri 3 Balige.
            </p>
          </Animate>

          <Animate animation="fade-up" delay={260} threshold={0.05}>
            <div className="bp-search-row">
              <div className="bp-search-wrap">
                <span className="bp-search-icon">
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </span>
                <input
                  className="bp-search-input"
                  placeholder="Cari berita atau pengumuman..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              {filters.map((f) => (
                <button
                  key={f}
                  className={`bp-filter-btn${activeFilter === f ? " bp-filter-active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </Animate>
        </div>
      </section>

      {/* ── BERITA UTAMA + AGENDA ── */}
      {typeFilter !== "pengumuman" && (
        <section className="bp-section bp-main-section">
          <div className="bp-container bp-main-grid">
          {/* Berita Utama */}
          <div className="bp-main-left">
            <Animate animation="fade-up" delay={0}>
              <h2 className="bp-section-title">
                <span className="bp-title-bar" />
                Berita Utama
              </h2>
            </Animate>
            <Animate animation="fade-left" delay={120}>
              <div className="bp-utama-card">
                <div className="bp-utama-img-wrap">
                  <img
                    src={beritaUtama.gambar}
                    alt="berita utama"
                    className="bp-utama-img"
                  />
                </div>
                <div className="bp-utama-body">
                  <span className="bp-utama-date">📅 {beritaUtama.tanggal}</span>
                  <h3 className="bp-utama-judul">{beritaUtama.judul}</h3>
                  <p className="bp-utama-ring">{beritaUtama.ringkasan}</p>
                  <button className="bp-btn-baca">Baca Selengkapnya</button>
                </div>
              </div>
            </Animate>
          </div>

          {/* Agenda Sekolah */}
          <div className="bp-main-right">
            <Animate animation="fade-up" delay={0}>
              <h2 className="bp-section-title">
                <span className="bp-title-bar" />
                Agenda Sekolah
              </h2>
            </Animate>
            <div className="bp-agenda-list">
              {agendaData.map((a, i) => (
                <Animate key={i} animation="fade-right" delay={i * 90}>
                  <div className="bp-agenda-item">
                    <div className="bp-agenda-date">
                      <span className="bp-agenda-day">{a.tanggal}</span>
                      <span className="bp-agenda-mon">{a.bulan}</span>
                    </div>
                    <div className="bp-agenda-info">
                      <div className="bp-agenda-judul">{a.judul}</div>
                      <div className="bp-agenda-lokasi">{a.lokasi}</div>
                    </div>
                  </div>
                </Animate>
              ))}
              <Animate animation="fade-up" delay={agendaData.length * 90}>
                <div className="bp-agenda-semua">Semua →</div>
              </Animate>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── BERITA TERBARU ── */}
      {typeFilter !== "pengumuman" && (
        <section className="bp-section bp-berita-section">
        <div className="bp-container">
          <Animate animation="fade-up" delay={0}>
            <h2 className="bp-section-title">
              <span className="bp-title-bar" />
              Berita Terbaru
            </h2>
          </Animate>

          <div className="bp-berita-grid">
            {filteredBerita.length === 0 ? (
              <Animate animation="fade-in" delay={0}>
                <div className="bp-empty">Tidak ada berita yang ditemukan.</div>
              </Animate>
            ) : (
              filteredBerita.map((b, idx) => (
                <Animate key={b.id} animation="fade-up" delay={idx * 110}>
                  <div className="bp-berita-card">
                    <div className="bp-berita-img-wrap">
                      <img
                        src={b.gambar}
                        alt={b.judul}
                        className="bp-berita-img"
                      />
                    </div>
                    <div className="bp-berita-body">
                      <div className="bp-berita-meta">
                        <span
                          className="bp-berita-kat"
                          style={{
                            color: KATEGORI_COLOR[b.kategori] || "#F59E0B",
                          }}
                        >
                          {b.kategori}
                        </span>
                        <span className="bp-berita-date">📅 {b.tanggal}</span>
                      </div>
                      <h3 className="bp-berita-judul">{b.judul}</h3>
                      <p className="bp-berita-ring">{b.ringkasan}</p>
                    </div>
                  </div>
                </Animate>
              ))
            )}
          </div>
        </div>
      </section>
      )}

      {/* ── PENGUMUMAN ── */}
      {typeFilter !== "kegiatan" && (
        <section className="bp-section bp-pengumuman-section">
        <div className="bp-container">
          <Animate animation="fade-up" delay={0}>
            <h2 className="bp-section-title">
              <span className="bp-title-bar" />
              Pengumuman
            </h2>
          </Animate>

          <div className="bp-peng-grid">
            {pengumumanData.map((p, idx) => (
              <Animate key={p.id} animation="fade-up" delay={idx * 100}>
                <div className="bp-peng-card">
                  <div className="bp-peng-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                  </div>
                  <h3 className="bp-peng-judul">{p.judul}</h3>
                  <p className="bp-peng-isi">{p.isi}</p>
                  <button className="bp-btn-lihat">Lihat Selengkapnya</button>
                </div>
              </Animate>
            ))}
          </div>
        </div>
      </section>
      )}
    </ProfilLayout>
  );
}
