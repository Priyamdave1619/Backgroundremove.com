// Mock API service for authentication
export const authenticateUser = async (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { name: 'Demo User', email: credentials.email }, token: 'mock-jwt-token' });
    }, 1000);
  });
};