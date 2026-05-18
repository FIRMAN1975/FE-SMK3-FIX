// src/features/berita/api/beritaApi.js
import apiGateway from '../../../config/axios';

const PREFIX_BERITA     = '/berita';
const PREFIX_AGENDA     = '/agenda';      // ← endpoint terpisah
const PREFIX_PENGUMUMAN = '/pengumuman';  // ← endpoint terpisah

// ── Helper: extract array ─────────────────────────────────────────────────────
function extractArray(raw) {
  if (Array.isArray(raw)) return raw;
  if (raw && Array.isArray(raw.data)) return raw.data;
  return [];
}

// ── Helper: generate slug ─────────────────────────────────────────────────────
function generateSlug(title) {
  return (
    title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '-') +
    '-' + Date.now()
  );
}

// ── BERITA ────────────────────────────────────────────────────────────────────
async function getBerita() {
  const res = await apiGateway.get(`${PREFIX_BERITA}?page=1&limit=200`);
  return extractArray(res.data);
}
async function getBeritaById(id) {
  const res = await apiGateway.get(`${PREFIX_BERITA}/${id}`);
  return res.data;
}
async function postBerita(title, content, description, imageFile) {
  const fd = new FormData();
  fd.append('title', title);
  fd.append('content', content || '');
  fd.append('description', description || '');
  fd.append('slug', generateSlug(title));
  fd.append('author', 'Admin');
  if (imageFile) fd.append('gambar', imageFile);
  const res = await apiGateway.post(PREFIX_BERITA, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}
async function putBerita(id, title, content, description, imageFile) {
  const fd = new FormData();
  if (title)       fd.append('title', title);
  if (content)     fd.append('content', content);
  if (description) fd.append('description', description);
  if (imageFile)   fd.append('gambar', imageFile);
  const res = await apiGateway.put(`${PREFIX_BERITA}/${id}`, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
}
async function deleteBerita(id) {
  const res = await apiGateway.delete(`${PREFIX_BERITA}/${id}`);
  return res.data;
}

// ── AGENDA ────────────────────────────────────────────────────────────────────
async function getAgenda() {
  const res = await apiGateway.get(PREFIX_AGENDA);
  return extractArray(res.data);
}
async function postAgenda(title, date, location) {
  const body = { title, date };
  if (location) body.location = location;
  const res = await apiGateway.post(PREFIX_AGENDA, body);
  return res.data;
}
async function putAgenda(id, title, date, location) {
  const body = { title, date };
  if (location) body.location = location;
  const res = await apiGateway.put(`${PREFIX_AGENDA}/${id}`, body);
  return res.data;
}
async function deleteAgenda(id) {
  const res = await apiGateway.delete(`${PREFIX_AGENDA}/${id}`);
  return res.data;
}

// ── PENGUMUMAN ────────────────────────────────────────────────────────────────
async function getPengumuman() {
  const res = await apiGateway.get(PREFIX_PENGUMUMAN);
  return extractArray(res.data);
}
async function postPengumuman(title, content) {
  const res = await apiGateway.post(PREFIX_PENGUMUMAN, { title, content: content || '' });
  return res.data;
}
async function putPengumuman(id, title, content) {
  const res = await apiGateway.put(`${PREFIX_PENGUMUMAN}/${id}`, { title, content: content || '' });
  return res.data;
}
async function deletePengumuman(id) {
  const res = await apiGateway.delete(`${PREFIX_PENGUMUMAN}/${id}`);
  return res.data;
}

// ── Export ────────────────────────────────────────────────────────────────────
const beritaApi = {
  getBerita, getBeritaById, postBerita, putBerita, deleteBerita,
  getAgenda, postAgenda, putAgenda, deleteAgenda,
  getPengumuman, postPengumuman, putPengumuman, deletePengumuman,
};

export default beritaApi;