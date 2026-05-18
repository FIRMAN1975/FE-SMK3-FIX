import { NavLink } from "react-router-dom";
import { useState } from "react";
// 1. Import hook useAuth dari pabrik Keycloak kita
import { useAuth } from "../../auth/context/AuthContext";

export default function Navbar() {
  // 2. Panggil status dan fungsi dari AuthContext
  const { isAuth, login, logout } = useAuth();

  return (
    <header className="smk-navbar">
      <div className="smk-nav-inner">
        {/* Logo */}
        <div className="smk-nav-logo">
          <div className="smk-logo-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M12 3L2 9L12 15L22 9L12 3Z" fill="white" />
              <path
                d="M2 15L12 21L22 15"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="smk-logo-text">
            <strong>SMK NEGERI 3 BALIGE</strong>
            <span>Excellence in Education</span>
          </div>
        </div>

        {/* Menu */}
        <nav className="smk-nav-menu">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `smk-nav-item${isActive ? " smk-nav-active" : ""}`
            }
          >
            Beranda
          </NavLink>

          <NavLink
            to="/berita"
            className={({ isActive }) =>
              `smk-nav-item${isActive ? " smk-nav-active" : ""}`
            }
          >
            Berita &amp; Informasi
          </NavLink>

          <NavLink
            to="/profil"
            className={({ isActive }) =>
              `smk-nav-item${isActive ? " smk-nav-active" : ""}`
            }
          >
            Profil Sekolah
          </NavLink>

          <NavLink
            to="/portofolio"
            className={({ isActive }) =>
              `smk-nav-item${isActive ? " smk-nav-active" : ""}`
            }
          >
            Portofolio &amp; Skill
          </NavLink>
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
              <NavLink
                to="/admin"
                className="smk-btn-dashboard"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
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
