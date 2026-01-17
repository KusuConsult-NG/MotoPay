# MotoPay Frontend - Quick Start Guide

## Running the Application

### Development Server
```bash
cd "/Users/mac/Revenue frontend"
npm run dev
```

The application will be available at **http://localhost:5173/**

### Available Routes
- `/` - Landing page
- `/lookup` - Vehicle compliance check
- `/checkout` - Payment processing
- `/receipt` - Transaction confirmation

## Key Features
- ✅ Fully functional public-facing pages
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with Plateau State branding
- ✅ Dark mode support (class-based)
- ✅ Smooth animations and transitions

## Tech Stack
- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS v3.4
  - **Routing:** React Router v6
- **Fonts:** Public Sans (Google Fonts)
- **Icons:** Material Symbols Outlined

## Next Steps for Production
1. **Backend Integration** - Connect to PSIRS API
2. **Payment Gateway** - Integrate Paystack/Flutterwave
3. **Authentication** - Add user login/signup
4. **Testing** - Implement unit and E2E tests
5. **Deployment** - Deploy to Vercel/Netlify

## Project Structure
```
src/
├── components/     # Header, Footer
├── layouts/        # MainLayout wrapper
├── pages/          # Home, VehicleLookup, Checkout, Receipt
├── App.tsx         # Router configuration
└── index.css       # Global styles
```

## Development Notes
- Node.js 18+ required
- Tailwind CSS v3 (not v4 - compatibility)
- CSS imports must come before @tailwind directives
- Hot module replacement enabled
