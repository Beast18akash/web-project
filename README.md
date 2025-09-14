# React E-commerce Store

A modern, responsive e-commerce website built with React, featuring a clean UI with Tailwind CSS and shadcn/ui components.

## 🚀 Features

- **Home Page** - Featured products, categories, and hero banner
- **Product Listing** - Grid view with filtering and sorting options
- **Product Details** - Detailed product information with image gallery
- **Shopping Cart** - Add/remove items, quantity management
- **Checkout Process** - Complete checkout flow with form validation
- **Authentication** - Login and signup functionality
- **Search** - Search products by name or category
- **Responsive Design** - Mobile-friendly with smooth navigation
- **State Management** - Redux Toolkit for cart and auth management
- **Animations** - Framer Motion for smooth transitions
- **Modern UI** - Clean design with rounded corners and soft shadows

## 🛠️ Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Reusable UI components
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Demo Credentials

For testing the authentication system:

- **Email:** `demo@example.com`
- **Password:** `password`

## 📱 Pages & Features

### Home Page (`/`)
- Hero section with call-to-action
- Featured products showcase
- Category navigation
- Customer testimonials
- Feature highlights

### Products Page (`/products`)
- Product grid with filtering options
- Category and price range filters
- Search functionality
- Sorting options (name, price, rating)
- Grid/list view toggle

### Product Details (`/products/:id`)
- Product image gallery
- Detailed product information
- Quantity selector
- Add to cart functionality
- Related products section

### Shopping Cart (`/cart`)
- Cart items management
- Quantity adjustment
- Remove items
- Order summary
- Proceed to checkout

### Checkout (`/checkout`)
- Personal information form
- Shipping address
- Payment information
- Shipping method selection
- Order confirmation

### Authentication
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - New user registration

## 🎨 Design Features

- **Modern UI** - Clean, minimal design with rounded corners
- **Responsive** - Mobile-first approach with breakpoints
- **Animations** - Smooth transitions and hover effects
- **Accessibility** - Proper ARIA labels and keyboard navigation
- **Dark Mode Ready** - CSS variables for easy theme switching

## 🗂️ Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── layout/             # Layout components (Navbar, Footer)
│   └── auth/               # Authentication components
├── pages/                  # Page components
├── store/                  # Redux store and slices
├── data/                   # Mock data and utilities
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
└── main.jsx               # Application entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3

## 🎯 Key Components

### ProductCard
- Displays product information
- Add to cart functionality
- Rating display
- Responsive design

### Navbar
- Search functionality
- Cart counter
- User authentication status
- Mobile-responsive menu

### Cart Management
- Add/remove items
- Quantity updates
- Total calculation
- Persistent state

## 🔐 Authentication

The app includes a mock authentication system:
- Login with demo credentials
- Signup with form validation
- Protected routes
- User session management

## 📊 State Management

Redux Toolkit slices:
- **Cart Slice** - Shopping cart state
- **Auth Slice** - User authentication
- **Products Slice** - Product data and filters

## 🎨 Styling

- **Tailwind CSS** for utility-first styling
- **shadcn/ui** components for consistent design
- **CSS Variables** for theming
- **Responsive breakpoints** for mobile-first design

## 🔄 Future Enhancements

- Real API integration
- Payment gateway integration
- User profiles and order history
- Product reviews and ratings
- Wishlist functionality
- Admin dashboard
- Email notifications
- Advanced search filters

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help, please open an issue in the repository.

---

Built with ❤️ using React and modern web technologies.

