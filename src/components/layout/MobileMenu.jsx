import { motion, AnimatePresence } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { X, ChevronRight, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logout } from '@/store/slices/authSlice'

const MobileMenu = ({ isOpen, onClose }) => {
  const dispatch = useDispatch()
  const { isAuthenticated, user } = useSelector(state => state.auth)
  const { isPremium } = useSelector(state => state.membership)

  const handleLogout = () => {
    dispatch(logout())
    onClose()
  }

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Cart', path: '/cart' },
    ...(isAuthenticated ? [
      { label: 'Profile', path: '/profile' },
      { label: 'Orders', path: '/orders' },
      { label: 'Wishlist', path: '/wishlist' }
    ] : [
      { label: 'Login', path: '/login' },
      { label: 'Sign Up', path: '/signup' }
    ]),
    { label: 'Premium', path: '/premium', highlight: !isPremium }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-0 right-0 h-full w-80 bg-background z-50 shadow-xl overflow-y-auto"
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User Info */}
            {isAuthenticated && (
              <div className="p-4 border-b">
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
                {isPremium && (
                  <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Premium Member
                  </span>
                )}
              </div>
            )}

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center justify-between px-4 py-3 hover:bg-muted transition-colors ${
                    item.highlight ? 'text-primary font-medium' : ''
                  }`}
                >
                  {item.label}
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
              
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-destructive hover:bg-muted transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu