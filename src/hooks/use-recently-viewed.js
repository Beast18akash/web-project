import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const RECENTLY_VIEWED_KEY = 'recentlyViewed'
const MAX_RECENT_ITEMS = 8

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState([])
  const allProducts = useSelector(state => state.products.products)

  useEffect(() => {
    const stored = localStorage.getItem(RECENTLY_VIEWED_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setRecentlyViewed(parsed)
      } catch (error) {
        console.error('Error parsing recently viewed products:', error)
        localStorage.removeItem(RECENTLY_VIEWED_KEY)
      }
    }
  }, [])

  const addToRecentlyViewed = (product) => {
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(p => p.id !== product.id)
      
      // Add to front of array
      const updated = [product, ...filtered]
      
      // Keep only MAX_RECENT_ITEMS
      const truncated = updated.slice(0, MAX_RECENT_ITEMS)
      
      // Save to localStorage
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(truncated))
      
      return truncated
    })
  }

  const getSimilarProducts = (product, limit = 4) => {
    if (!product) return []

    // Find products in same category
    const sameCategory = allProducts.filter(p => 
      p.id !== product.id && p.category === product.category
    )

    // Find products with similar price range (±20%)
    const priceRange = product.price * 0.2
    const similarPrice = allProducts.filter(p => 
      p.id !== product.id &&
      p.price >= product.price - priceRange &&
      p.price <= product.price + priceRange
    )

    // Combine and deduplicate
    const combined = [...sameCategory, ...similarPrice]
    const unique = Array.from(new Set(combined.map(p => p.id)))
      .map(id => combined.find(p => p.id === id))

    // Sort by rating and return limited amount
    return unique
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  const clearRecentlyViewed = () => {
    localStorage.removeItem(RECENTLY_VIEWED_KEY)
    setRecentlyViewed([])
  }

  return {
    recentlyViewed,
    addToRecentlyViewed,
    getSimilarProducts,
    clearRecentlyViewed
  }
}

export default useRecentlyViewed