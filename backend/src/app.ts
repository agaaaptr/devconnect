
import express, { Request, Response, NextFunction } from 'express';
import { User } from '@supabase/supabase-js';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';


// Import routes
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';

const app = express();

// Supabase client initialization


// Authentication Middleware
const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const supabase = req.app.get('supabase');

    if (token == null) return res.sendStatus(401); // No token

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        return res.sendStatus(403); // Invalid token
    }

    req.user = user; // Attach user to request
    next();
};

// Middleware
// Apply CORS before Helmet to ensure headers are set correctly before security policies are applied.
// This can help prevent issues with proxies in development environments.
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
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
app.use('/api/auth', authRoutes);
app.use('/api/users', authenticateToken, userRoutes);

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