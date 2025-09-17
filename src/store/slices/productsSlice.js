import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    priceRange: [0, 1000],
    brands: [],
    categories: [],
    ratings: [],
    search: '',
    sortBy: 'name',
  },
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    
    setError: (state, action) => {
      state.error = action.payload
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
    
    clearFilters: (state) => {
      state.filters = {
        priceRange: [0, 1000],
        brands: [],
        categories: [],
        ratings: [],
        search: '',
        sortBy: 'name',
      }
    },
  },
})

export const { 
  setProducts, 
  setCategories, 
  setLoading, 
  setError, 
  setFilters, 
  clearFilters 
} = productsSlice.actions
export default productsSlice.reducer


