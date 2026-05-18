// src/features/admin/pages/AdminBeritaPage.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../layouts/AdminLayout";
import {
  AdminCard, AdminTable, AdminModal,
  AdminThumb, ActionButtons, UploadArea, mediaUrl,
} from "../components/AdminComponents";
import { showConfirmDialog, showErrorDialog } from "../../../helpers/toolsHelper";
import useInput from "../../../hooks/useInput";
import {
  asyncGetBerita,    asyncPostBerita,    asyncPutBerita,    asyncDeleteBerita,
  asyncGetAgenda,    asyncPostAgenda,    asyncPutAgenda,    asyncDeleteAgenda,
  asyncGetPengumuman, asyncPostPengumuman, asyncPutPengumuman, asyncDeletePengumuman,
} from "../../berita/states/action";

// ─────────────────────────────────────────────────────────────
// BERITA
// ─────────────────────────────────────────────────────────────
export function AdminBeritaPage() {
  const dispatch = useDispatch();
  const data     = useSelector((s) => s.berita   || []);
  const loading  = useSelector((s) => s.beritaLoading);

  const [modalOpen, setModalOpen]     = useState(false);
  const [editItem, setEditItem]       = useState(null);
  const [submitting, setSubmitting]   = useState(false);
  const [file, setFile]               = useState(null);
  const [preview, setPreview]         = useState(null);
  const [title, setTitle]             = useInput("");
  const [content, setContent]         = useInput("");
  const [description, setDescription] = useInput("");

  useEffect(() => { dispatch(asyncGetBerita()); }, [dispatch]);

  const resetForm = () => {
    setTitle({ target: { value: "" } });
    setContent({ target: { value: "" } });
    setDescription({ target: { value: "" } });
    setFile(null);
    setPreview(null);
  };

  const openAdd = () => {
    setEditItem(null);
    resetForm();
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setTitle({ target: { value: item.title ?? "" } });
    setContent({ target: { value: item.content ?? "" } });
    setDescription({ target: { value: item.description ?? "" } });
    setFile(null);
    // ✅ Fix: BE mengembalikan field "imageUrl", bukan "gambar"
    setPreview(item.imageUrl ? mediaUrl(item.imageUrl) : null);
    setModalOpen(true);
  };

  const handleFile = (f) => {
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const handleClose = () => {
    // Bersihkan blob URL agar tidak memory leak
    if (file && preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setModalOpen(false);
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    // ✅ Validasi FE — pesan error dalam Bahasa Indonesia
    if (!title.trim() || title.trim().length < 5) {
      showErrorDialog("Judul berita minimal 5 karakter");
      return;
    }
    if (content.trim() && content.trim().length < 10) {
      showErrorDialog("Isi berita minimal 10 karakter jika diisi");
      return;
    }

    setSubmitting(true);
    const cb = () => {
      if (file && preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
      setModalOpen(false);
      setSubmitting(false);
      setFile(null);
      setPreview(null);
    };
    if (editItem)
      dispatch(asyncPutBerita(editItem.id, title, content, description, file, cb));
    else
      dispatch(asyncPostBerita(title, content, description, file, cb));
    setTimeout(() => setSubmitting(false), 5000);
  };

  const handleDelete = async (item) => {
    const r = await showConfirmDialog(`Hapus berita "${item.title}"?`);
    if (r.isConfirmed) dispatch(asyncDeleteBerita(item.id));
  };

  return (
    <AdminLayout title="Berita">
      <AdminCard title="📰 Berita & Informasi" subtitle="Kelola data berita sekolah" onAdd={openAdd}>
        <AdminTable
          columns={["Gambar", "Judul", "Deskripsi", "Aksi"]}
          loading={loading}
          empty={!data.length}
        >
          {data.map((item) => (
            <tr key={item.id}>
              {/* ✅ Fix: pakai item.imageUrl sesuai response dari BE */}
              <td><AdminThumb src={mediaUrl(item.imageUrl)} fallback="📰" /></td>
              <td><strong>{item.title}</strong></td>
              <td className="smk-admin-td-truncate">{item.description?.slice(0, 80)}</td>
              <td>
                <ActionButtons
                  onEdit={() => openEdit(item)}
                  onDelete={() => handleDelete(item)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      <AdminModal
        open={modalOpen}
        onClose={handleClose}
        title={editItem ? "Edit Berita" : "Tambah Berita"}
        onSubmit={handleSubmit}
        submitting={submitting}
      >
        <div className="smk-form-group">
          <label>Judul Berita <span style={{ color: "red" }}>*</span></label>
          <input
            className="smk-form-input" type="text"
            value={title} onChange={setTitle}
            placeholder="contoh: Siswa SMK N3 Balige Raih Juara Nasional"
          />
        </div>
        <div className="smk-form-group">
          <label>Deskripsi Singkat</label>
          <input
            className="smk-form-input" type="text"
            value={description} onChange={setDescription}
            placeholder="Ringkasan singkat berita..."
          />
        </div>
        <div className="smk-form-group">
          <label>Isi Berita <span style={{ color: "red" }}>*</span></label>
          <textarea
            className="smk-form-input" rows={5}
            value={content} onChange={setContent}
            placeholder="Tulis isi berita lengkap di sini..."
          />
        </div>
        <UploadArea
          id="beritaGambar"
          onFile={handleFile}
          preview={preview}
          label="Pilih gambar berita (opsional)"
        />
      </AdminModal>
    </AdminLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// AGENDA
// ─────────────────────────────────────────────────────────────
export function AdminAgendaPage() {
  const dispatch = useDispatch();
  const data     = useSelector((s) => s.agenda   || []);
  const loading  = useSelector((s) => s.beritaLoading);

  const [modalOpen, setModalOpen]   = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle]           = useInput("");
  const [date, setDate]             = useInput("");
  const [location, setLocation]     = useInput("");

  useEffect(() => { dispatch(asyncGetAgenda()); }, [dispatch]);

  const openAdd = () => {
    setEditItem(null);
    setTitle({ target: { value: "" } });
    setDate({ target: { value: "" } });
    setLocation({ target: { value: "" } });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setTitle({ target: { value: item.title ?? "" } });
    setDate({ target: { value: (item.date || "").slice(0, 10) } });
    setLocation({ target: { value: item.location ?? "" } });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const cb = () => { setModalOpen(false); setSubmitting(false); };
    if (editItem) dispatch(asyncPutAgenda(editItem.id, title, date, location, cb));
    else          dispatch(asyncPostAgenda(title, date, location, cb));
    setTimeout(() => setSubmitting(false), 3000);
  };

  const handleDelete = async (item) => {
    const r = await showConfirmDialog(`Hapus agenda "${item.title}"?`);
    if (r.isConfirmed) dispatch(asyncDeleteAgenda(item.id));
  };

  return (
    <AdminLayout title="Agenda">
      <AdminCard title="📅 Agenda Sekolah" subtitle="Kelola jadwal kegiatan sekolah" onAdd={openAdd}>
        <AdminTable
          columns={["Judul", "Tanggal", "Lokasi", "Aksi"]}
          loading={loading}
          empty={!data.length}
        >
          {data.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.title}</strong></td>
              <td>{item.date}</td>
              <td>{item.location ?? "-"}</td>
              <td>
                <ActionButtons
                  onEdit={() => openEdit(item)}
                  onDelete={() => handleDelete(item)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Agenda" : "Tambah Agenda"}
        onSubmit={handleSubmit}
        submitting={submitting}
      >
        <div className="smk-form-group">
          <label>Judul Kegiatan <span style={{ color: "red" }}>*</span></label>
          <input
            className="smk-form-input" type="text"
            value={title} onChange={setTitle}
            placeholder="contoh: Upacara Hari Pendidikan Nasional"
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div className="smk-form-group">
            <label>Tanggal <span style={{ color: "red" }}>*</span></label>
            <input
              className="smk-form-input" type="date"
              value={date} onChange={setDate}
            />
          </div>
          <div className="smk-form-group">
            <label>Lokasi (opsional)</label>
            <input
              className="smk-form-input" type="text"
              value={location} onChange={setLocation}
              placeholder="contoh: Lapangan Sekolah"
            />
          </div>
        </div>
      </AdminModal>
    </AdminLayout>
  );
}

// ─────────────────────────────────────────────────────────────
// PENGUMUMAN
// ─────────────────────────────────────────────────────────────
export function AdminPengumumanPage() {
  const dispatch = useDispatch();
  const data     = useSelector((s) => s.pengumuman || []);
  const loading  = useSelector((s) => s.beritaLoading);

  const [modalOpen, setModalOpen]   = useState(false);
  const [editItem, setEditItem]     = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle]           = useInput("");
  const [content, setContent]       = useInput("");

  useEffect(() => { dispatch(asyncGetPengumuman()); }, [dispatch]);

  const openAdd = () => {
    setEditItem(null);
    setTitle({ target: { value: "" } });
    setContent({ target: { value: "" } });
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditItem(item);
    setTitle({ target: { value: item.title ?? "" } });
    setContent({ target: { value: item.content ?? "" } });
    setModalOpen(true);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    const cb = () => { setModalOpen(false); setSubmitting(false); };
    if (editItem) dispatch(asyncPutPengumuman(editItem.id, title, content, cb));
    else          dispatch(asyncPostPengumuman(title, content, cb));
    setTimeout(() => setSubmitting(false), 3000);
  };

  const handleDelete = async (item) => {
    const r = await showConfirmDialog(`Hapus pengumuman "${item.title}"?`);
    if (r.isConfirmed) dispatch(asyncDeletePengumuman(item.id));
  };

  return (
    <AdminLayout title="Pengumuman">
      <AdminCard title="📢 Pengumuman" subtitle="Kelola pengumuman sekolah" onAdd={openAdd}>
        <AdminTable
          columns={["Judul", "Isi", "Aksi"]}
          loading={loading}
          empty={!data.length}
        >
          {data.map((item) => (
            <tr key={item.id}>
              <td><strong>{item.title}</strong></td>
              <td className="smk-admin-td-truncate">{item.content?.slice(0, 80)}</td>
              <td>
                <ActionButtons
                  onEdit={() => openEdit(item)}
                  onDelete={() => handleDelete(item)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      </AdminCard>

      <AdminModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? "Edit Pengumuman" : "Tambah Pengumuman"}
        onSubmit={handleSubmit}
        submitting={submitting}
      >
        <div className="smk-form-group">
          <label>Judul Pengumuman <span style={{ color: "red" }}>*</span></label>
          <input
            className="smk-form-input" type="text"
            value={title} onChange={setTitle}
            placeholder="contoh: Libur Hari Raya Idul Fitri"
          />
        </div>
        <div className="smk-form-group">
          <label>Isi Pengumuman</label>
          <textarea
            className="smk-form-input" rows={5}
            value={content} onChange={setContent}
            placeholder="Tulis isi pengumuman lengkap di sini..."
          />
        </div>
      </AdminModal>
    </AdminLayout>
  );
}
