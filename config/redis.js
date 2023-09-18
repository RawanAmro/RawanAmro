// Import the ioredis library
const Redis = require("ioredis");

// Create a new Redis client instance
const redis = new Redis({
  host: 'redis', // Should match the name of your Redis service in Docker Compose
  port: 6379,     // Default Redis port
});

// Register an error handler for the Redis client
redis.on("error", (error) => {
  console.error("Redis Error:", error);
});

module.exports = ({env}) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'redis', // Use 'redis' as the client
        host: env('redis', 'redis'), // Customize if needed
        port: env.int(6379, 6379),    // Customize if needed
        password: env('REDIS_PASSWORD', ''),  // Customize if needed
        db: 0, // Specify the Redis database number if needed
      },
      options: {
        // Add any other options you need
      },
    },
  },
});
