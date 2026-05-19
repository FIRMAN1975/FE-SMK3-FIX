import { configureStore } from "@reduxjs/toolkit";
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

// ✅ Tambahkan ini
import {
  siswaReducer,
  guruReducer,
  statsSiswaReducer,
  manajemenLoadingReducer,
  hasMoreSiswaReducer, // ✅ tambah
  hasMoreGuruReducer,  // ✅ tambah
} from "./features/manajemen-data/states/reducer";

const store = configureStore({
  reducer: {
    // Profil
    sejarahIdentitas: sejarahIdentitasReducer,
    visiMisi: visiMisiReducer,
    strukturOrganisasi: strukturOrganisasiReducer,
    fasilitas: fasilitasReducer,
    prestasi: prestasiReducer,
    programKeahlian: programKeahlianReducer,
    mitraKerjasama: mitraKerjasamaReducer,
    profilLoading: profilLoadingReducer,

    // ✅ Manajemen
    siswa: siswaReducer,
    guru: guruReducer,
    statsSiswa: statsSiswaReducer,
    manajemenLoading: manajemenLoadingReducer,

    hasMoreSiswa: hasMoreSiswaReducer,
    hasMoreGuru:  hasMoreGuruReducer,
  },
});

export default store;