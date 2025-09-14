import { motion } from 'framer-motion'

const LoadingSkeleton = ({ type = 'product' }) => {
  const shimmer = {
    initial: { x: '-100%' },
    animate: { x: '100%' },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear'
    }
  }

  if (type === 'product') {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
        {/* Image skeleton */}
        <div className="relative h-48 bg-slate-200 dark:bg-slate-700 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            {...shimmer}
          />
        </div>
        
        {/* Content skeleton */}
        <div className="p-4 space-y-3">
          {/* Title skeleton */}
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
              />
            </div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
              />
            </div>
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-1">
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
              />
            </div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
              />
            </div>
          </div>
          
          {/* Rating skeleton */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 w-3 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  {...shimmer}
                />
              </div>
            ))}
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-12 ml-2 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
              />
            </div>
          </div>
          
          {/* Price skeleton */}
          <div className="flex items-center justify-between">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
              />
            </div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
              />
            </div>
          </div>
          
          {/* Button skeleton */}
          <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              {...shimmer}
            />
          </div>
        </div>
      </div>
    )
  }

  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-white dark:bg-slate-800 rounded-lg">
            <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
              />
            </div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  {...shimmer}
                />
              </div>
              <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  {...shimmer}
                />
              </div>
            </div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-16 relative overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                {...shimmer}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'text') {
    return (
      <div className="space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 dark:bg-slate-700 rounded relative overflow-hidden" style={{ width: `${Math.random() * 40 + 60}%` }}>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              {...shimmer}
            />
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default LoadingSkeleton
