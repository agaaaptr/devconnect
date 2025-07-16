import dotenv from 'dotenv';
dotenv.config({ path: './.env.production' });

import app from './app';
import { createServer } from 'http';
import { createClient } from '@supabase/supabase-js';

// Smart port detection function
const findAvailablePort = async (preferredPort: number): Promise<number> => {
    return new Promise((resolve) => {
        const server = createServer();

        server.listen(preferredPort, () => {
            const port = (server.address() as any)?.port;
            server.close(() => resolve(port));
        });

        server.on('error', () => {
            // If preferred port is busy, try next available port
            findAvailablePort(preferredPort + 1).then(resolve);
        });
    });
};

const startServer = async () => {
    const preferredPort = parseInt(process.env.PORT || '5000');

    // Initialize Supabase client here, after dotenv.config() has run
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
    app.set('supabase', supabase);

    try {
        const availablePort = await findAvailablePort(preferredPort);

        app.listen(availablePort, () => {
            console.log(`🚀 Server running on port ${availablePort}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(`🔗 API URL: http://localhost:${availablePort}/api`);
            console.log(`💾 Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);

            if (availablePort !== preferredPort) {
                console.log(`⚠️  Port ${preferredPort} was busy, using port ${availablePort} instead`);
            }
        });
    } catch (error) {
        console.error('❌ Error starting server:', error);
        process.exit(1);
    }
};

// For Vercel serverless functions
export default app;

// For development server
if (process.env.NODE_ENV !== 'production') {
    startServer();
}