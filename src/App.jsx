// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ── Public Pages ──────────────────────────────────────────────────────────────
import BerandaPage    from "./features/profil/pages/BerandaPage";
import BeritaPage from "./features/berita/components/pages/BeritaInformasi";
import ProfilPage     from "./features/profil/pages/ProfilPage";
import PortofolioPage from "./features/profil/pages/PortofolioPage";

// ── Admin — Dashboard ─────────────────────────────────────────────────────────
import AdminDashboardPage from "./features/admin/pages/AdminDashboardPage";

// ── Admin — Berita & Informasi ────────────────────────────────────────────────
import {
  AdminBeritaPage,
  AdminAgendaPage,
  AdminPengumumanPage,
} from "./features/admin/pages/AdminBeritaPage";

// ── Admin — Profil Sekolah ────────────────────────────────────────────────────
import { AdminSejarahPage } from "./features/admin/pages/AdminSejarahPage";
import {
  AdminVisiMisiPage,
  AdminStrukturPage,
  AdminProgramPage,
} from "./features/admin/pages/AdminVisiMisiStrukturProgramPage";
import {
  AdminFasilitasPage,
  AdminPrestasiPage,
  AdminMitraPage,
} from "./features/admin/pages/AdminFasilitasPrestasiMitraPage";

// ── Admin — Lainnya ───────────────────────────────────────────────────────────
import AdminPelanggaranPage from "./features/admin/pages/AdminPelanggaranPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── PUBLIC ───────────────────────────────────────────────────────── */}
        {/* Navbar: Beranda */}
        <Route path="/"           element={<BerandaPage />}    />

        {/* Navbar: Berita & Informasi */}
        <Route path="/berita"     element={<BeritaPage />}     />

        {/* Navbar: Profil Sekolah */}
        <Route path="/profil"     element={<ProfilPage />}     />

        {/* Navbar: Portofolio & Skill */}
        <Route path="/portofolio" element={<PortofolioPage />} />

        {/* ── ADMIN ────────────────────────────────────────────────────────── */}
        {/* Dashboard */}
        <Route path="/admin"            element={<AdminDashboardPage />}  />

        {/* Berita & Informasi */}
        <Route path="/admin/berita"     element={<AdminBeritaPage />}     />
        <Route path="/admin/agenda"     element={<AdminAgendaPage />}     />
        <Route path="/admin/pengumuman" element={<AdminPengumumanPage />} />

        {/* Profil Sekolah */}
        <Route path="/admin/sejarah"    element={<AdminSejarahPage />}    />
        <Route path="/admin/visi-misi"  element={<AdminVisiMisiPage />}   />
        <Route path="/admin/struktur"   element={<AdminStrukturPage />}   />
        <Route path="/admin/program"    element={<AdminProgramPage />}    />
        <Route path="/admin/fasilitas"  element={<AdminFasilitasPage />}  />
        <Route path="/admin/prestasi"   element={<AdminPrestasiPage />}   />
        <Route path="/admin/mitra"      element={<AdminMitraPage />}      />

        {/* Lainnya */}
        <Route path="/admin/pelanggaran" element={<AdminPelanggaranPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
