'use strict';

/**
 * `request-limiter` middleware
 */

const THROTTLE_LIMIT = 3;
const redis = require("ioredis");
const redisClient = redis.createClient({
  host: 'redis',
  port: 6379
});
const moment = require("moment");

module.exports = (config, {strapi}) => {
  // Add your own logic here.
  return async (ctx, next) => {
    try {
      // Check if the Redis key exists for the current user
      const userExists = await redisClient.exists(ctx.state.user.id);

      if (userExists === 1) {
        // If the user exists in Redis, retrieve their request details
        const reply = await redisClient.get(ctx.state.user.id);
        const requestDetails = JSON.parse(reply);
        const currentTime = moment().unix();
        const timeDifference = (currentTime - requestDetails.startTime) / 60;

        if (timeDifference >= 1) {
          // Reset the count if the difference is greater than or equal to 1 minute
          const body = {
            count: 1,
            startTime: moment().unix(),
          };
          await redisClient.set(ctx.state.user.id, JSON.stringify(body));
          strapi.log.info("strapi.log availability:", typeof strapi.log);
          strapi.log.info(`User Object: ${JSON.stringify(ctx.state.user)}`);
          strapi.log.info(`User ID: ${ctx.state.user.id}`);
          strapi.log.info("difference is greater than 1 minute")

        } else {
          if (requestDetails.count >= THROTTLE_LIMIT) {
            // Return a 429 status if the request count exceeds the limit
            strapi.log.error("Throttled limit exceeded for user:", ctx.state.user.id);
            ctx.response.status = 429;
            ctx.response.body = {
              error: 1,
              message: "Throttled limit exceeded...",
            };
            return next(); // Continue processing the request
          } else {
            strapi.log.error("Throttled limit exceeded...");
            strapi.log.info(`User Object: ${JSON.stringify(ctx.state.user)}`);
            strapi.log.info(`User ID: ${ctx.state.user.id}`);
            strapi.log.info("time_difference is less than 1 minute and count is greater than 3");
            requestDetails.count++;
            await redisClient.set(
              ctx.state.user.id,
              JSON.stringify(requestDetails)
            );
            strapi.log.info(`User Object: ${JSON.stringify(ctx.state.user)}`);
            strapi.log.info(`User ID: ${ctx.state.user.id}`);
            strapi.log.info("difference is less than 1 minute")

          }
        }
      } else {
        strapi.log.info("User does not exist in redis.");
        const body = {
          count: 1,
          startTime: moment().unix(),
        };
        await redisClient.set(ctx.state.user.id, JSON.stringify(body));

        // Log info for new user entry
        strapi.log.info("New user entry in Redis:", ctx.state.user.id);
      }

      // Continue processing the request
      return next();
    } catch (err) {
      strapi.log.error(err);
      throw err;
    }
  };
};
