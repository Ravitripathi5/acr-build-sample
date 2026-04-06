const http = require('http');

console.log('Running tests...');

// Simple health check test
const testHealthEndpoint = () => {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:3000/health', (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (response.status === 'healthy') {
            console.log('✓ Health check passed');
            resolve();
          } else {
            reject('Health check failed');
          }
        } catch (e) {
          reject('Invalid response format');
        }
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => reject('Request timeout'));
  });
};

// Run test
testHealthEndpoint()
  .then(() => {
    console.log('All tests passed!');
    process.exit(0);
  })
  .catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
  });
