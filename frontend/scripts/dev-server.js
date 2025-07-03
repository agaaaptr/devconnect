/* eslint-disable @typescript-eslint/no-require-imports */
const { exec } = require('child_process');
const net = require('net');

const findAvailablePort = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(port, () => {
      const actualPort = server.address().port;
      server.close(() => resolve(actualPort));
    });
    
    server.on('error', () => {
      findAvailablePort(port + 1).then(resolve);
    });
  });
};

const startDevServer = async () => {
  const preferredPort = process.env.PORT || 3000;
  
  try {
    const availablePort = await findAvailablePort(preferredPort);
    
    console.log(`🚀 Starting Next.js dev server on port ${availablePort}`);
    
    if (availablePort !== preferredPort) {
      console.log(`⚠️  Port ${preferredPort} was busy, using port ${availablePort} instead`);
    }
    
    const child = exec(`next dev -p ${availablePort}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error}`);
        return;
      }
      console.log(stdout);
      if (stderr) console.error(stderr);
    });
    
    child.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    
    child.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    
  } catch (error) {
    console.error('❌ Error starting dev server:', error);
    process.exit(1);
  }
};

startDevServer();