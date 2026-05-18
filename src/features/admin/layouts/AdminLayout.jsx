// src/features/admin/layouts/AdminLayout.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { showConfirmDialog } from "../../../helpers/toolsHelper";

const navItems = {
  utama: [
    { to: "/admin", icon: "🏠", label: "Dashboard", end: true },
  ],
  berita: [
    { to: "/admin/berita",      icon: "📰", label: "Berita"      },
    { to: "/admin/agenda",      icon: "📅", label: "Agenda"      },
    { to: "/admin/pengumuman",  icon: "📢", label: "Pengumuman"  },
  ],
  profil: [
    { to: "/admin/sejarah",     icon: "📜", label: "Sejarah & Identitas" },
    { to: "/admin/visi-misi",   icon: "🌟", label: "Visi & Misi"         },
    { to: "/admin/struktur",    icon: "🏢", label: "Struktur Organisasi"  },
    { to: "/admin/program",     icon: "🎓", label: "Program Keahlian"     },
    { to: "/admin/fasilitas",   icon: "🏫", label: "Fasilitas"            },
    { to: "/admin/prestasi",    icon: "🏆", label: "Prestasi"             },
    { to: "/admin/mitra",       icon: "🤝", label: "Mitra Kerjasama"      },
  ],
  lainnya: [
    { to: "/admin/pelanggaran", icon: "⚠️", label: "Pelanggaran" },
  ],
};

function NavGroup({ label, items, onClose }) {
  return (
    <>
      <span className="smk-admin-nav-label">{label}</span>
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `smk-admin-nav-item${isActive ? " active" : ""}`
          }
          onClick={onClose}
        >
          <span className="smk-admin-nav-icon">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </>
  );
}

export default function AdminLayout({ children, title = "Admin Panel" }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = async () => {
    const result = await showConfirmDialog("Apakah kamu yakin ingin keluar?");
    if (result.isConfirmed) {
      localStorage.removeItem("accessToken");
      navigate("/admin/login");
    }
  };

  return (
    <div className="smk-admin-layout">
      {/* OVERLAY mobile */}
      {sidebarOpen && (
        <div className="smk-admin-overlay" onClick={closeSidebar} />
      )}

      {/* SIDEBAR */}
      <aside className={`smk-admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="smk-admin-brand">
          <div className="smk-admin-brand-logo">S3</div>
          <div className="smk-admin-brand-text">
            <strong>SMK N3 Balige</strong>
            <span>Admin Panel</span>
          </div>
        </div>

        <nav className="smk-admin-nav">
          {/* Dashboard */}
          <NavGroup label="Utama"   items={navItems.utama}   onClose={closeSidebar} />

          {/* Berita, Agenda, Pengumuman */}
          <NavGroup label="Berita & Informasi" items={navItems.berita} onClose={closeSidebar} />

          {/* Profil Sekolah */}
          <NavGroup label="Profil Sekolah" items={navItems.profil} onClose={closeSidebar} />

          {/* Lainnya */}
          <NavGroup label="Lainnya" items={navItems.lainnya} onClose={closeSidebar} />
        </nav>

        <div className="smk-admin-sidebar-footer">
          <NavLink to="/" target="_blank" className="smk-admin-nav-item">
            <span className="smk-admin-nav-icon">🌐</span>
            Lihat Website
          </NavLink>
          <button className="smk-admin-nav-item smk-admin-logout" onClick={handleLogout}>
            <span className="smk-admin-nav-icon">🚪</span>
            Keluar
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="smk-admin-main">
        {/* TOPBAR */}
        <header className="smk-admin-topbar">
          <button
            className="smk-admin-burger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="smk-admin-topbar-title">{title}</h1>
          <div className="smk-admin-topbar-right">
            <div className="smk-admin-user">
              <div className="smk-admin-avatar">A</div>
              <span>Admin</span>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="smk-admin-content">{children}</div>
      </div>
    </div>
  );
}
