// src/features/admin/components/AdminComponents.jsx

import apiGateway from '../../../config/axios';

// ── Normalize path gambar ─────────────────────────────────────────────────────
export function mediaUrl(filePath) {
  if (!filePath) return null;
  if (filePath.startsWith("http")) return filePath;
  
  const normalized = filePath.replace(/\\/g, "/");
  const base = apiGateway.defaults.baseURL.replace("/api", "");
  
  // ✅ If path starts with /uploads or contains /uploads → use direct route
  if (normalized.includes("/uploads")) {
    return `${base}${normalized.startsWith("/") ? "" : "/"}${normalized}`;
  }
  
  // Otherwise use /api/profile for other media (profile, fasilitas, mitra, etc)
  return `${base}/api/profile/${normalized.replace(/^\//, "")}`;
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
export function AdminStatCard({ icon, value, label, color = "blue" }) {
  return (
    <div className="smk-admin-stat-card">
      <div className={`smk-admin-stat-icon smk-admin-stat-${color}`}>{icon}</div>
      <div className="smk-admin-stat-info">
        <strong className="smk-admin-stat-val">{value ?? "—"}</strong>
        <span className="smk-admin-stat-lbl">{label}</span>
      </div>
    </div>
  );
}

// ── Data Card wrapper ─────────────────────────────────────────────────────────
export function AdminCard({ title, subtitle, onAdd, addLabel = "+ Tambah", children }) {
  return (
    <div className="smk-admin-card">
      <div className="smk-admin-card-header">
        <div>
          <div className="smk-admin-card-title">{title}</div>
          {subtitle && <div className="smk-admin-card-sub">{subtitle}</div>}
        </div>
        {onAdd && (
          <button className="smk-btn-primary smk-admin-btn-sm" onClick={onAdd}>
            {addLabel}
          </button>
        )}
      </div>
      <div className="smk-admin-card-body">{children}</div>
    </div>
  );
}

// ── Table ─────────────────────────────────────────────────────────────────────
export function AdminTable({ columns, children, loading, empty }) {
  return (
    <div className="smk-admin-table-wrap">
      <table className="smk-admin-table">
        <thead>
          <tr>
            {columns.map((c) => <th key={c}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="smk-admin-table-state">
                <span className="smk-admin-spinner" /> Memuat data...
              </td>
            </tr>
          ) : empty ? (
            <tr>
              <td colSpan={columns.length} className="smk-admin-table-state">
                📭 Belum ada data
              </td>
            </tr>
          ) : children}
        </tbody>
      </table>
    </div>
  );
}

// ── Thumbnail gambar ──────────────────────────────────────────────────────────
export function AdminThumb({ src, fallback = "🖼️" }) {
  if (!src) return <div className="smk-admin-thumb">{fallback}</div>;
  return (
    <div className="smk-admin-thumb">
      <img
        src={src}
        alt=""
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />
      <span style={{ display: "none" }}>{fallback}</span>
    </div>
  );
}

// ── Badge tingkat ─────────────────────────────────────────────────────────────
export function TingkatBadge({ tingkat }) {
  const map = {
    internasional: ["smk-admin-badge-gold",   "🌍 Internasional"],
    nasional:      ["smk-admin-badge-silver",  "🇮🇩 Nasional"],
    provinsi:      ["smk-admin-badge-bronze",  "📍 Provinsi"],
    kabupaten:     ["smk-admin-badge-blue",    "🏘 Kabupaten"],
  };
  const [cls, label] = map[tingkat?.toLowerCase()] ?? ["smk-admin-badge-blue", tingkat];
  return <span className={`smk-admin-badge ${cls}`}>{label}</span>;
}

// ── Upload area ───────────────────────────────────────────────────────────────
export function UploadArea({ id, onFile, preview, label = "Klik untuk pilih gambar" }) {
  return (
    <div className="smk-form-group">
      <label htmlFor={id} className="smk-upload-area">
        <div style={{ fontSize: 28, marginBottom: 8 }}>🖼️</div>
        <div>
          <span style={{ color: "var(--blue)", fontWeight: 600 }}>{label}</span>
          {" "}atau drag & drop
        </div>
        <div style={{ fontSize: 11, marginTop: 4, color: "var(--text-gray)" }}>
          PNG, JPG, WEBP — Maks 5MB
        </div>
        <input
          type="file"
          id={id}
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => onFile && onFile(e.target.files[0])}
        />
      </label>
      {preview && (
        <div className="smk-admin-upload-preview">
          <img src={preview} alt="preview" />
        </div>
      )}
    </div>
  );
}

// ── Modal wrapper ─────────────────────────────────────────────────────────────
// FIX: modal dibuat flex column dengan max-height agar tombol Simpan
//      selalu terlihat meski konten form panjang
export function AdminModal({ open, onClose, title, children, onSubmit, submitting }) {
  if (!open) return null;
  return (
    <div
      className="smk-modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
      }}
    >
      <div
        className="smk-modal smk-admin-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "white",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",       /* ← kunci: batasi tinggi modal */
          display: "flex",
          flexDirection: "column", /* ← susun header / body / footer vertikal */
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* HEADER — selalu di atas */}
        <div
          className="smk-modal-header"
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,         /* ← jangan ikut scroll */
          }}
        >
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{title}</h3>
          <button
            className="smk-modal-close"
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#6b7280",
            }}
          >
            ✕
          </button>
        </div>

        {/* BODY — bisa di-scroll jika konten panjang */}
        <div
          className="smk-modal-body"
          style={{
            padding: "20px 24px",
            overflowY: "auto",     /* ← scroll hanya di area ini */
            flex: 1,               /* ← ambil sisa ruang */
          }}
        >
          {children}
        </div>

        {/* FOOTER — selalu di bawah, tidak ikut scroll */}
        <div
          className="smk-modal-footer"
          style={{
            padding: "16px 24px",
            borderTop: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            flexShrink: 0,         /* ← jangan ikut scroll */
            background: "white",
            borderRadius: "0 0 12px 12px",
          }}
        >
          <button
            className="smk-btn-cancel"
            onClick={onClose}
            disabled={submitting}
            style={{
              padding: "10px 20px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              background: "white",
              cursor: submitting ? "not-allowed" : "pointer",
              fontWeight: 600,
            }}
          >
            Batal
          </button>
          <button
            className="smk-btn-primary"
            onClick={onSubmit}
            disabled={submitting}
            style={{
              padding: "10px 24px",
              background: submitting ? "#9ca3af" : "#0f2244",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: submitting ? "not-allowed" : "pointer",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {submitting ? (
              <><span className="smk-admin-spinner smk-admin-spinner-sm" /> Menyimpan...</>
            ) : "💾 Simpan"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Aksi button group ─────────────────────────────────────────────────────────
export function ActionButtons({ onEdit, onDelete }) {
  return (
    <div className="smk-admin-actions">
      <button className="smk-admin-btn-edit" onClick={onEdit}>✏️ Edit</button>
      <button className="smk-admin-btn-delete" onClick={onDelete}>🗑️ Hapus</button>
    </div>
  );
}
