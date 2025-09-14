// Mock product data
export const mockProducts = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 99.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description: "Advanced fitness tracking with heart rate monitor, GPS, and water resistance.",
    rating: 4.7,
    reviews: 89,
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    description: "Comfortable organic cotton t-shirt in various colors and sizes.",
    rating: 4.3,
    reviews: 67,
    inStock: true,
    featured: false,
  },
  {
    id: 4,
    name: "Premium Coffee Beans",
    price: 24.99,
    category: "Food & Beverage",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop",
    description: "Single-origin coffee beans roasted to perfection for the ultimate coffee experience.",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    featured: true,
  },
  {
    id: 5,
    name: "Leather Backpack",
    price: 149.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    description: "Durable leather backpack with multiple compartments and laptop sleeve.",
    rating: 4.6,
    reviews: 94,
    inStock: true,
    featured: false,
  },
  {
    id: 6,
    name: "Wireless Charging Pad",
    price: 39.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    rating: 4.4,
    reviews: 73,
    inStock: true,
    featured: false,
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: 49.99,
    category: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop",
    description: "Non-slip yoga mat with excellent grip and cushioning for all yoga practices.",
    rating: 4.5,
    reviews: 112,
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    name: "Ceramic Dinner Set",
    price: 79.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop",
    description: "Beautiful ceramic dinner set for 4 people with modern design.",
    rating: 4.7,
    reviews: 45,
    inStock: true,
    featured: false,
  },
  {
    id: 9,
    name: "Bluetooth Speaker",
    price: 79.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    description: "Portable Bluetooth speaker with 360-degree sound and waterproof design.",
    rating: 4.6,
    reviews: 87,
    inStock: true,
    featured: true,
  },
  {
    id: 10,
    name: "Running Shoes",
    price: 129.99,
    category: "Sports & Fitness",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    description: "Lightweight running shoes with advanced cushioning and breathable material.",
    rating: 4.8,
    reviews: 203,
    inStock: true,
    featured: false,
  },
  {
    id: 11,
    name: "Essential Oil Diffuser",
    price: 34.99,
    category: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
    description: "Ultrasonic essential oil diffuser with LED lights and timer function.",
    rating: 4.4,
    reviews: 56,
    inStock: true,
    featured: false,
  },
  {
    id: 12,
    name: "Denim Jacket",
    price: 89.99,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=500&fit=crop",
    description: "Classic denim jacket with vintage wash and comfortable fit.",
    rating: 4.5,
    reviews: 78,
    inStock: true,
    featured: false,
  },
]

export const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Food & Beverage",
  "Accessories",
  "Sports & Fitness",
  "Home & Kitchen",
]

export const featuredProducts = mockProducts.filter(product => product.featured)

export const getProductById = (id) => {
  return mockProducts.find(product => product.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  if (category === "All") return mockProducts
  return mockProducts.filter(product => product.category === category)
}

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase()
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.category.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery)
  )
}

