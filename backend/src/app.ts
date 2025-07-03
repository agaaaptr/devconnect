import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import userRoutes from './routes/user.routes';

dotenv.config();

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://your-frontend-domain.vercel.app'
        : 'http://localhost:3000',
    credentials: true
}));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check - letakkan sebelum routes lain
app.get('/api/health', (req, res) => {
    res.json({
        message: 'DevConnect API is running!',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
    });
});

// Routes
app.use('/api/users', userRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(error.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

export default app;