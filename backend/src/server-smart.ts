import app from './app';
import { createServer } from 'http';

const findAvailablePort = (startPort: number): Promise<number> => {
    return new Promise((resolve, reject) => {
        const server = createServer();

        server.listen(startPort, () => {
            const port = (server.address() as any)?.port;
            server.close(() => {
                resolve(port);
            });
        });

        server.on('error', (err: any) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(startPort + 1).then(resolve).catch(reject);
            } else {
                reject(err);
            }
        });
    });
};

const startServer = async () => {
    try {
        const preferredPort = parseInt(process.env.PORT || '8000');
        const port = await findAvailablePort(preferredPort);

        const server = app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
            console.log(`📊 Environment: ${process.env.NODE_ENV}`);
            console.log(`🔗 API URL: http://localhost:${port}/api`);
            console.log(`🎯 Health Check: http://localhost:${port}/api/health`);
        });

        // Graceful shutdown
        const gracefulShutdown = () => {
            console.log('\n🔄 Received shutdown signal, closing server gracefully...');
            server.close(() => {
                console.log('✅ Server closed successfully');
                process.exit(0);
            });
        };

        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);

    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();