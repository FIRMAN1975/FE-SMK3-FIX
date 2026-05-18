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
import { portofolioReducer } from "./features/portofolio/states/reducer";

const store = configureStore({
  reducer: {
    sejarahIdentitas: sejarahIdentitasReducer,
    visiMisi: visiMisiReducer,
    strukturOrganisasi: strukturOrganisasiReducer,
    fasilitas: fasilitasReducer,
    prestasi: prestasiReducer,
    programKeahlian: programKeahlianReducer,
    mitraKerjasama: mitraKerjasamaReducer,
    profilLoading: profilLoadingReducer,
    portofolio: portofolioReducer,
  },
});

export default store;
