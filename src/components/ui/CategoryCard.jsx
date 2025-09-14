import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Smartphone, 
  Laptop, 
  Headphones, 
  Camera, 
  Watch, 
  Gamepad2, 
  Home, 
  Shirt,
  Car,
  BookOpen,
  Dumbbell,
  Palette
} from 'lucide-react'

const CategoryCard = ({ category, index }) => {
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'Electronics': Smartphone,
      'Computers': Laptop,
      'Audio': Headphones,
      'Photography': Camera,
      'Wearables': Watch,
      'Gaming': Gamepad2,
      'Home': Home,
      'Fashion': Shirt,
      'Automotive': Car,
      'Books': BookOpen,
      'Sports': Dumbbell,
      'Art': Palette
    }
    return iconMap[categoryName] || Smartphone
  }

  const getCategoryColor = (categoryName) => {
    const colorMap = {
      'Electronics': 'from-blue-500 to-cyan-500',
      'Computers': 'from-purple-500 to-pink-500',
      'Audio': 'from-green-500 to-emerald-500',
      'Photography': 'from-orange-500 to-red-500',
      'Wearables': 'from-indigo-500 to-purple-500',
      'Gaming': 'from-red-500 to-pink-500',
      'Home': 'from-yellow-500 to-orange-500',
      'Fashion': 'from-pink-500 to-rose-500',
      'Automotive': 'from-gray-500 to-slate-500',
      'Books': 'from-amber-500 to-yellow-500',
      'Sports': 'from-lime-500 to-green-500',
      'Art': 'from-violet-500 to-purple-500'
    }
    return colorMap[categoryName] || 'from-blue-500 to-cyan-500'
  }

  const IconComponent = getCategoryIcon(category.name)
  const gradientClass = getCategoryColor(category.name)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.05 }}
      className="group"
    >
      <Link to={`/products?category=${category.name.toLowerCase()}`}>
        <div className="relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group-hover:border-transparent overflow-hidden">
          {/* Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          
          {/* Icon Container */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            {/* Icon with animated background */}
            <motion.div
              className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IconComponent className="h-8 w-8 text-white" />
              
              {/* Animated ring */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-30`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Category Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-900 group-hover:to-slate-700 dark:group-hover:from-white dark:group-hover:to-slate-300 transition-all duration-300">
                {category.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {category.count} products
              </p>
            </div>

            {/* Hover indicator */}
            <motion.div
              className="w-8 h-1 bg-gradient-to-r from-transparent via-slate-400 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Decorative elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
    </motion.div>
  )
}

export default CategoryCard
