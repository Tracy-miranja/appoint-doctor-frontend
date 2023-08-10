// __mocks__/axios.js
export default {
  // Mocked implementation for axios methods
  post: jest.fn((url) => {
    if (url === 'https://booking-doctor-api-v1.onrender.com/users/sign_in') {
      // Simulate a successful sign-in response
      return Promise.resolve({
        headers: { authorization: 'your-auth-token' },
        data: {
          data: {
            id: 1,
            name: 'John Doe',
            role: 'user',
          },
        },
      });
    }
    // Handle other URLs as needed
    return Promise.reject(new Error('Unhandled URL'));
  }),
  // You can mock other axios methods here as needed
};
