import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.routes';
import postRoutes from './routes/posts.routes';
import userRoutes from './routes/users.routes';
import uploadRoutes from './routes/uploads.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Load env
dotenv.config();

// Middleware
// Use Helmet to set safe HTTP headers
app.use(helmet());

// Strict CORS configuration: prefer explicit CLIENT_URL in prod, fallback to Vite default during dev
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:3000';
app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploadRoutes);

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pawpal';

console.log('🚀 Starting PawPal server...');
console.log(`📍 Client URL: ${CLIENT_URL}`);

// For demo purposes, start server immediately and try MongoDB connection in background
function startServer() {
    app.listen(PORT, () => {
        console.log(`🎉 Server is running on http://localhost:${PORT}`);
        console.log(`� Frontend should be at http://localhost:3000`);
        console.log(`📚 API endpoints available at http://localhost:${PORT}/api`);
    });
}

// Start server first
startServer();

// Try MongoDB connection in background (non-blocking)
console.log(`🔗 Attempting MongoDB connection: ${MONGODB_URI}`);
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ Connected to MongoDB - full functionality enabled');
})
.catch(err => {
    console.log('⚠️  MongoDB connection failed - API will return errors for database operations');
    console.log('� To fix: Install MongoDB or set MONGODB_URI to a cloud connection string');
});