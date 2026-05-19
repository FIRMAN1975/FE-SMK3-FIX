// src/features/admin/pages/AdminDashboardPage.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import { AdminStatCard } from "../components/AdminComponents";
import { asyncLoadAllProfilData } from "../../profil/states/action";

const quickActions = [
  { to: "/admin/sejarah",   icon: "📜", label: "Sejarah & Identitas" },
  { to: "/admin/visi-misi", icon: "🌟", label: "Visi & Misi"          },
  { to: "/admin/struktur",  icon: "🏢", label: "Struktur Organisasi"  },
  { to: "/admin/program",   icon: "🎓", label: "Program Keahlian"     },
  { to: "/admin/fasilitas", icon: "🏫", label: "Fasilitas"            },
  { to: "/admin/prestasi",  icon: "🏆", label: "Prestasi"             },
  { to: "/admin/mitra",     icon: "🤝", label: "Mitra Kerjasama"      },
];

export default function AdminDashboardPage() {
  const dispatch = useDispatch();
  const sejarah  = useSelector((s) => s.sejarahIdentitas);
  const visiMisi = useSelector((s) => s.visiMisi);
  const program  = useSelector((s) => s.programKeahlian);
  const fasilitas= useSelector((s) => s.fasilitas);
  const prestasi = useSelector((s) => s.prestasi);
  const mitra    = useSelector((s) => s.mitraKerjasama);
  const loading  = useSelector((s) => s.profilLoading);

  useEffect(() => {
    dispatch(asyncLoadAllProfilData());
  }, [dispatch]);

  return (
    <AdminLayout title="Dashboard">
      {/* STATS */}
      <div className="smk-admin-stats-row">
        <AdminStatCard icon="📜" value={sejarah.length}  label="Sejarah & Identitas" color="blue"   />
        <AdminStatCard icon="🌟" value={visiMisi.length} label="Visi & Misi"          color="teal"   />
        <AdminStatCard icon="🎓" value={program.length}  label="Program Keahlian"     color="purple" />
        <AdminStatCard icon="🏫" value={fasilitas.length}label="Fasilitas"            color="orange" />
        <AdminStatCard icon="🏆" value={prestasi.length} label="Prestasi"             color="gold"   />
        <AdminStatCard icon="🤝" value={mitra.length}    label="Mitra Kerjasama"      color="navy"   />
      </div>

      <div className="smk-admin-dashboard-grid">
        {/* QUICK ACTIONS */}
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
                <NavLink key={q.to} to={q.to} className="smk-admin-quick-item">
                  <span className="smk-admin-quick-icon">{q.icon}</span>
                  <span>{q.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* INFO */}
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
                  <div className="smk-admin-info-sub">
                    API: <code>http://localhost:3000/api</code>
                  </div>
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
                  <div className="smk-admin-info-text">Upload file tersedia</div>
                  <div className="smk-admin-info-sub">Fasilitas · Struktur · Mitra</div>
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
