// src/features/admin/pages/AdminDashboardPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { AdminStatCard } from "../components/AdminComponents";
import { asyncLoadAllProfilData } from "../../profil/states/action";
import { asyncLoadAllBeritaData } from "../../berita/states/action";

// ── Quick Actions ─────────────────────────────────────────────────────────────
const quickActions = [
  { to: "/admin/berita",      icon: "📰", label: "Berita",             highlight: true },
  { to: "/admin/agenda",      icon: "📅", label: "Agenda",             highlight: true },
  { to: "/admin/pengumuman",  icon: "📢", label: "Pengumuman",         highlight: true },
  { to: "/admin/sejarah",     icon: "📜", label: "Sejarah & Identitas" },
  { to: "/admin/visi-misi",   icon: "🌟", label: "Visi & Misi"         },
  { to: "/admin/struktur",    icon: "🏢", label: "Struktur Organisasi" },
  { to: "/admin/program",     icon: "🎓", label: "Program Keahlian"    },
  { to: "/admin/fasilitas",   icon: "🏫", label: "Fasilitas"           },
  { to: "/admin/prestasi",    icon: "🏆", label: "Prestasi"            },
  { to: "/admin/mitra",       icon: "🤝", label: "Mitra Kerjasama"     },
  { to: "/admin/pelanggaran",  icon: "⚠️",    label:"pelanggaran" } // jan lupa bikin nya
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function AdminDashboardPage() {
  const dispatch = useDispatch();

  // ── Profil selectors
  const program   = useSelector((s) => s.programKeahlian || []);
  const fasilitas = useSelector((s) => s.fasilitas       || []);
  const prestasi  = useSelector((s) => s.prestasi        || []);
  const mitra     = useSelector((s) => s.mitraKerjasama  || []);

  // ── Berita selectors
  const berita     = useSelector((s) => s.berita     || []);
  const agenda     = useSelector((s) => s.agenda     || []);
  const pengumuman = useSelector((s) => s.pengumuman || []);

  useEffect(() => {
    dispatch(asyncLoadAllProfilData());
    dispatch(asyncLoadAllBeritaData());
  }, [dispatch]);

  return (
    <AdminLayout title="Dashboard">

      {/* ── STATS ROW ─────────────────────────────────────────────────────── */}
      <div className="smk-admin-stats-row">
        {/* Berita */}
        <AdminStatCard icon="📰" value={berita.length}     label="Total Berita"     color="blue"   />
        <AdminStatCard icon="📅" value={agenda.length}     label="Agenda"           color="teal"   />
        <AdminStatCard icon="📢" value={pengumuman.length} label="Pengumuman"       color="purple" />
        {/* Profil */}
        <AdminStatCard icon="🎓" value={program.length}    label="Program Keahlian" color="orange" />
        <AdminStatCard icon="🏆" value={prestasi.length}   label="Prestasi"         color="gold"   />
        <AdminStatCard icon="🤝" value={mitra.length}      label="Mitra Kerjasama"  color="navy"   />
      </div>

      <div className="smk-admin-dashboard-grid">

        {/* ── QUICK ACTIONS ───────────────────────────────────────────────── */}
        <div className="smk-admin-card">
          <div className="smk-admin-card-header">
            <div>
              <div className="smk-admin-card-title">⚡ Aksi Cepat</div>
              <div className="smk-admin-card-sub">Kelola konten langsung dari sini</div>
            </div>
          </div>
          <div className="smk-admin-card-body">
            <div className="smk-admin-quick-grid">
              {quickActions.map((q) => (
                <NavLink
                  key={q.to}
                  to={q.to}
                  className="smk-admin-quick-item"
                  style={q.highlight ? { borderColor: "#0f2244", color: "#0f2244", fontWeight: 600 } : {}}
                >
                  <span className="smk-admin-quick-icon">{q.icon}</span>
                  <span>{q.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* ── INFORMASI SISTEM ────────────────────────────────────────────── */}
        <div className="smk-admin-card">
          <div className="smk-admin-card-header">
            <div className="smk-admin-card-title">ℹ️ Informasi Sistem</div>
          </div>
          <div className="smk-admin-card-body">
            <div className="smk-admin-info-list">

              <div className="smk-admin-info-item">
                <div className="smk-admin-info-dot" />
                <div>
                  <div className="smk-admin-info-text">Backend NestJS terhubung</div>
                  <div className="smk-admin-info-sub">API: <code>http://localhost:3000/api</code></div>
                </div>
              </div>

              <div className="smk-admin-info-item">
                <div className="smk-admin-info-dot smk-info-blue" />
                <div>
                  <div className="smk-admin-info-text">Semua operasi CRUD aktif</div>
                  <div className="smk-admin-info-sub">GET · POST · PUT · DELETE</div>
                </div>
              </div>

              <div className="smk-admin-info-item">
                <div className="smk-admin-info-dot smk-info-gold" />
                <div>
                  <div className="smk-admin-info-text">Modul Berita & Informasi</div>
                  <div className="smk-admin-info-sub">Berita · Agenda · Pengumuman</div>
                </div>
              </div>

              <div className="smk-admin-info-item">
                <div className="smk-admin-info-dot smk-info-blue" />
                <div>
                  <div className="smk-admin-info-text">Upload file tersedia</div>
                  <div className="smk-admin-info-sub">Berita · Fasilitas · Struktur · Mitra</div>
                </div>
              </div>

              <div className="smk-admin-info-item">
                <div className="smk-admin-info-dot" />
                <div>
                  <NavLink to="/" target="_blank" style={{ color: "var(--blue)", fontWeight: 600 }}>
                    🌐 Lihat halaman website →
                  </NavLink>
                  <div className="smk-admin-info-sub">Perubahan langsung terlihat</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}
