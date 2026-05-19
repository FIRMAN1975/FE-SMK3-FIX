import { NavLink } from "react-router-dom";
import { useState } from "react";
// 1. Import hook useAuth dari pabrik Keycloak kita
import { useAuth } from "../../auth/context/AuthContext"; 

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  
  // 2. Panggil status dan fungsi dari AuthContext
  const { isAuth, login, logout } = useAuth();

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="smk-navbar">
      <div className="smk-nav-inner">
        
        {/* Logo */}
        <div className="smk-nav-logo">
          <div className="smk-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L2 9L12 15L22 9L12 3Z" fill="white" />
              <path d="M2 15L12 21L22 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="smk-logo-text">
            <strong>SMK NEGERI 3 BALIGE</strong>
            <span>Excellence in Education</span>
          </div>
        </div>

        {/* Menu Publik */}
        <nav className="smk-nav-menu">
          <NavLink to="/" className={({ isActive }) => `smk-nav-item${isActive ? " smk-nav-active" : ""}`}>
            Beranda
          </NavLink>

          <div className="smk-nav-dropdown">
            <NavLink
              to="/berita"
              className={({ isActive }) => `smk-nav-item${isActive ? " smk-nav-active" : ""}`}
              onClick={() => toggleDropdown("berita")}
            >
              Berita &amp; Informasi <span className="smk-caret">▾</span>
            </NavLink>
            <div className="smk-dropdown-menu">
              <NavLink to="/berita" className="smk-dropdown-item">Pengumuman</NavLink>
              <NavLink to="/berita" className="smk-dropdown-item">Kegiatan Sekolah</NavLink>
            </div>
          </div>

          <div className="smk-nav-dropdown">
            <NavLink
              to="/profil"
              className={({ isActive }) => `smk-nav-item${isActive ? " smk-nav-active" : ""}`}
            >
              Profil Sekolah <span className="smk-caret">▾</span>
            </NavLink>
            <div className="smk-dropdown-menu">
              <NavLink to="/profil" className="smk-dropdown-item">Sejarah &amp; Identitas</NavLink>
              <NavLink to="/profil" className="smk-dropdown-item">Visi &amp; Misi</NavLink>
              <NavLink to="/profil" className="smk-dropdown-item">Struktur Organisasi</NavLink>
            </div>
          </div>

          <div className="smk-nav-dropdown">
            <NavLink
              to="/portofolio"
              className={({ isActive }) => `smk-nav-item${isActive ? " smk-nav-active" : ""}`}
            >
              Portofolio &amp; Skill <span className="smk-caret">▾</span>
            </NavLink>
            <div className="smk-dropdown-menu">
              <NavLink to="/portofolio" className="smk-dropdown-item">Karya Siswa</NavLink>
              <NavLink to="/portofolio" className="smk-dropdown-item">Kompetensi</NavLink>
            </div>
          </div>
        </nav>

        {/* 3. Logic Tombol Login / Logout */}
        <div className="smk-nav-auth">
          {!isAuth ? (
            // Jika belum login, tampilkan tombol Login Keycloak
            <button onClick={login} className="smk-btn-login">
              LOGIN
            </button>
          ) : (
            // Jika sudah login, tampilkan tombol Dashboard dan Logout
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <NavLink to="/admin" className="smk-btn-dashboard" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>
                Dashboard
              </NavLink>
              <button 
                onClick={logout} 
                className="smk-btn-login" 
                style={{ backgroundColor: "#ef4444" }} // Contoh warna merah untuk tombol logout
              >
                LOGOUT
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}