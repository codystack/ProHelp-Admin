import { createSlice } from "@reduxjs/toolkit";

export const cmsSlice = createSlice({
  name: "cms",
  initialState: {
    faqs: [],
    banners: [],
    sections: [],
  },
  reducers: {
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
    setFAQs: (state, action) => {
      state.faqs = action.payload;
    },
    setSections: (state, action) => {
      state.sections = action.payload;
    },
  },
});

export const { setBanners, setFAQs, setSections } = cmsSlice.actions;

export default cmsSlice.reducer;
