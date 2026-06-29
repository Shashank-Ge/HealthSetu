// This script tests if the production URL is being used correctly
// Run with: node test-prod-url.js

// Simulate the environment variable
process.env.VITE_API_URL = 'https://healthsetu.onrender.com/api';

// Mock import.meta.env
global.import = {
  meta: {
    env: {
      VITE_API_URL: process.env.VITE_API_URL
    }
  }
};

// Simulate axios
class MockAxios {
  constructor(config) {
    console.log('Creating API client with config:', config);
    this.config = config;
  }

  interceptors = {
    request: {
      use: (fn) => {
        console.log('Request interceptor registered');
      }
    }
  };
}

// Simulate the API module
function createAPI() {
  console.log('Creating API with base URL:', import.meta.env.VITE_API_URL);
  return new MockAxios({ 
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api' 
  });
}

// Create API instance
const API = createAPI();

// Verify base URL
console.log('\nVerification:');
console.log('- Expected baseURL:', 'https://healthsetu.onrender.com/api');
console.log('- Actual baseURL:', API.config.baseURL);
console.log('- Is correct:', API.config.baseURL === 'https://healthsetu.onrender.com/api' ? 'Yes ✅' : 'No ❌');

// Also test image URL construction
function constructImageUrl(imagePath) {
  const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
  // Remove '/api' from the end if it exists to construct the base URL
  const baseUrl = apiBaseUrl.endsWith('/api') ? apiBaseUrl.slice(0, -4) : apiBaseUrl;
  return `${baseUrl}/${imagePath}`;
}

const imagePath = 'uploads/doctors/profile.jpg';
console.log('\nImage URL test:');
console.log('- Image path:', imagePath);
console.log('- Constructed URL:', constructImageUrl(imagePath));
console.log('- Expected URL:', 'https://healthsetu.onrender.com/uploads/doctors/profile.jpg');
console.log('- Is correct:', 
  constructImageUrl(imagePath) === 'https://healthsetu.onrender.com/uploads/doctors/profile.jpg' 
  ? 'Yes ✅' : 'No ❌'); 