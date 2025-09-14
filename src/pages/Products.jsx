import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Filter, Grid, List, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import ProductCard from '@/components/ui/ProductCard'
import AdvancedFilters from '@/components/ui/AdvancedFilters'
import LoadingSkeleton from '@/components/ui/LoadingSkeleton'
import { setProducts, setCategories, setFilters } from '@/store/slices/productsSlice'
import { mockProducts, categories } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

const Products = () => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  
  const { products, categories: storeCategories, filters } = useSelector(state => state.products)

  useEffect(() => {
    // Load products and categories
    dispatch(setProducts(mockProducts))
    dispatch(setCategories(categories))
    
    // Set filters from URL params
    const category = searchParams.get('category') || ''
    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'name'
    
    dispatch(setFilters({ category, search, sortBy }))
  }, [dispatch, searchParams])

  // Filter and sort products
  const filteredProducts = products.filter(product => {
    const matchesCategory = !filters.category || product.category === filters.category
    const matchesSearch = !filters.search || 
      product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.search.toLowerCase())
    const matchesPrice = product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    
    return matchesCategory && matchesSearch && matchesPrice
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'rating':
        return b.rating - a.rating
      case 'name':
      default:
        return a.name.localeCompare(b.name)
    }
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    dispatch(setFilters(newFilters))
    
    // Update URL params
    const newSearchParams = new URLSearchParams(searchParams)
    if (value) {
      newSearchParams.set(key, value)
    } else {
      newSearchParams.delete(key)
    }
    setSearchParams(newSearchParams)
  }

  const handleFiltersChange = (newFilters) => {
    dispatch(setFilters(newFilters))
  }

  const handlePriceRangeChange = (value) => {
    const newFilters = { ...filters, priceRange: value }
    dispatch(setFilters(newFilters))
  }

  const clearFilters = () => {
    dispatch(setFilters({
      category: '',
      priceRange: [0, 1000],
      search: '',
      sortBy: 'name',
    }))
    setSearchParams({})
  }

  const getSortLabel = (sortBy) => {
    switch (sortBy) {
      case 'price-low': return 'Price: Low to High'
      case 'price-high': return 'Price: High to Low'
      case 'rating': return 'Highest Rated'
      case 'name': return 'Name: A to Z'
      default: return 'Sort by'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Products</h1>
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Advanced Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-80"
          >
            <AdvancedFilters 
              onFiltersChange={handleFiltersChange}
              categories={storeCategories.slice(1)}
            />
          </motion.div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            >
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                
                <Select
                  value={filters.sortBy}
                  onValueChange={(value) => handleFilterChange('sortBy', value)}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {getSortLabel(filters.sortBy)}
                </span>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products

