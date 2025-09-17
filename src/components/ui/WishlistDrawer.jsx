import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Heart, X, ShoppingCart, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addToCart } from '@/store/slices/cartSlice'
import { removeFromWishlist } from '@/store/slices/wishlistSlice'
import { formatCurrency } from '@/lib/utils'
import { useToast } from '@/hooks/use-toast'

const WishlistDrawer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useSelector(state => state.wishlist)
  const dispatch = useDispatch()
  const { toast } = useToast()

  const handleAddToCart = (item) => {
    dispatch(addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1
    }))
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleRemoveFromWishlist = (itemId) => {
    dispatch(removeFromWishlist(itemId))
    
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist.",
    })
  }

  const handleViewProduct = (itemId) => {
    // Navigate to product details
    window.location.href = `/products/${itemId}`
  }

  return (
    <>
      {/* Wishlist Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-slate-600 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Heart className="h-6 w-6" />
        {items.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
          >
            {items.length > 99 ? '99+' : items.length}
          </motion.span>
        )}
      </motion.button>

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-96 max-w-[90vw] bg-white dark:bg-slate-900 shadow-2xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center space-x-2">
                  <Heart className="h-6 w-6 text-red-500" />
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    Wishlist ({items.length})
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Wishlist Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <Heart className="h-16 w-16 text-slate-300 dark:text-slate-600 mb-4" />
                    <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Your wishlist is empty
                    </h3>
                    <p className="text-slate-500 dark:text-slate-500">
                      Add some products to your wishlist
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                      >
                        {/* Product Image */}
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 dark:text-white truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {item.category}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            {formatCurrency(item.price)}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-2">
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(item)}
                            className="bg-primary hover:bg-primary/90 text-white"
                          >
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            Add to Cart
                          </Button>
                          <div className="flex space-x-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewProduct(item.id)}
                              className="flex-1"
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveFromWishlist(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-slate-200 dark:border-slate-700 p-6">
                  <Button
                    className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold py-3"
                    onClick={() => {
                      setIsOpen(false)
                      // Navigate to products page
                      window.location.href = '/products'
                    }}
                  >
                    Continue Shopping
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default WishlistDrawer

