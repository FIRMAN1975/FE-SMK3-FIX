import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfilLayout from "../layouts/ProfilLayout";
import foto from "../../../assets/images/foto.png";
import {
  asyncLoadAllProfilData,
} from "../states/action";

// Ubah path file upload backend jadi URL lengkap
// Backend simpan file di "uploads/fasilitas/xxx.jpg"
// Agar bisa ditampilkan: http://localhost:3000/uploads/fasilitas/xxx.jpg
function toImgUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `http://localhost:3000/${path.replace(/\\/g, "/")}`;
}

export default function ProfilPage() {
  const dispatch = useDispatch();

  const sejarahIdentitas = useSelector((s) => s.sejarahIdentitas);
  const visiMisi = useSelector((s) => s.visiMisi);
  const strukturOrganisasi = useSelector((s) => s.strukturOrganisasi);
  const fasilitas = useSelector((s) => s.fasilitas);
  const prestasi = useSelector((s) => s.prestasi);
  const programKeahlian = useSelector((s) => s.programKeahlian);
  const mitraKerjasama = useSelector((s) => s.mitraKerjasama);
  const loading = useSelector((s) => s.profilLoading);

  useEffect(() => {
    dispatch(asyncLoadAllProfilData());
  }, [dispatch]);

  const visi = visiMisi.find((item) => item.tipe === "visi");
  const misiList = visiMisi.filter((item) => item.tipe === "misi");
  const sejarah = sejarahIdentitas[0] || null;

  return (
    <ProfilLayout>
      {/* ── HERO ── */}
      <section className="smk-hero">
        <div className="smk-hero-content">
          <div className="smk-hero-left">
            <span className="smk-badge">Tahun Ajaran 2024/2025</span>
            <h1>
              PROFIL SMK
              <br />
              NEGERI 3<br />
              BALIGE
            </h1>
            <p>
              Bergabunglah dengan kami dalam menciptakan masa depan yang cerah
              melalui pendidikan berkualitas, fasilitas modern, dan pengajaran
              yang inovatif.
            </p>
          </div>
          <div className="smk-hero-right">
            <img src={foto} alt="Gedung SMK Negeri 3 Balige" />
          </div>
        </div>
      </section>

      {/* ── SEJARAH & IDENTITAS ── */}
      <section className="smk-section">
        <div className="smk-container">
          <h2 className="smk-section-title">Sejarah &amp; Identitas</h2>
          {loading ? (
            <p className="smk-section-text" style={{ color: "#aaa" }}>Memuat data...</p>
          ) : sejarah ? (
            <p className="smk-section-text">
              {sejarah.tahun_berdiri && (
                <strong>Berdiri sejak {sejarah.tahun_berdiri}. </strong>
              )}
              {sejarah.deskripsi}
            </p>
          ) : (
            <p className="smk-section-text">
              Berdiri sejak [Tahun], SMK Negeri 3 Balige telah berkembang menjadi
              institusi vokasi unggulan yang fokus pada integrasi teknologi
              informasi dalam setiap aspek pendidikan. Kami berkomitmen untuk
              terus berinovasi dalam mencetak lulusan yang siap menghadapi
              tantangan industri global.
            </p>
          )}
        </div>
      </section>

      {/* ── VISI & MISI ── */}
      <section className="smk-section smk-bg-cream">
        <div className="smk-container smk-center">
          <h2 className="smk-section-title smk-title-center">
            Visi &amp; Misi
          </h2>
          <div className="smk-vm-grid">
            <div className="smk-vm-card">
              <div className="smk-vm-icon" style={{ background: "#F4C430" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              </div>
              <h3 className="smk-vm-title">Visi</h3>
              <p>
                {visi ? visi.deskripsi : "Menjadi sekolah vokasi unggulan yang menghasilkan lulusan berakhlak mulia, kompeten, dan berdaya saing di tingkat nasional dan internasional pada tahun 2030."}
              </p>
            </div>

            <div className="smk-vm-card">
              <div className="smk-vm-icon" style={{ background: "#5A82F2" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z" />
                </svg>
              </div>
              <h3 className="smk-vm-title">Misi</h3>
              {misiList.length > 0 ? (
                <ul style={{ textAlign: "left", paddingLeft: "20px", lineHeight: "1.9" }}>
                  {misiList.map((item) => (
                    <li key={item.id}>{item.deskripsi}</li>
                  ))}
                </ul>
              ) : (
                <p>
                  Menyelenggarakan pendidikan kejuruan berbasis teknologi,
                  membangun kemitraan industri strategis, mengembangkan karakter
                  dan kompetensi siswa, serta mewujudkan lingkungan belajar yang
                  inovatif dan berbudaya.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── STRUKTUR ORGANISASI ── */}
      <section className="smk-section">
        <div className="smk-container smk-center">
          <h2 className="smk-section-title smk-title-center">
            Struktur Organisasi
          </h2>
          {strukturOrganisasi.length > 0 ? (
            <img
              src={toImgUrl(strukturOrganisasi[0].gambar)}
              alt="Struktur Organisasi"
              style={{ maxWidth: "100%", borderRadius: "12px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
            />
          ) : (
            <div className="smk-org-chart">
              <div className="smk-org-row">
                <div className="smk-org-box smk-org-primary">Kepala Sekolah</div>
              </div>
              <div className="smk-org-connector-v" />
              <div className="smk-org-row">
                <div className="smk-org-box smk-org-primary">
                  Wakil Kepala Sekolah
                </div>
              </div>
              <div className="smk-org-connector-v" />
              <div className="smk-org-row smk-org-row-multi">
                <div className="smk-org-box">Waka Kurikulum</div>
                <div className="smk-org-box">Waka Kesiswaan</div>
                <div className="smk-org-box">Waka Sarpras</div>
                <div className="smk-org-box">Waka Humas</div>
              </div>
              <div className="smk-org-connector-v" />
              <div className="smk-org-row smk-org-row-multi">
                <div className="smk-org-box smk-org-small">Kepala Tata Usaha</div>
                <div className="smk-org-box smk-org-small">Dewan Guru</div>
                <div className="smk-org-box smk-org-small">Wali Kelas</div>
              </div>
              <div className="smk-org-connector-v" />
              <div className="smk-org-row">
                <div className="smk-org-box smk-org-student">SISWA</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FASILITAS & SARANA ── */}
      <section className="smk-section smk-bg-cream">
        <div className="smk-container smk-center">
          <h2 className="smk-section-title smk-title-center">
            Fasilitas &amp; Sarana Belajar
          </h2>
          <div className="smk-facility-grid">
            {fasilitas.length > 0 ? (
              fasilitas.map((item) => (
                <div className="smk-facility-card" key={item.id}>
                  <img
                    src={toImgUrl(item.foto) || "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80"}
                    alt={item.nama_fasilitas}
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80"; }}
                  />
                  <span className="smk-facility-label">{item.nama_fasilitas}</span>
                </div>
              ))
            ) : (
              // Fallback data statis jika API belum ada data
              [
                { label: "Lab Kimia", img: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&q=80" },
                { label: "Lapangan Olahraga", img: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=400&q=80" },
                { label: "Studio Multimedia", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
                { label: "Lapangan Olahraga", img: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80" },
                { label: "Ruang Belajar", img: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&q=80" },
                { label: "Koperasi Sekolah", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80" },
              ].map((item, idx) => (
                <div className="smk-facility-card" key={idx}>
                  <img src={item.img} alt={item.label} />
                  <span className="smk-facility-label">{item.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── AKREDITASI & PRESTASI ── */}
      <section className="smk-section">
        <div className="smk-container smk-center">
          <h2 className="smk-section-title smk-title-center">
            Akreditasi &amp; Prestasi
          </h2>
          <div className="smk-prestasi-block">
            {prestasi.length > 0 ? (
              <ul className="smk-prestasi-list">
                {prestasi.map((item, idx) => (
                  <li key={item.id}>
                    {`${idx + 1}. ${item.judul} — ${item.tingkat.charAt(0).toUpperCase() + item.tingkat.slice(1)}, ${item.tahun}`}
                    {item.keterangan && ` (${item.keterangan})`}
                  </li>
                ))}
              </ul>
            ) : (
              <>
                <ul className="smk-prestasi-list">
                  {[
                    "Juara I LKS Bidang Electronic Application Tk. Kabupaten, 2016",
                    "Juara I LKS Bidang Electronic Application Tk. Provinsi, 2016",
                    "Juara V LKS Bidang Electronic Application Tk. Nasional, 2016",
                    "Juara I LKS Bidang Automobile Technology Tk. Kabupaten, 2016",
                    "Juara II LKS Bidang Electronic Application Tk. Provinsi, 2017",
                    "Juara II LKS Bidang CNC Turning Tk. Provinsi, 2017",
                    "Juara I LKS Bidang Cabinet Making Tk. Provinsi 2019",
                  ].map((item, idx) => <li key={idx}>{`${idx + 1}. ${item}`}</li>)}
                </ul>
                <p className="smk-prestasi-subtitle">
                  Pencapaian Prestasi Lomba Kompetensi Siswa Tahun 2021 Di Masa Pandemi Covid – 19
                </p>
                <ul className="smk-prestasi-list">
                  {[
                    "Juara I LKS Bidang Electronic Tk. Provinsi 2021",
                    "Juara I LKS Bidang Wall and Floor Tiling Tk. Provinsi 2021",
                    "Juara II LKS Bidang Cabinet Making Tk. Provinsi 2021",
                  ].map((item, idx) => <li key={idx}>{`${idx + 1}. ${item}`}</li>)}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── JURUSAN / PROGRAM KEAHLIAN ── */}
      <section className="smk-section smk-bg-cream">
        <div className="smk-container smk-center">
          <span className="smk-badge smk-badge-outline">Program Keahlian</span>
          <h2 className="smk-section-title smk-title-center" style={{ marginTop: "16px" }}>
            Jurusan Di SMK Negeri 3 Balige
          </h2>
          <p className="smk-section-subtitle">
            Pilihan program keahlian di SMK Negeri 3 Balige.
          </p>
          <div className="smk-jurusan-grid">
            {programKeahlian.length > 0 ? (
              programKeahlian.map((item) => (
                <div className="smk-jurusan-card" key={item.id}>
                  <div className="smk-jurusan-icon" style={{ background: "#5A82F2" }}>
                    <span>{item.icon || "🎓"}</span>
                  </div>
                  <h3 className="smk-jurusan-title">{item.nama_jurusan}</h3>
                  <p className="smk-jurusan-desc">{item.deskripsi}</p>
                </div>
              ))
            ) : (
              [
                { icon: "👨‍🍳", iconBg: "#5A82F2", title: "Tataboga", desc: "Pengolahan dan penyajian makanan yang lezat dan menarik." },
                { icon: "🏨", iconBg: "#5A82F2", title: "Perhotelan", desc: "Bidang yang berfokus pada pelayanan profesional dan pengelolaan di industri hotel." },
              ].map((item, idx) => (
                <div className="smk-jurusan-card" key={idx}>
                  <div className="smk-jurusan-icon" style={{ background: item.iconBg }}>
                    <span>{item.icon}</span>
                  </div>
                  <h3 className="smk-jurusan-title">{item.title}</h3>
                  <p className="smk-jurusan-desc">{item.desc}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── MITRA KERJASAMA ── */}
      <section className="smk-section">
        <div className="smk-container smk-center">
          <span className="smk-badge smk-badge-outline">Mitra Kerjasama</span>
          <h2 className="smk-section-title smk-title-center" style={{ marginTop: "16px" }}>
            Mitra Kerjasama
          </h2>
          <div className="smk-mitra-grid">
            {mitraKerjasama.length > 0 ? (
              mitraKerjasama.map((item) => (
                <div className="smk-mitra-card" key={item.id}>
                  {item.logo ? (
                    <img
                      src={toImgUrl(item.logo)}
                      alt={item.nama_mitra}
                      style={{ width: 56, height: 56, objectFit: "contain", marginBottom: 8 }}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <span className="smk-mitra-logo">🤝</span>
                  )}
                  <span className="smk-mitra-name">{item.nama_mitra}</span>
                </div>
              ))
            ) : (
              [
                { name: "Hotel Niagara Parapat", logo: "🏨" },
                { name: "Labersa Hotel & Convention Center", logo: "🏨" },
                { name: "Pizza Hut Indonesia", logo: "🍕" },
                { name: "J.CO Donuts & Coffee", logo: "🍩" },
              ].map((item, idx) => (
                <div className="smk-mitra-card" key={idx}>
                  <span className="smk-mitra-logo">{item.logo}</span>
                  <span className="smk-mitra-name">{item.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </ProfilLayout>
  );
}
