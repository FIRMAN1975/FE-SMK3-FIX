// src/store.js
import { configureStore } from "@reduxjs/toolkit";

// ── Profil reducers ───────────────────────────────────────────────────────────
import {
  sejarahIdentitasReducer,
  visiMisiReducer,
  strukturOrganisasiReducer,
  fasilitasReducer,
  prestasiReducer,
  programKeahlianReducer,
  mitraKerjasamaReducer,
  profilLoadingReducer,
} from "./features/profil/states/reducer";
import { portofolioReducer } from "./features/portofolio/states/reducer";

// ── Berita reducers ───────────────────────────────────────────────────────────
import {
  beritaReducer,
  agendaReducer,
  pengumumanReducer,
  beritaLoadingReducer,
} from "./features/berita/states/reducer";

const store = configureStore({
  reducer: {
    // Profil
    sejarahIdentitas:   sejarahIdentitasReducer,
    visiMisi:           visiMisiReducer,
    strukturOrganisasi: strukturOrganisasiReducer,
    fasilitas: fasilitasReducer,
    prestasi: prestasiReducer,
    programKeahlian: programKeahlianReducer,
    mitraKerjasama: mitraKerjasamaReducer,
    profilLoading: profilLoadingReducer,
    portofolio: portofolioReducer,

    // Berita
    berita:             beritaReducer,
    agenda:             agendaReducer,
    pengumuman:         pengumumanReducer,
    beritaLoading:      beritaLoadingReducer,
  },
});

export default store;