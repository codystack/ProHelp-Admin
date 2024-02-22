import { createSlice } from '@reduxjs/toolkit'

export const legalSlice = createSlice({
  name: 'legal',
  initialState: {
    policy: '',
    terms: '',
    legal: {},
  },
  reducers: {
    setPolicy: (state, action) => {
      state.policy = action.payload
    },
    setTerms: (state, action) => {
      state.terms = action.payload
    },
    setLegal: (state, action) => {
      state.legal = action.payload
    }
  }
})

export const { setPolicy, setTerms, setLegal } = legalSlice.actions

export default legalSlice.reducer
