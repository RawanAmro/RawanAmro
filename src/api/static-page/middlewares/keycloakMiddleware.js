'use strict';

console.log("****keycloakmiddleware****");

const { getKeycloakAccessToken } = require('./keycloak-provider');  // Ensure the path is correct.

module.exports = (config, { strapi }) => {
  console.log("Middleware Function is invoked");
  return async (ctx, next) => {
    // Check for the presence of Authorization header
    if (!ctx.request.header.authorization) {
      ctx.throw(401, 'Missing or invalid credentials');
      return;
    }

    const accessToken = ctx.request.header.authorization.split(' ')[1];

    if (!accessToken) {
      ctx.throw(401, 'Missing or invalid credentials');
      return;
    }

    try {
      await getKeycloakAccessToken(accessToken);
      await next();
    } catch (error) {
      console.error("Error in Keycloak Middlewar adsasdasdasdasdase:", error);
      ctx.throw(400, 'Invalid Keycloak Token');
    }
  };
};
