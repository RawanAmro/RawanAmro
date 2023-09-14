// 'use strict';
//
// /**
//  * `request-limiter` middleware
//  */
//
// const THROTTLE_LIMIT = 3;
// const redis = require("ioredis");
// const redisClient = redis.createClient();
// const moment = require("moment");
//
// module.exports = (config, {strapi}) => {
//   // Add your own logic here.
//   return async (ctx, next) => {
//     try {
//       // check if redis key exists
//       const userExists = await redisClient.exists(ctx.state.user.id);
//       if (userExists === 1) {
//         const reply = await redisClient.get(ctx.state.user.id);
//         const requestDetails = JSON.parse(reply);
//         const currentTime = moment().unix();
//         const time_difference = (currentTime - requestDetails.startTime) / 60;
//
//         // reset the count if the difference is greater than 1 minute
//         if (time_difference >= 1) {
//           const body = {
//             count: 1,
//             startTime: moment().unix(),
//           };
//           await redisClient.set(ctx.state.user.id, JSON.stringify(body));
//           strapi.log.info("strapi.log availability:", typeof strapi.log);
//           strapi.log.info(`User Object: ${JSON.stringify(ctx.state.user)}`);
//           strapi.log.info(`User ID: ${ctx.state.user.id}`);
//           strapi.log.info("difference is greater than 1 minute")
//           next();
//           // increment the count if the time_difference is less than 1 minute
//         } else if (time_difference < 1 && requestDetails.count <= THROTTLE_LIMIT) {
//           requestDetails.count++;
//           await redisClient.set(
//             ctx.state.user.id,
//             JSON.stringify(requestDetails)
//           );
//           strapi.log.info(`User Object: ${JSON.stringify(ctx.state.user)}`);
//           strapi.log.info(`User ID: ${ctx.state.user.id}`);
//           strapi.log.info("difference is less than 1 minute")
//           next();
//           // return error if the time_difference is less than 1 minute and count is greater than 3
//         } else {
//           strapi.log.error("Throttled limit exceeded...");
//           strapi.log.info(`User Object: ${JSON.stringify(ctx.state.user)}`);
//           strapi.log.info(`User ID: ${ctx.state.user.id}`);
//           strapi.log.info("time_difference is less than 1 minute and count is greater than 3");
//           ctx.response.status = 429;
//           ctx.response.body = {
//             error: 1,
//             message: "Throttled limit exceeded...",
//           };
//           return;
//         }
//       } else {
//         strapi.log.info("User does not exist in redis.");
//         const body = {
//           count: 1,
//           startTime: moment().unix(),
//         };
//         await redisClient.set(ctx.state.user.id, JSON.stringify(body));
//         next();
//       }
//     } catch (err) {
//       strapi.log.error(err);
//       throw err;
//     }
//
//   };
// };
