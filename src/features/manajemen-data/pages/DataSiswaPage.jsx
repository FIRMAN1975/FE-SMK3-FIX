import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncGetSiswa,
  asyncGetStatsSiswa,
  asyncDeleteSiswa,
} from "../states/action";
import manajemenApi from "../api/manajemenApi.js";
import { showSuccessDialog, showErrorDialog } from "../../../helpers/toolsHelper";
import "../resources/manajemen.css";
import AdminLayout from "../../admin/layouts/AdminLayout.jsx";

export default function DataSiswaPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const siswa  = useSelector((s) => s.siswa)        ?? [];
  const stats  = useSelector((s) => s.statsSiswa);
  const hasMore = useSelector((s) => s.hasMoreSiswa);

  const [search,        setSearch]        = useState("");
  const [filterKelas,   setFilterKelas]   = useState("");
  const [filterJurusan, setFilterJurusan] = useState("");
  const [offset,        setOffset]        = useState(0);
  const [importLoading, setImportLoading] = useState(false);
  const [deleteModal,   setDeleteModal]   = useState({ open: false, id: null, nama: "" });

  const perPage     = 20;
  const currentPage = Math.floor(offset / perPage) + 1;

  // Fetch data saat offset berubah
  useEffect(() => {
    dispatch(asyncGetSiswa(offset, perPage));
    dispatch(asyncGetStatsSiswa());
  }, [dispatch, offset]);

  // Reset ke halaman 1 saat filter berubah
  useEffect(() => {
    setOffset(0);
  }, [search, filterKelas, filterJurusan]);

  // ── Handlers ──────────────────────────────────────────────────
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportLoading(true);
    try {
      const res = await manajemenApi.importSiswa(file);
      const { imported, skipped } = res.data;
      showSuccessDialog(`Import berhasil! ${imported} data masuk, ${skipped} dilewati.`);
      dispatch(asyncGetSiswa(offset, perPage));
      dispatch(asyncGetStatsSiswa());
    } catch (err) {
      showErrorDialog(err.message);
    } finally {
      setImportLoading(false);
      e.target.value = "";
    }
  };

  const handleExport = async () => {
    await manajemenApi.exportSiswa({ search });
  };

  const handleDeleteClick   = (item) => setDeleteModal({ open: true, id: item.id, nama: item.namaLengkap });
  const handleDeleteCancel  = ()     => setDeleteModal({ open: false, id: null, nama: "" });
  const handleDeleteConfirm = ()     => {
    dispatch(asyncDeleteSiswa(deleteModal.id));
    setDeleteModal({ open: false, id: null, nama: "" });
  };

  // ── Filter lokal (dari data yang sudah di-fetch) ───────────────
  const kelasList   = [...new Set(siswa.map((s) => s.kelas).filter(Boolean))];
  const jurusanList = [...new Set(siswa.map((s) => s.jurusan).filter(Boolean))];

  const filtered = siswa.filter((item) => {
    const matchSearch  = item.namaLengkap?.toLowerCase().includes(search.toLowerCase());
    const matchKelas   = filterKelas   ? item.kelas   === filterKelas   : true;
    const matchJurusan = filterJurusan ? item.jurusan === filterJurusan : true;
    return matchSearch && matchKelas && matchJurusan;
  });

  // ── Render ────────────────────────────────────────────────────
  return (
    <AdminLayout>
      <section className="smk-section smk-bg-cream">

        {/* HEADER */}
        <div className="smk-header-area">
          <h1 className="smk-section-title">
            Data Siswa <span className="text-primary">SMKN 3 BALIGE</span>
          </h1>
          <div className="smk-stats-row">
            <div className="smk-stat-pill">
              <span className="smk-stat-pill-icon">🏠</span>
              <span className="smk-stat-pill-number">{stats?.total || 0}</span>
            </div>
            <div className="smk-stat-pill">
              <span className="smk-stat-pill-icon">✅</span>
              <span className="smk-stat-pill-number">{stats?.aktif || 0}</span>
            </div>
            <div className="smk-stat-pill">
              <span className="smk-stat-pill-icon">🎓</span>
              <span className="smk-stat-pill-number">{stats?.lulus || 0}</span>
            </div>
          </div>
        </div>

        {/* KONTEN */}
        <div className="smk-container">
          <div style={{ borderTop: "1px solid #e5e7eb", margin: "32px 0" }} />

          {/* ACTION BAR */}
          <div className="smk-action-bar">
            <button onClick={() => navigate("/admin/data/siswa/add")} className="btn-primary">
              + Tambah Siswa
            </button>
            <div className="smk-filters">
              <input
                type="text"
                placeholder="cari....."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-search"
              />
              <select
                value={filterKelas}
                onChange={(e) => setFilterKelas(e.target.value)}
                className="input-select"
              >
                <option value="">Kelas</option>
                {kelasList.map((k) => <option key={k} value={k}>{k}</option>)}
              </select>
              <select
                value={filterJurusan}
                onChange={(e) => setFilterJurusan(e.target.value)}
                className="input-select"
              >
                <option value="">Jurusan</option>
                {jurusanList.map((j) => <option key={j} value={j}>{j}</option>)}
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>NISN</th>
                  <th>NIS</th>
                  <th>Nama</th>
                  <th>Kelas</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={item.id}>
                    <td>{offset + index + 1}</td>
                    <td>{item.nisn}</td>
                    <td>{item.nis}</td>
                    <td className="nama">{item.namaLengkap}</td>
                    <td>{item.kelas}</td>
                    <td>
                      <span className={`badge ${item.status === "lulus" ? "lulus" : "aktif"}`}>
                        {item.status === "lulus" ? "Lulus" : "Aktif"}
                      </span>
                    </td>
                    <td className="aksi">
                      <button
                        onClick={() => navigate(`/admin/data/siswa/edit/${item.id}`)}
                        className="btn-warning"
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteClick(item)} className="btn-danger">
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "#aaa", padding: "30px" }}>
                      Tidak ada data siswa
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* FOOTER */}
          <div className="table-footer">
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={handleExport} className="btn-export">
                📋 Export
              </button>
              <label className="btn-export" style={{ cursor: "pointer" }}>
                {importLoading ? "Mengimpor..." : "📥 Import Excel"}
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleImport}
                  style={{ display: "none" }}
                />
              </label>
              <a href="/template_siswa.xlsx" download className="btn-export" style={{ textDecoration: "none" }}>
                📄 Template
              </a>
            </div>

            <div className="pagination">
              <button
                onClick={() => setOffset((prev) => Math.max(0, prev - perPage))}
                disabled={offset === 0}
                className="pagination-btn"
              >
                ‹ Prev
              </button>
              <span className="pagination-btn active">{currentPage}</span>
              <button
                onClick={() => setOffset((prev) => prev + perPage)}
                disabled={!hasMore}
                className="pagination-btn"
              >
                Next ›
              </button>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #e5e7eb", margin: "32px 0" }} />
        </div>
      </section>

      {/* MODAL HAPUS */}
      {deleteModal.open && (
        <div className="modal-overlay" onClick={handleDeleteCancel}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🗑️</div>
            <h2 className="modal-title">Hapus Siswa?</h2>
            <p className="modal-desc">
              Kamu akan menghapus data siswa <strong>{deleteModal.nama}</strong>.
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="modal-actions">
              <button onClick={handleDeleteCancel} className="btn-cancel">Batal</button>
              <button onClick={handleDeleteConfirm} className="btn-delete-confirm">Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
