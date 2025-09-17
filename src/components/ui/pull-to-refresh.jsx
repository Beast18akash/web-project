import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

const PullToRefresh = ({ onRefresh, children }) => {
  const [startY, setStartY] = useState(null)
  const [pulling, setPulling] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const pullThreshold = 80 // pixels to pull before refresh triggers

  useEffect(() => {
    if (!refreshing) return
    
    const refresh = async () => {
      if (onRefresh) {
        await onRefresh()
      }
      setRefreshing(false)
    }
    
    refresh()
  }, [refreshing, onRefresh])

  const handleTouchStart = (e) => {
    // Only enable pull to refresh when at top of page
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY)
      setPulling(true)
    }
  }

  const handleTouchMove = (e) => {
    if (!pulling || !startY) return

    const currentY = e.touches[0].clientY
    const pullDistance = currentY - startY

    if (pullDistance > 0) {
      // Prevent default scrolling behavior
      e.preventDefault()
      
      // Apply resistance to the pull
      const resistance = 0.4
      const progress = (pullDistance * resistance) / pullThreshold

      document.documentElement.style.setProperty('--pull-progress', Math.min(progress, 1))
    }
  }

  const handleTouchEnd = () => {
    if (!pulling || !startY) return

    const pullDistance = Number(getComputedStyle(document.documentElement)
      .getPropertyValue('--pull-progress')) * pullThreshold

    if (pullDistance >= pullThreshold) {
      setRefreshing(true)
    }

    // Reset pull state
    setStartY(null)
    setPulling(false)
    document.documentElement.style.setProperty('--pull-progress', 0)
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      <AnimatePresence>
        {(pulling || refreshing) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 flex justify-center py-4 pointer-events-none"
          >
            <motion.div
              animate={{ rotate: refreshing ? 360 : 0 }}
              transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
            >
              <RefreshCw className="h-6 w-6 text-primary" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {children}
    </div>
  )
}

export default PullToRefresh