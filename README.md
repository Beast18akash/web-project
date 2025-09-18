# React E-commerce Store

A modern, responsive e-commerce web app built with React, Vite, Tailwind CSS, Redux Toolkit, and shadcn/ui + Radix primitives.

## Features

- Home page with hero, featured products, categories, testimonials
- Product catalog with advanced filters (category, brand, rating, price range) and sorting
- Product details with gallery, add-to-cart, related items, and review form
- Shopping cart with quantity updates, totals, and persistence-ready structure
- Checkout flow with forms and validation UI
- Authentication (mock) with protected routes and demo credentials
- Wishlist drawer (add/remove/toggle, drawer open state)
- Premium membership program (benefits, activation/deactivation, renewal dates, savings tracking)
- Recently viewed products (custom hook + component)
- Search with instant filtering
- Pull-to-refresh interaction on supported devices
- Responsive design with mobile navigation and smooth animations
- Dark mode toggle and accessible UI components

## Tech Stack

- React 18, Vite 5
- React Router 6
- Redux Toolkit, React Redux
- Tailwind CSS, tailwindcss-animate, tailwind-merge
- shadcn/ui built on Radix UI primitives
- Framer Motion (animations)
- Lucide React (icons)

## Quickstart

Prerequisites: Node.js 18+

1) Install dependencies

```bash
npm install
```

2) Start the dev server

```bash
npm run dev
```

3) Open your browser at:
- http://localhost:5173

### Demo credentials
- Email: demo@example.com
- Password: password

## Scripts

- npm run dev – Start development server
- npm run build – Build for production
- npm run preview – Preview the production build
- npm run lint – Run ESLint on JS/JSX files

## Routes & Pages

- / – Home
- /products – Product listing (filters, search, sorting)
- /products/:id – Product details
- /cart – Shopping cart
- /checkout – Checkout
- /login – Login (mock auth)
- /signup – Signup (mock auth)
- /premium – Premium membership landing/management

ProtectedRoute is used to guard pages that require auth.

## State Management (Redux Toolkit)

Slices (src/store/slices):

- authSlice
  - State: user, isAuthenticated, loading, error
  - Actions: loginStart, loginSuccess, loginFailure, logout, clearError

- cartSlice
  - State: items[], itemCount, total
  - Actions: addToCart, removeFromCart, updateQuantity, clearCart

- productsSlice
  - State: products[], categories[], loading, error, filters { priceRange, brands, categories, ratings, search, sortBy }
  - Actions: setProducts, setCategories, setLoading, setError, setFilters, clearFilters

- wishlistSlice
  - State: items[], isOpen (drawer)
  - Actions: addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist, toggleWishlistDrawer, setWishlistDrawer

- membershipSlice
  - State: isPremium, benefits[], memberSince, nextRenewal, savingsThisYear
  - Actions: activatePremium, deactivatePremium, updateSavings

Store configuration: src/store/store.js combines the above reducers.

## Notable Components

- Layout: Navbar, MobileNav, MobileMenu, Footer, FloatingCart
- UI: ProductCard, CategoryCard, SearchBar, LoadingSkeleton, price-range-slider, filter-panel, filter-checkbox, AdvancedFilters, ReviewForm, TestimonialsCarousel, DarkModeToggle, WishlistDrawer, toast/toaster, pull-to-refresh
- Auth: ProtectedRoute
- Sections: HeroSection, RecentlyViewed

## Project Structure

```
src/
  components/
    auth/                # Auth helpers (e.g., ProtectedRoute)
    layout/              # Navbar, Footer, mobile nav/menu
    ui/                  # Reusable UI widgets and sections
  data/                  # Mock data
  hooks/                 # Custom hooks (use-toast, use-recently-viewed)
  lib/                   # Utilities (e.g., classNames)
  pages/                 # Page components (Home, Products, Details, Cart, etc.)
  store/                 # Redux store and slices
  App.jsx                # App shell and routing
  main.jsx               # Entry point
```

## Styling & UI

- Tailwind CSS utility-first styling
- shadcn/ui components using Radix primitives
- Accessible patterns (focus states, ARIA-friendly components)
- Dark mode toggle support
- Motion/transition effects with Framer Motion

## Development Notes

- This project currently uses mock data and mock auth. Replace mocks with API calls as needed.
- Components are split into small, reusable pieces to encourage composition.
- Filters and search are controlled via Redux for predictable data flow.

## Potential Enhancements

- Real API integration for products, auth, and checkout
- Payment gateway integration
- User profiles, order history, and persisted sessions
- Server-driven search and filtering
- Review moderation and ratings aggregation
- Admin dashboard

## License

MIT

## Contributing

- Fork and create a feature branch
- Run linting before committing: npm run lint
- Open a PR with a clear description of changes

## Support

Open an issue in the repository if you encounter a bug or have a feature request.

—

Built with React, Vite, Tailwind, Redux Toolkit, and shadcn/ui.