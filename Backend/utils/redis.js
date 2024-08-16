const redis = require("redis");

// Create a Redis client
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
  },
});

const connectRedis = async () => {
  try {
    // Asynchronously connect to Redis
    await redisClient.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Redis connection error:", err);
    process.exit(1); // Exit the process if Redis connection fails
  }

  // Handle Redis errors after connection
  redisClient.on("error", (err) => {
    console.error("Redis error:", err);
  });
};

// Call the async function to connect
connectRedis();

module.exports = redisClient;
