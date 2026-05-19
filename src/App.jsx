// src/App.jsx — UPDATED (tambahkan route admin)
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages (yang sudah ada)
import BerandaPage from "./features/profil/pages/BerandaPage";
import BeritaPage from "./features/profil/pages/BeritaPage";
import PortofolioPage from "./features/profil/pages/PortofolioPage";
import ProfilPage from "./features/profil/pages/ProfilPage";

// Admin pages (baru)
import AdminDashboardPage from "./features/admin/pages/AdminDashboardPage";
import { AdminSejarahPage } from "./features/admin/pages/AdminSejarahPage";
import { AdminVisiMisiPage, AdminStrukturPage, AdminProgramPage } from "./features/admin/pages/AdminVisiMisiStrukturProgramPage";
import { AdminFasilitasPage, AdminPrestasiPage, AdminMitraPage } from "./features/admin/pages/AdminFasilitasPrestasiMitraPage";

//manajemen data
import DataSiswaPage from "./features/manajemen-data/pages/DataSiswaPage";
import AddSiswaPage from "./features/manajemen-data/pages/AddSiswaPage";
import EditSiswaPage from "./features/manajemen-data/pages/EditSiswaPage";
import DataGuruPage from "./features/manajemen-data/pages/DataGuruPage";
import AddGuruPage from "./features/manajemen-data/pages/AddGuruPage";
import EditGuruPage from "./features/manajemen-data/pages/EditGuruPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public ── */}
        <Route path="/" element={<BerandaPage />} />
        <Route path="/berita" element={<BeritaPage />} />
        <Route path="/profil" element={<ProfilPage />} />
        <Route path="/portofolio" element={<PortofolioPage />} />

        {/* ── Admin ── */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/sejarah" element={<AdminSejarahPage />} />
        <Route path="/admin/visi-misi" element={<AdminVisiMisiPage />} />
        <Route path="/admin/struktur" element={<AdminStrukturPage />} />
        <Route path="/admin/program" element={<AdminProgramPage />} />
        <Route path="/admin/fasilitas" element={<AdminFasilitasPage />} />
        <Route path="/admin/prestasi" element={<AdminPrestasiPage />} />
        <Route path="/admin/mitra" element={<AdminMitraPage />} />

        {/*Manajemen Data*/}
        <Route path="/admin/data/siswa" element={<DataSiswaPage/>} />
        <Route path="/admin/data/siswa/add" element={<AddSiswaPage/>} />
        <Route path="/admin/data/siswa/edit/:id" element={<EditSiswaPage/>} />

        <Route path="/admin/data/guru" element={<DataGuruPage/>} />
        <Route path="/admin/data/guru/add" element={<AddGuruPage/>} />
        <Route path="/admin/data/guru/edit/:id" element={<EditGuruPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
