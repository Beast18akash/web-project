import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal, 
  ChevronDown,
  Star,
  DollarSign,
  Tag
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const AdvancedFilters = ({ onFiltersChange, categories = [] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    priceRange: [0, 1000],
    rating: '',
    sortBy: 'name',
    sortOrder: 'asc',
    inStock: false,
    featured: false
  })

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handlePriceRangeChange = (index, value) => {
    const newPriceRange = [...filters.priceRange]
    newPriceRange[index] = parseInt(value)
    handleFilterChange('priceRange', newPriceRange)
  }

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      category: '',
      priceRange: [0, 1000],
      rating: '',
      sortBy: 'name',
      sortOrder: 'asc',
      inStock: false,
      featured: false
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => {
    if (Array.isArray(value)) return value[0] !== 0 || value[1] !== 1000
    if (typeof value === 'boolean') return value
    return value !== '' && value !== 'name' && value !== 'asc'
  })

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="pl-10 pr-4 py-3 text-lg border-2 border-slate-200 dark:border-slate-700 focus:border-primary transition-colors"
        />
        {filters.search && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleFilterChange('search', '')}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filters</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearFilters}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Advanced Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Tag className="h-4 w-4" />
                    <span>Category</span>
                  </label>
                  <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span>Price Range</span>
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-500">Min Price</label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={filters.priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Max Price</label>
                      <Input
                        type="number"
                        placeholder="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center space-x-2">
                    <Star className="h-4 w-4" />
                    <span>Minimum Rating</span>
                  </label>
                  <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="2">2+ Stars</SelectItem>
                      <SelectItem value="1">1+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange('sortBy', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="price">Price</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="reviews">Reviews</SelectItem>
                        <SelectItem value="date">Date Added</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Order</label>
                    <Select value={filters.sortOrder} onValueChange={(value) => handleFilterChange('sortOrder', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asc">Ascending</SelectItem>
                        <SelectItem value="desc">Descending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quick Filters</label>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={filters.inStock ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFilterChange('inStock', !filters.inStock)}
                    >
                      In Stock Only
                    </Button>
                    <Button
                      variant={filters.featured ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleFilterChange('featured', !filters.featured)}
                    >
                      Featured Products
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Active Filters:</span>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear All
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                Search: "{filters.search}"
              </span>
            )}
            {filters.category && (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-xs rounded-full">
                Category: {filters.category}
              </span>
            )}
            {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) && (
              <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300 text-xs rounded-full">
                Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            )}
            {filters.rating && (
              <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300 text-xs rounded-full">
                Rating: {filters.rating}+ stars
              </span>
            )}
            {filters.inStock && (
              <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300 text-xs rounded-full">
                In Stock Only
              </span>
            )}
            {filters.featured && (
              <span className="px-2 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300 text-xs rounded-full">
                Featured
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default AdvancedFilters
