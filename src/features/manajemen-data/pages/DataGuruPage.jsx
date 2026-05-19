import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  asyncGetGuru,
  asyncDeleteGuru,
} from "../states/action";
import manajemenApi from "../api/manajemenApi.js";
import { showSuccessDialog, showErrorDialog } from "../../../helpers/toolsHelper";
import AdminLayout from "../../admin/layouts/AdminLayout.jsx";
import "../resources/manajemen.css";

export default function DataGuruPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const guru    = useSelector((s) => s.guru)        ?? [];
  const hasMore = useSelector((s) => s.hasMoreGuru);

  const [search,        setSearch]        = useState("");
  const [filterMapel,   setFilterMapel]   = useState("");
  const [offset,        setOffset]        = useState(0);
  const [totalGuru,     setTotalGuru]     = useState(0);
  const [importLoading, setImportLoading] = useState(false);
  const [deleteModal,   setDeleteModal]   = useState({ open: false, id: null, nama: "" });

  const perPage     = 20;
  const currentPage = Math.floor(offset / perPage) + 1;

  // Fetch data saat offset berubah
  useEffect(() => {
    dispatch(asyncGetGuru(offset, perPage));
    manajemenApi.getTotalGuru()
      .then((data) => setTotalGuru(data?.data?.total ?? 0))
      .catch(() => setTotalGuru(0));
  }, [dispatch, offset]);

  // Reset ke halaman 1 saat filter berubah
  useEffect(() => {
    setOffset(0);
  }, [search, filterMapel]);

  // ── Handlers ──────────────────────────────────────────────────
  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImportLoading(true);
    try {
      const res = await manajemenApi.importGuru(file);
      const { imported, skipped } = res.data;
      showSuccessDialog(`Import berhasil! ${imported} data masuk, ${skipped} dilewati.`);
      dispatch(asyncGetGuru(offset, perPage));
    } catch (err) {
      showErrorDialog(err.message);
    } finally {
      setImportLoading(false);
      e.target.value = "";
    }
  };

  const handleExport = async () => {
    await manajemenApi.exportGuru();
  };

  const handleDeleteClick   = (item) => setDeleteModal({ open: true, id: item.id, nama: item.namaLengkap });
  const handleDeleteCancel  = ()     => setDeleteModal({ open: false, id: null, nama: "" });
  const handleDeleteConfirm = ()     => {
    dispatch(asyncDeleteGuru(deleteModal.id));
    setDeleteModal({ open: false, id: null, nama: "" });
  };

  // ── Filter lokal ──────────────────────────────────────────────
  const mapelList = [...new Set(guru.map((g) => g.mataPelajaran).filter(Boolean))];

  const filtered = guru.filter((item) => {
    const matchSearch = item.namaLengkap?.toLowerCase().includes(search.toLowerCase());
    const matchMapel  = filterMapel ? item.mataPelajaran === filterMapel : true;
    return matchSearch && matchMapel;
  });

  // ── Render ────────────────────────────────────────────────────
  return (
    <AdminLayout>
      <section className="smk-section smk-bg-cream">

        {/* HEADER */}
        <div className="smk-header-area">
          <h1 className="smk-section-title">
            Data Guru <span className="text-primary">SMKN 3 BALIGE</span>
          </h1>
          <div className="smk-stats-row">
            <div className="smk-stat-pill">
              <span className="smk-stat-pill-icon">👨‍🏫</span>
              <span className="smk-stat-pill-number">{totalGuru}</span>
            </div>
          </div>
        </div>

        {/* KONTEN */}
        <div className="smk-container">
          <div style={{ borderTop: "1px solid #e5e7eb", margin: "32px 0" }} />

          {/* ACTION BAR */}
          <div className="smk-action-bar">
            <button onClick={() => navigate("/admin/data/guru/add")} className="btn-primary">
              + Tambah Guru
            </button>
            <div className="smk-filters">
              <input
                type="text"
                placeholder="cari nama guru..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-search"
              />
              <select
                value={filterMapel}
                onChange={(e) => setFilterMapel(e.target.value)}
                className="input-select"
              >
                <option value="">Mata Pelajaran</option>
                {mapelList.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* TABLE */}
          <div className="table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>NIP</th>
                  <th>Nama</th>
                  <th>Mata Pelajaran</th>
                  <th>Jabatan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item, index) => (
                  <tr key={item.id}>
                    <td>{offset + index + 1}</td>
                    <td>{item.nip}</td>
                    <td className="nama">{item.namaLengkap}</td>
                    <td>{item.mataPelajaran}</td>
                    <td>{item.jabatan}</td>
                    <td className="aksi">
                      <button
                        onClick={() => navigate(`/admin/data/guru/edit/${item.id}`)}
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
                    <td colSpan={6} style={{ textAlign: "center", color: "#aaa", padding: "30px" }}>
                      Tidak ada data guru
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
              <a href="/template_guru.xlsx" download className="btn-export" style={{ textDecoration: "none" }}>
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
            <h2 className="modal-title">Hapus Guru?</h2>
            <p className="modal-desc">
              Kamu akan menghapus data guru <strong>{deleteModal.nama}</strong>.
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
