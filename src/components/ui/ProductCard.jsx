import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Eye, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/store/slices/cartSlice'
import { toggleWishlist } from '@/store/slices/wishlistSlice'
import { useToast } from '@/hooks/use-toast'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { items: wishlistItems } = useSelector(state => state.wishlist)
  const [showQuickView, setShowQuickView] = useState(false)
  
  const isWishlisted = wishlistItems.some(item => item.id === product.id)

  // Generate random discount for demo
  const discount = Math.floor(Math.random() * 30) + 10 // 10-40% discount
  const originalPrice = product.price
  const discountedPrice = originalPrice * (1 - discount / 100)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: discountedPrice,
      image: product.image,
      quantity: 1
    }))
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const handleWishlistToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    dispatch(toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating
    }))
    
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
    })
  }

  const handleQuickView = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setShowQuickView(true)
    // In a real app, this would open a modal or navigate to product details
    setTimeout(() => setShowQuickView(false), 2000)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      )
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400/50 text-yellow-400" />
      )
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      )
    }

    return stars
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link to={`/products/${product.id}`}>
        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:border-primary/30 bg-white/80 backdrop-blur-sm">
          <div className="relative overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              whileHover={{ scale: 1.1 }}
            />
            
            {/* Discount Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg"
            >
              -{discount}% OFF
            </motion.div>
            
            {/* Wishlist Button */}
            <motion.button
              onClick={handleWishlistToggle}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart 
                className={`h-4 w-4 transition-colors ${
                  isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
                }`} 
              />
            </motion.button>

            {/* Quick View Button - Appears on Hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <motion.button
                onClick={handleQuickView}
                className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold flex items-center space-x-2 hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye className="h-4 w-4" />
                <span>Quick View</span>
              </motion.button>
            </motion.div>

            {/* Flash Sale Badge */}
            {product.featured && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="absolute bottom-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold flex items-center space-x-1"
              >
                <Zap className="h-3 w-3" />
                <span>Flash Sale</span>
              </motion.div>
            )}
            
            {/* Stock status */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-semibold bg-red-500 px-4 py-2 rounded-full">Out of Stock</span>
              </div>
            )}
          </div>

          <CardContent className="p-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.description}
              </p>
              
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
              
              {/* Price with discount */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(discountedPrice)}
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {formatCurrency(originalPrice)}
                  </span>
                </div>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {product.category}
                </span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </Link>

      {/* Quick View Success Message */}
      {showQuickView && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          className="absolute inset-0 bg-green-500/90 flex items-center justify-center rounded-lg z-10"
        >
          <div className="text-white text-center">
            <Eye className="h-8 w-8 mx-auto mb-2" />
            <p className="font-semibold">Quick View Activated!</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ProductCard

