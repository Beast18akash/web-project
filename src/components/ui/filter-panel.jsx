import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Filter, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from './button'
import { Card } from './card'
import { PriceRangeSlider } from './price-range-slider'
import { FilterCheckbox } from './filter-checkbox'
import { setFilters } from '@/store/slices/productsSlice'
import { formatCurrency } from '@/lib/utils'

const FilterPanel = () => {
  const dispatch = useDispatch()
  const { filters, products } = useSelector(state => state.products)
  
  // Calculate min and max prices from products
  const prices = products.map(p => p.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)

  // Local state for filter values
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])
  const [selectedBrands, setSelectedBrands] = useState(filters.brands || [])
  const [selectedCategories, setSelectedCategories] = useState(filters.categories || [])
  const [selectedRatings, setSelectedRatings] = useState(filters.ratings || [])
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    categories: true,
    ratings: true
  })

  // Extract unique values from products
  const brands = [...new Set(products.map(p => p.brand))]
  const categories = [...new Set(products.map(p => p.category))]
  const ratings = [5, 4, 3, 2, 1]

  // Apply filters when values change
  useEffect(() => {
    dispatch(setFilters({
      priceRange,
      brands: selectedBrands,
      categories: selectedCategories,
      ratings: selectedRatings
    }))
  }, [priceRange, selectedBrands, selectedCategories, selectedRatings, dispatch])

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const clearFilters = () => {
    setPriceRange([minPrice, maxPrice])
    setSelectedBrands([])
    setSelectedCategories([])
    setSelectedRatings([])
  }

  return (
    <Card className="p-4 sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          <h2 className="font-semibold">Filters</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={clearFilters}>
          Clear All
        </Button>
      </div>

      <div className="space-y-4">
        {/* Price Range */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-2"
          >
            <span className="font-medium">Price Range</span>
            {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.price && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <PriceRangeSlider
                min={minPrice}
                max={maxPrice}
                value={priceRange}
                onValueChange={setPriceRange}
                step={(maxPrice - minPrice) / 100}
              />
              <div className="flex items-center justify-between text-sm">
                <span>{formatCurrency(priceRange[0])}</span>
                <span>{formatCurrency(priceRange[1])}</span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Brands */}
        <div>
          <button
            onClick={() => toggleSection('brands')}
            className="flex items-center justify-between w-full mb-2"
          >
            <span className="font-medium">Brands</span>
            {expandedSections.brands ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.brands && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {brands.map(brand => (
                <FilterCheckbox
                  key={brand}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={(checked) => {
                    setSelectedBrands(prev =>
                      checked
                        ? [...prev, brand]
                        : prev.filter(b => b !== brand)
                    )
                  }}
                  label={brand}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Categories */}
        <div>
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full mb-2"
          >
            <span className="font-medium">Categories</span>
            {expandedSections.categories ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.categories && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {categories.map(category => (
                <FilterCheckbox
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => {
                    setSelectedCategories(prev =>
                      checked
                        ? [...prev, category]
                        : prev.filter(c => c !== category)
                    )
                  }}
                  label={category}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Ratings */}
        <div>
          <button
            onClick={() => toggleSection('ratings')}
            className="flex items-center justify-between w-full mb-2"
          >
            <span className="font-medium">Ratings</span>
            {expandedSections.ratings ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          
          {expandedSections.ratings && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {ratings.map(rating => (
                <FilterCheckbox
                  key={rating}
                  checked={selectedRatings.includes(rating)}
                  onCheckedChange={(checked) => {
                    setSelectedRatings(prev =>
                      checked
                        ? [...prev, rating]
                        : prev.filter(r => r !== rating)
                    )
                  }}
                  label={`${rating} Stars & Above`}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default FilterPanel