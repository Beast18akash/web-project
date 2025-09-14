import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  isOpen: false
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (!existingItem) {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
          addedAt: new Date().toISOString()
        })
      }
    },
    
    removeFromWishlist: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.id !== productId)
    },
    
    toggleWishlist: (state, action) => {
      const product = action.payload
      const existingItem = state.items.find(item => item.id === product.id)
      
      if (existingItem) {
        state.items = state.items.filter(item => item.id !== product.id)
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          rating: product.rating,
          addedAt: new Date().toISOString()
        })
      }
    },
    
    clearWishlist: (state) => {
      state.items = []
    },
    
    toggleWishlistDrawer: (state) => {
      state.isOpen = !state.isOpen
    },
    
    setWishlistDrawer: (state, action) => {
      state.isOpen = action.payload
    }
  }
})

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
  toggleWishlistDrawer,
  setWishlistDrawer
} = wishlistSlice.actions

export default wishlistSlice.reducer
