# MotoPay Frontend-Backend Integration Setup

This document provides instructions for connecting the frontend and backend after integration.

## Prerequisites

- Node.js >= 18.0.0
- PostgreSQL database
- Paystack API keys (test or production)

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd /Users/mac/.gemini/antigravity/scratch/MotoPay-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and configure the following critical variables:
   - `DATABASE_URL` - PostgreSQL connection string
   - `JWT_SECRET` - Secret for JWT signing (generate a random string)
   - `REFRESH_TOKEN_SECRET` - Secret for refresh tokens (generate another random string)
   - `PAYSTACK_SECRET_KEY` - Your Paystack secret key
   - `PAYSTACK_PUBLIC_KEY` - Your Paystack public key
   - `ADMIN_PASSWORD` - Admin account password
   - `FRONTEND_URL=http://localhost:5173` (Vite dev server)

4. **Set up database:**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Run migrations
   npm run migrate
   ```

5. **Start backend server:**
   ```bash
   npm run dev
   ````

   The backend will start on `http://localhost:5000`

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd /Users/mac/.gemini/antigravity/scratch/MotoPay
   ```

2. **Install dependencies** (already done):
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   
   Edit `.env` and update if needed:
   - `VITE_API_BASE_URL=http://localhost:5000` (backend URL)
   - `VITE_PAYSTACK_PUBLIC_KEY` - Your Paystack public key (same as backend)

4. **Start frontend dev server:**
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## Testing the Integration

1. **Health Check:**
   - Open `http://localhost:5000/api/v1/health` in your browser
   - You should see: `{"success": true, "message": "MotoPay API Service is healthy"}`

2. **Frontend Test:**
   - Open `http://localhost:5173` in your browser
   - Navigate to "Vehicle Lookup" page
   - The page should load without console errors

3. **API Integration Test:**
   - Try looking up a vehicle (you'll need sample data in your database first)
   - Check browser DevTools Network tab for API requests
   - No CORS errors should appear

## Adding Sample Data

To test the vehicle lookup, you'll need to add sample vehicles to your database. You can:

1. Use Prisma Studio:
   ```bash
   cd /Users/mac/.gemini/antigravity/scratch/MotoPay-backend
   npm run db:studio
   ```

2. Or register vehicles through the backend API endpoints

## Common Issues

**CORS Errors:**
- Ensure backend is running on port 5000
- Ensure frontend is running on port 5173
- Check that `FRONTEND_URL` in backend `.env` matches frontend URL

**Database Connection:**
- Verify PostgreSQL is running
- Check `DATABASE_URL` format: `postgresql://user:password@localhost:5432/motopay`

**API Not Responding:**
- Check that both servers are running
- Verify no port conflicts
- Check terminal for error messages

## Next Steps

- Set up sample vehicle data for testing
- Configure Paystack with test keys for payment testing
- Test the complete flow: Vehicle Lookup → Compliance Check → Checkout → Payment
