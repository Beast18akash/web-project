import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Home, Search, ShoppingBag, User, Menu } from 'lucide-react'

const MobileNav = () => {
  const { itemCount } = useSelector(state => state.cart)
  const { isAuthenticated } = useSelector(state => state.auth)

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50"
    >
      <div className="flex items-center justify-around h-16">
        <Link to="/" className="flex flex-col items-center gap-1">
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link to="/products" className="flex flex-col items-center gap-1">
          <Search className="h-5 w-5" />
          <span className="text-xs">Search</span>
        </Link>
        
        <Link to="/cart" className="flex flex-col items-center gap-1 relative">
          <ShoppingBag className="h-5 w-5" />
          <span className="text-xs">Cart</span>
          {itemCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-4 h-4 flex items-center justify-center rounded-full"
            >
              {itemCount}
            </motion.span>
          )}
        </Link>
        
        <Link to={isAuthenticated ? "/profile" : "/login"} className="flex flex-col items-center gap-1">
          <User className="h-5 w-5" />
          <span className="text-xs">{isAuthenticated ? 'Profile' : 'Login'}</span>
        </Link>
        
        <button className="flex flex-col items-center gap-1 lg:hidden" onClick={() => {}}>
          <Menu className="h-5 w-5" />
          <span className="text-xs">Menu</span>
        </button>
      </div>
    </motion.nav>
  )
}

export default MobileNav