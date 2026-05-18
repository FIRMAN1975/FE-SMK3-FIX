// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages (yang sudah ada)
import BerandaPage from "./features/profil/pages/BerandaPage";
import ProfilPage from "./features/profil/pages/ProfilPage";
import PortofolioList from "./features/portofolio/pages/PortofolioList";
import PortofolioForm from "./features/portofolio/pages/PortofolioForm";
import PortofolioDetail from "./features/portofolio/pages/PortofolioDetail";
// ── Public Pages ──────────────────────────────────────────────────────────────

import BeritaPage from "./features/berita/components/pages/BeritaInformasi";

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
        {/* ── Public ── */}
        <Route path="/" element={<BerandaPage />} />
        <Route path="/berita" element={<BeritaPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/portofolio" element={<PortofolioList />} />
        <Route path="/portofolio/tambah" element={<PortofolioForm />} />
        <Route path="/portofolio/edit/:id" element={<PortofolioForm />} />
        <Route path="/portofolio/:id" element={<PortofolioDetail />} />

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
