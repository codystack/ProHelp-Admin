import { createSlice } from "@reduxjs/toolkit";

export const cmsSlice = createSlice({
  name: "cms",
  initialState: {
    faqs: [],
    banners: [],
  },
  reducers: {
    setBanners: (state, action) => {
      state.banners = action.payload;
    },
    setFAQs: (state, action) => {
      state.faqs = action.payload;
    },
  },
});

export const { setBanners, setFAQs } = cmsSlice.actions;

export default cmsSlice.reducer;
