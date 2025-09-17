import { useEffect } from 'react'
import HeroSection from '@/components/ui/HeroSection'
import SearchBar from '../components/ui/SearchBar'
import RecentlyViewed from '../components/ui/RecentlyViewed'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRight, Star, Truck, Shield, RotateCcw, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ProductCard from '@/components/ui/ProductCard'
import CategoryCard from '@/components/ui/CategoryCard'
import TestimonialsCarousel from '@/components/ui/TestimonialsCarousel'
import { setProducts, setCategories } from '@/store/slices/productsSlice'
import { mockProducts, featuredProducts, categories } from '@/data/mockData'

const Home = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(state => state.products)

  useEffect(() => {
    // Load products and categories
    dispatch(setProducts(mockProducts))
    dispatch(setCategories(categories))
  }, [dispatch])

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $50',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% secure payment processing',
    },
    {
      icon: RotateCcw,
      title: 'Easy Returns',
      description: '30-day hassle-free returns',
    },
    {
      icon: CreditCard,
      title: 'Multiple Payment',
      description: 'All major cards accepted',
    },
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'Tech Enthusiast',
      rating: 5,
      comment: 'Amazing quality products and lightning-fast delivery! The customer service is outstanding and the website is so easy to navigate. I\'ve been shopping here for months and never had a single issue.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Mike Chen',
      title: 'Business Owner',
      rating: 5,
      comment: 'Great customer service and incredibly easy returns process. The product quality exceeds my expectations every time. This is now my go-to store for all my business needs.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Emily Davis',
      title: 'Fashion Blogger',
      rating: 4,
      comment: 'Love the incredible variety of products available here. The fashion section is always up-to-date with the latest trends, and the quality is consistently excellent.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'David Rodriguez',
      title: 'Gaming Expert',
      rating: 5,
      comment: 'As a gaming enthusiast, I\'m always looking for the latest tech. This store never disappoints! Fast shipping, competitive prices, and authentic products.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    },
    {
      name: 'Lisa Wang',
      title: 'Home Decorator',
      rating: 5,
      comment: 'The home and lifestyle section is absolutely fantastic! I\'ve completely redecorated my living space with products from here. Beautiful, high-quality items at great prices.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face',
    },
  ]

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Search Bar removed to prevent duplicate on landing page */}
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of the best products, 
              carefully chosen for their quality and value.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Shop by Category
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Discover amazing products across our carefully curated categories
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {categories.slice(1).map((category, index) => (
              <CategoryCard 
                key={category} 
                category={{ name: category, count: Math.floor(Math.random() * 50) + 10 }} 
                index={index} 
              />
            ))}
          </div>

          {/* View All Categories Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/products">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  View All Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                What Our Customers Say
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Don't just take our word for it - hear from our satisfied customers
            </motion.p>
          </motion.div>

          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Recently Viewed Products Section */}
      <RecentlyViewed />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of satisfied customers and discover amazing products today.
            </p>
            <Link to="/products">
              <Button size="lg" variant="secondary">
                Start Shopping Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

