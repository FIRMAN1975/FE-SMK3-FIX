import { useState, useEffect, useRef } from 'react';

/**
 * ActionMenu — titik tiga (⋮) dengan dropdown Edit & Hapus.
 */
function ActionMenu({ canEdit, onView, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '20px', color: '#6b7280', padding: '4px 8px',
          borderRadius: '6px', lineHeight: 1, transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f3f4f6')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
      >
        ⋮
      </button>

      {open && (
        <div style={{
          position: 'absolute', right: 0, top: '110%',
          backgroundColor: 'white', border: '1px solid #e5e7eb',
          borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          zIndex: 50, minWidth: '150px', overflow: 'hidden',
        }}>
          <MenuItem icon="👁" label="Lihat Detail" color="#374151" hoverBg="#f9fafb"
            onClick={() => { onView(); setOpen(false); }} />

          {canEdit ? (
            <>
              <MenuItem icon="✏️" label="Edit Karya" color="#374151" hoverBg="#f9fafb"
                onClick={() => { onEdit(); setOpen(false); }} />
              <div style={{ height: '1px', backgroundColor: '#f3f4f6', margin: '2px 0' }} />
              <MenuItem icon="🗑️" label="Hapus" color="#dc2626" hoverBg="#fef2f2"
                onClick={() => { onDelete(); setOpen(false); }} />
            </>
          ) : (
            <div style={{
              padding: '10px 16px', fontSize: '12px', color: '#9ca3af',
              display: 'flex', alignItems: 'center', gap: '6px',
              borderTop: '1px solid #f3f4f6',
            }}>
              🔒 Bukan karya kamu
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function MenuItem({ icon, label, color, hoverBg, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 16px', cursor: 'pointer', fontSize: '13px', color,
        display: 'flex', alignItems: 'center', gap: '8px',
        backgroundColor: hovered ? hoverBg : 'transparent', transition: 'background 0.1s',
      }}
    >
      <span style={{ fontSize: '14px' }}>{icon}</span>
      {label}
    </div>
  );
}

export default ActionMenu;